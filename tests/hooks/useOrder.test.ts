import { renderHook } from "@testing-library/react";
import useOrder from "../../src/hooks/useOrder";
import { MenuItem } from "../../src/types";
import { act } from "react";

describe('useOrder', () => {
	it('should initialize with an empty order and tip of 0', () => {
    const { result } = renderHook(() => useOrder());
    expect(result.current.order).toEqual([]);
    expect(result.current.tip).toBe(0);
  });

	it('should add an item to the order', () => {
		const { result } = renderHook(() => useOrder())
		const item: MenuItem = { id: 1, name: 'Test item', price: 10 }
		act(() => {
			result.current.addItem(item)
		})
		expect(result.current.order).toEqual([{...item, quantity: 1}])
	});

	it('should increment the quantity of an existing item', () => {
		const { result } = renderHook(() => useOrder());
    const item: MenuItem = { id: 1, name: 'Test Item', price: 10 };
    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });
    expect(result.current.order).toEqual([{ ...item, quantity: 2 }]);
	});

	it('should remove an item from the order', () => {
    const { result } = renderHook(() => useOrder());
    const item: MenuItem = { id: 1, name: 'Test Item', price: 10 };
    act(() => {
      result.current.addItem(item);
      result.current.removeItem(item.id);
    });
    expect(result.current.order).toEqual([]);
  });

  it('should place an order and reset the state', () => {
    const { result } = renderHook(() => useOrder());
    const item: MenuItem = { id: 1, name: 'Test Item', price: 10 };
    act(() => {
      result.current.addItem(item);
      result.current.setTip(10);
      result.current.placerOrder();
    });
    expect(result.current.order).toEqual([]);
    expect(result.current.tip).toBe(0);
  });

  it('should update the tip', () => {
    const { result } = renderHook(() => useOrder());
    act(() => {
      result.current.setTip(10);
    });
    expect(result.current.tip).toBe(10);
  });
})