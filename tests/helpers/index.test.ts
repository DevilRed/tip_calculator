//import { render, screen } from '@testing-library/react'

import { formatCurrency } from "../../src/helpers";

describe('formatCurrency', () => {
	it('should return number formated', () => {
		const res = formatCurrency(15)
		expect(res).toBe('$15.00');
	});
})