import { fireEvent, render, screen } from '@testing-library/react-native';
import type { Contact } from 'expo-contacts';

import ContactCard from './index';

describe('ContactCard', () => {
  const mockContact = {
    id: '1',
    contactType: 'personal',
    name: 'John Doe',
    phoneNumbers: [{ number: '1234567890' }],
    emails: [{ email: 'johndoe@example.com' }],
    image: { uri: 'https://example.com/avatar.jpg' },
  };

  it('renders contact card with correct name', () => {
    render(
      <ContactCard
        contact={mockContact as Contact}
        index={0}
        handlePress={() => {}}
      />,
    );
    const nameElement = screen.getByText('John Doe');
    expect(nameElement).toBeDefined();
  });

  it('renders contact card with phone number', () => {
    render(
      <ContactCard
        contact={mockContact as Contact}
        index={0}
        handlePress={() => {}}
      />,
    );
    const phoneNumberElement = screen.getByText('1234567890');
    expect(phoneNumberElement).toBeDefined();
  });

  it('renders contact card with email', () => {
    render(
      <ContactCard
        contact={mockContact as Contact}
        index={0}
        handlePress={() => {}}
      />,
    );
    const emailElement = screen.getByText('johndoe@example.com');
    expect(emailElement).toBeDefined();
  });



  it('calls handlePress when contact card is pressed', () => {
    const handlePress = jest.fn();
    render(
      <ContactCard
        contact={mockContact as Contact}
        index={0}
        handlePress={handlePress}
      />,
    );
    const contactCard = screen.getByTestId('contactitem0');
    fireEvent.press(contactCard);
    expect(handlePress).toHaveBeenCalled();
  });
});
