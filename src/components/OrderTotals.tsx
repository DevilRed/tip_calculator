import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
	order: OrderItem[],
	tip: number
}

export const OrderTotals = ({order, tip}: OrderTotalsProps) => {
	const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
	const tipAmount = useMemo(() => subtotalAmount * tip, [tip, subtotalAmount])
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
				<p>Subtotal to pay: {' '}
					<span className="font-bold">$0</span>
				</p>
			</div>
		</>
	)
}
