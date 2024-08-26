import { fireEvent, render, screen } from '@testing-library/react-native';

import SearchFilter from './index';

describe('SearchFilter', () => {
  it('renders with default placeholder', () => {
    const onFilter = jest.fn();
    render(<SearchFilter onFilter={onFilter} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeDefined();
  });

  it('renders with custom placeholder', () => {
    const onFilter = jest.fn();
    render(
      <SearchFilter placeholder="Custom placeholder" onFilter={onFilter} />,
    );
    const input = screen.getByPlaceholderText('Custom placeholder');
    expect(input).toBeDefined();
  });

  it('calls onFilter with search query when input value changes', () => {
    const onFilter = jest.fn();
    render(<SearchFilter onFilter={onFilter} />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'test query');
    expect(onFilter).toHaveBeenCalledWith('test query');
  });

  it('passes testID prop to the input element', () => {
    const onFilter = jest.fn();
    render(<SearchFilter onFilter={onFilter} testID="search-input" />);
    const input = screen.getByTestId('search-input');
    expect(input).toBeDefined();
  });
});
