import { useState } from "react";
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {
	const [order, setOrder] = useState<OrderItem[]>([])
	const [tip, setTip] = useState(0)
	const addItem = (item: MenuItem) => {
		const itemExist = order.find(orderItem => orderItem.id === item.id)
		if (itemExist) {
			const newOrder = order.map(orderItem => {
				if(orderItem.id === item.id) {
					return {
						...orderItem,
						quantity: orderItem.quantity + 1
					}
				}
				return orderItem;
			})
			setOrder(newOrder)
		} else {
			const newItem = {...item, quantity: 1 }
			setOrder([...order, newItem])
		}
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