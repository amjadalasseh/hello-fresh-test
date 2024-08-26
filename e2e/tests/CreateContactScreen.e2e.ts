import { by, device, element, expect } from 'detox';

describe('Create Contact Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create a new contact', async () => {
    // Navigate to the CreateContactScreen
    await element(by.text('Create Contact')).tap();

    // Fill in the form
    await element(by.id('name-input')).typeText('Jane Smith');
    await element(by.id('phone-input-0')).typeText('5551234567');
    await element(by.id('image')).tap();
    await element(by.id('add-email-button')).tap();
    await element(by.id('email-input-0')).typeText('janesmith@example.com');

    await element(by.id('image')).tap();

    await element(by.id('address-input')).typeText('456 Elm St');
    await element(by.id('image')).tap();
    // Submit the form
    await element(by.id('submit-button')).tap();

    // Verify the contact is created
    await expect(
      element(by.text('Contact created successfully')),
    ).toBeVisible();
  });

  it('should throw and error for not valid Email', async () => {
    // Navigate to the CreateContactScreen
    await element(by.text('Create Contact')).tap();

    // Fill in the form
    await element(by.id('name-input')).typeText('Jane Smith');
    await element(by.id('phone-input-0')).typeText('5551234567');
    await element(by.id('image')).tap();
    await element(by.id('add-email-button')).tap();
    await element(by.id('email-input-0')).typeText('janesmith');

    await element(by.id('image')).tap();

    await element(by.id('address-input')).typeText('456 Elm St');
    await element(by.id('image')).tap();
    // Submit the form
    await element(by.id('submit-button')).tap();

    // Verify the contact is created
    await expect(
      element(by.text('Please enter a valid email address')),
    ).toBeVisible();
  });

  it('should throw and error for empty name', async () => {
    // Navigate to the CreateContactScreen
    await element(by.text('Create Contact')).tap();

    // Fill in the form

    await element(by.id('phone-input-0')).typeText('5551234567');
    await element(by.id('image')).tap();
    await element(by.id('add-email-button')).tap();
    await element(by.id('email-input-0')).typeText('janesmith');

    await element(by.id('image')).tap();

    await element(by.id('address-input')).typeText('456 Elm St');
    await element(by.id('image')).tap();
    // Submit the form
    await element(by.id('submit-button')).tap();

    // Verify the contact is created
    await expect(
      element(by.text('Name and at least one phone number are required')),
    ).toBeVisible();
  });

  it('should throw and error for not valid phone number', async () => {
    // Navigate to the CreateContactScreen
    await element(by.text('Create Contact')).tap();

    // Fill in the form
    await element(by.id('name-input')).typeText('Jane Smith');
    await element(by.id('phone-input-0')).typeText('5');
    await element(by.id('image')).tap();
    await element(by.id('add-email-button')).tap();
    await element(by.id('email-input-0')).typeText('janesmith@example.com');

    await element(by.id('image')).tap();

    await element(by.id('address-input')).typeText('456 Elm St');
    await element(by.id('image')).tap();
    // Submit the form
    await element(by.id('submit-button')).tap();

    // Verify the contact is created
    await expect(
      element(by.text('Please enter a valid phone number')),
    ).toBeVisible();
  });

  it('should edit an existing contact', async () => {
    // Navigate to the EditContactScreen

    await waitFor(element(by.id('mainview')))
      .toBeVisible()
      .withTimeout(5000);
    await waitFor(element(by.id('contactitem1')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('contactitem1')).tap();

    // Modify the form
    await element(by.id('name-input')).clearText();
    await element(by.id('name-input')).typeText('John Doe Updated');
    // await element(by.id('scrollable-container')).scrollTo('bottom');
    await element(by.id('scrollable-container')).tap(); // Adjust scrolling as needed
    await expect(element(by.id('submit-button'))).toBeVisible(); // Ensure view is visible
    // await element(by.id('your-view-id')).tap(); // Interact with the view
    await element(by.id('submit-button')).tap();

    // Verify the contact is updated
    await expect(
      element(by.text('Contact updated successfully')),
    ).toBeVisible();
  });
});
