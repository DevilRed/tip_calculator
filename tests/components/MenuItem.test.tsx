import { MenuItem } from "../../src/components/MenuItem"
import { MenuItem as MenuItemType } from "../../src/types"
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

describe('MenuItem', () => {
	const renderComponent = (addMock= vi.fn()) => {
		const item: MenuItemType = { id: 1, name: 'Test item', price: 10 }
		render(<MenuItem item={item} addItem={addMock} />)
	}

	it('should render component', async () => {
		renderComponent()
		expect(await screen.findByText(/test item/i)).toBeInTheDocument()
	});

	it('should run addItem callback', async () => {
		const user = userEvent.setup()
		const addFn = vi.fn()
		renderComponent(addFn)
		const button = screen.getByRole('button')
		await user.click(button)
		expect(addFn).toHaveBeenCalled()
	});
})