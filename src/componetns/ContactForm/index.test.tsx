/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';

import ContactForm from './index';

jest.mock('expo-contacts');
jest.mock('expo-image-picker');
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock('@/context/RefreshContext', () => ({
  useRefresh: () => ({
    triggerRefresh: jest.fn(),
  }),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the contact form with initial fields', () => {
    const { getByPlaceholderText, getByTestId } = render(<ContactForm />);

    expect(getByPlaceholderText('Name (Required)')).toBeTruthy();
    expect(getByTestId('image-picker-button')).toBeTruthy();
    expect(getByTestId('add-phone-button')).toBeTruthy();
    expect(getByTestId('add-email-button')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('updates image when an image is picked', async () => {
    const mockImageUri = 'mock-uri';
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: mockImageUri }],
    });

    const { getByTestId } = render(<ContactForm />);

    fireEvent.press(getByTestId('image-picker-button'));

    await waitFor(() =>
      expect(getByTestId('image')).toHaveProp('source', { uri: mockImageUri }),
    );
  });

  it('adds and removes phone number fields', () => {
    const { getByTestId, getAllByTestId } = render(<ContactForm />);

    fireEvent.press(getByTestId('add-phone-button'));
    fireEvent.press(getByTestId('add-phone-button'));

    expect(getAllByTestId(/phone-input-/)).toHaveLength(3);

    fireEvent.press(getAllByTestId('phone-input-1')[0]);

    expect(getAllByTestId(/phone-input-/)).toHaveLength(3);
  });

  it('adds and removes email fields', () => {
    const { getByTestId, getAllByTestId } = render(<ContactForm />);

    fireEvent.press(getByTestId('add-email-button'));
    fireEvent.press(getByTestId('add-email-button'));

    expect(getAllByTestId(/email-input-/)).toHaveLength(3);

    fireEvent.press(getAllByTestId('email-input-1')[0]);

    expect(getAllByTestId(/email-input-/)).toHaveLength(3);
  });

  it('submits the form successfully with valid data', async () => {
    const mockAddContactAsync = Contacts.addContactAsync as jest.Mock;
    mockAddContactAsync.mockResolvedValue(true);

    const { getByTestId } = render(<ContactForm />);

    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('phone-input-0'), '1234567890');

    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockAddContactAsync).toHaveBeenCalledTimes(1);
    });
  });

  it('loads and updates an existing contact', async () => {
    const mockContact = {
      id: '1',
      name: 'Jane Doe',
      emails: [{ email: 'jane@example.com', label: 'work' }],
      phoneNumbers: [{ number: '9876543210', label: 'mobile' }],
      addresses: [{ street: '123 Main St', label: 'home' }],
      image: { uri: 'mock-uri' },
    };

    (Contacts.getContactByIdAsync as jest.Mock).mockResolvedValue(mockContact);

    const { getByTestId } = render(<ContactForm contactId="1" />);

    await waitFor(() => {
      expect(getByTestId('name-input')).toHaveProp('value', 'Jane Doe');
      expect(getByTestId('phone-input-0')).toHaveProp('value', '9876543210');
      expect(getByTestId('email-input-0')).toHaveProp(
        'value',
        'jane@example.com',
      );
      expect(getByTestId('address-input')).toHaveProp('value', '123 Main St');
      expect(getByTestId('image')).toHaveProp('source', { uri: 'mock-uri' });
    });
  });
});
