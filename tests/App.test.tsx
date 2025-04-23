import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";
import { menuItems } from "../src/data/db";
import { MenuItemProps } from "../src/components/MenuItem";
import { OrderContentProps } from "../src/components/OrderContent";
import { TipPercentageFormProps } from "../src/components/TipPercentageForm";
import userEvent from "@testing-library/user-event";

vi.mock('../src/components/MenuItem', () => ({
  MenuItem: ({ item, addItem}: MenuItemProps) => (
    <div data-testid={`menu-item-${item.id}`}>
      <span>{item.name}</span>
      <button onClick={() => addItem(item)}>Add</button>
    </div>
  )
}));

vi.mock('../src/components/OrderContent', () =>  ( {
  OrderContent: ({order, removeItem}: OrderContentProps) => (
    <div data-testid="order-content">
      {order.map(item => (
        <div key={item.id} data-testid={`order-item-${item.id}`}>
          <span>{item.name} (x{item.quantity})</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  )
} ))

vi.mock('../src/components/TipPercentageForm', () => ({
  TipPercentageForm: ({ tip, setTip }: TipPercentageFormProps) => (
    <div data-testid="tip-form">
      <input
        type="number"
        data-testid="tip-input"
        value={tip}
        onChange={(e) => setTip(Number(e.target.value))}
      />
    </div>
  )
}));
vi.mock('../src/components/OrderTotals', () => ({
  OrderTotals: ({ placeOrder }: { placeOrder: () => void }) => (
    <div data-testid="order-totals">
      <button data-testid="place-order-btn" onClick={placeOrder}>Place Order</button>
    </div>
  )
}));

const renderComponent = () => {
  render(<App />);
}

describe("App", () => {
  it("renders correctly", () => {
    renderComponent()
    expect(screen.getByText(/tip calculator/i)).toBeInTheDocument();
  });
  it('should show empty order message initially', () => {
    renderComponent()
    expect(screen.getByText(/order is empty/i)).toBeInTheDocument()
  });

  it('should add items to order when clicking add button', async () => {
    renderComponent()
    const itemAddBtn = screen.getByTestId(`menu-item-${menuItems[0].id}`).querySelector('button')

    if (!itemAddBtn) throw new Error('Add button not found')

    const user = userEvent.setup()
    await user.click(itemAddBtn)

    expect(screen.queryByText('Order is empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-content')).toBeInTheDocument();
    expect(screen.getByTestId(`order-item-${menuItems[0].id}`)).toBeInTheDocument();
  });
});
