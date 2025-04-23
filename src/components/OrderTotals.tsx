import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

export type OrderTotalsProps = {
	order: OrderItem[],
	tip: number,
	placerOrder: () => void
}

export const OrderTotals = ({order, tip, placerOrder}: OrderTotalsProps) => {
	const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
	const tipAmount = useMemo(() => subtotalAmount * tip, [tip, subtotalAmount])
	const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tipAmount, subtotalAmount])
	return (

		<>
			<div className="space-y-3">
				<h2 className="font-black text-2xl">Totals and Tip</h2>
				<p>Subtotal to pay: {' '}
					<span className="font-bold">{ formatCurrency(subtotalAmount)}</span>
				</p>
				<p>Tip: {' '}
					<span className="font-bold">{formatCurrency(tipAmount)}</span>
				</p>
				<p>Total to pay: {' '}
					<span className="font-bold">{ formatCurrency(totalAmount)}</span>
				</p>
			</div>
			<button className="w-full bg-black p-3 uppercase text-white mt-10 disabled:opacity-10" disabled={totalAmount === 0} onClick={placerOrder}>Save order</button>
		</>
	)
}
