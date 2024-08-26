import { useLocalSearchParams, useRouter } from 'expo-router';
import type React from 'react';
import { View } from 'react-native';

import ContactForm from '../../src/componetns/ContactForm';

const EditContactScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handleContactSaved = () => {
    router.replace('/'); // Refresh the contact list after saving
  };

  return (
    <View className="flex-1 p-4">
      <ContactForm contactId={id} onContactSaved={handleContactSaved} />
    </View>
  );
};

export default EditContactScreen;
