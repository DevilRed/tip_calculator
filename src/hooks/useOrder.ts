import { useState } from "react";
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {
	const [order, setOrder] = useState<OrderItem[]>([])
	const [tip, setTip] = useState(0)

	const addItem = (item: MenuItem) => {
		setOrder(currentOrder => {
			const itemExist = currentOrder.findIndex(orderItem => orderItem.id === item.id)
			if (itemExist >= 0) {
				const updatedOrder = [...currentOrder]
				updatedOrder[itemExist] = {
					...updatedOrder[itemExist],
					quantity: updatedOrder[itemExist].quantity + 1
				}
				return updatedOrder
			} else {
				return [...currentOrder, {...item, quantity: 1}]
			}
		})
	}

	const removeItem = (id: MenuItem['id']) => {
		setOrder(order.filter((item) => item.id !== id))
	}

	const placerOrder = () => {
		setOrder([])
		setTip(0)
	}

	return {
		addItem,
		order,
		tip,
		setTip,
		removeItem,
		placerOrder,
	}
}