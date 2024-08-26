import { device } from 'detox';

beforeAll(async () => {
  await device.launchApp({
    permissions: {
      contacts: 'YES', // Mock granting access to contacts
    },
  });
});

beforeEach(async () => {
  await device.reloadReactNative();
});
