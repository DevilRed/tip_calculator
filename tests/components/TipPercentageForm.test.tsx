import { render, fireEvent  } from '@testing-library/react';
import { TipPercentageForm } from '../../src/components/TipPercentageForm';

describe('TipPercentageForm', () => {
  const setTip = vi.fn();
  const tip = 0.10;

  it('renders correctly', () => {
    const { getByText } = render(<TipPercentageForm setTip={setTip} tip={tip} />);
    expect(getByText('10%')).toBeInTheDocument();
    expect(getByText('20%')).toBeInTheDocument();
    expect(getByText('50%')).toBeInTheDocument();
  });

  it('initially selects the correct tip option', () => {
    const { getByLabelText } = render(<TipPercentageForm setTip={setTip} tip={tip} />);
    expect(getByLabelText('10%')).toBeChecked();
  });

  it('calls setTip when a different option is selected', () => {
    const { getByLabelText } = render(<TipPercentageForm setTip={setTip} tip={tip} />);
    const twentyPercentOption = getByLabelText('20%');
    fireEvent.click(twentyPercentOption);
    expect(setTip).toHaveBeenCalledTimes(1);
    expect(setTip).toHaveBeenCalledWith(0.20);
  });
});