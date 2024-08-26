import { fireEvent, render, screen } from '@testing-library/react-native';

import CustomButton from './index';

describe('CustomButton', () => {
  it('renders button with correct title', () => {
    const handlePress = jest.fn();
    render(<CustomButton title="Click me" handlePress={handlePress} />);
    const button = screen.getByText('Click me');
    expect(button).toBeDefined();
  });

  it('calls handlePress when button is pressed', () => {
    const handlePress = jest.fn();
    render(<CustomButton title="Click me" handlePress={handlePress} />);
    const button = screen.getByText('Click me');
    fireEvent.press(button);
    expect(handlePress).toHaveBeenCalled();
  });

  it('renders button with custom container styles', () => {
    const handlePress = jest.fn();
    render(
      <CustomButton
        title="Click me"
        handlePress={handlePress}
        textStyles="bg-red-500"
      />,
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveStyle({ backgroundColor: '#ef4444' });
  });

  it('renders button with custom text styles', () => {
    const handlePress = jest.fn();
    render(
      <CustomButton
        title="Click me"
        handlePress={handlePress}
        textStyles="text-blue-500"
      />,
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveStyle({ color: '#3b82f6' });
  });

  it('renders button with loading indicator when isLoading is true', () => {
    const handlePress = jest.fn();
    render(
      <CustomButton title="Click me" handlePress={handlePress} isLoading />,
    );
    const button = screen.getByText('Click me');
    const loadingIndicator = screen.queryByRole('progressbar');
    expect(button).toBeDisabled();
    expect(loadingIndicator).toBeNull();
  });

  it('does not render loading indicator when isLoading is false', () => {
    const handlePress = jest.fn();
    render(
      <CustomButton
        title="Click me"
        handlePress={handlePress}
        isLoading={false}
      />,
    );
    const button = screen.getByText('Click me');
    const loadingIndicator = screen.queryByRole('progressbar');
    expect(button).not.toBeDisabled();
    expect(loadingIndicator).toBeNull();
  });
});
