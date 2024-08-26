import { by, device, element, waitFor } from 'detox';

describe('Contacts List Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should handle permissions dialogn', async () => {
    try {
      await element(by.text('Allow')).tap();
    } catch (error) {
      // Remove the console statement
    }
  });

  it('should display the contacts list', async () => {
    // Wait for the FlatList to be visible

    // await element(by.id('main-view')).debug();
    // await device.log('main-view');
    await waitFor(element(by.id('contactslist'))).toBeVisible();

    // Wait for the first contact item to be visible
    await waitFor(element(by.id('contactitem1'))).toBeVisible();
    // .withTimeout(10000);

    // // Verify that the first contact is visible
    // await expect(element(by.id('contact-item-0'))).toBeVisible();
  });

  it('should filter contacts by name', async () => {
    await element(by.id('searchfilter')).typeText('John');
    await waitFor(element(by.id('contactslist'))).toBeVisible();
    await expect(element(by.id('contactitem0'))).toBeVisible();
    const attributes = await element(by.text('John Appleseed')).getAttributes();
    console.log('==>', attributes);
    await expect(element(by.text('John Appleseed'))).toBeVisible();
    // .withTimeout(5000);
    // });

    // it('should handle permissions dialog', async () => {
    //   try {
    //     await element(by.text('Allow')).tap();
    //   } catch (error) {
    //     console.log(
    //       'Permission dialog did not appear, possibly already granted.',
    //     );
    //   }
  });
});
