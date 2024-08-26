import type { Contact } from 'expo-contacts';
import type React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import constants from '@/constants';

type ContactItemProps = {
  contact: Contact;
  index: number;
  handlePress: () => void;
};
const ContactCard: React.FC<ContactItemProps> = ({
  contact,
  index,
  handlePress = () => {},
}) => {
  return (
    <TouchableOpacity
      className="mb-3 w-full flex-row items-center rounded-lg bg-white p-4 shadow"
      onPress={handlePress}
      testID={`contactitem${index}`}
    >
      <Image
        source={
          contact.image?.uri ? { uri: contact.image.uri } : constants.images.ava
        }
        className="mr-4 h-[60px] w-[60px] rounded-full"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className="mb-1 text-lg font-bold">{contact.name}</Text>
        {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
          <Text className="text-base text-gray-600">
            {contact.phoneNumbers[0]?.number}
          </Text>
        )}
        {contact.emails && contact.emails.length > 0 && (
          <Text className="text-base text-gray-600">
            {contact.emails[0]?.email}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;
