import { useRouter } from 'expo-router';
import type React from 'react';
import { View } from 'react-native';

import ContactForm from '../src/componetns/ContactForm';

const CreateContactScreen: React.FC = () => {
  const router = useRouter();

  const handleContactSaved = () => {
    router.replace('/'); // Refresh the contact list after saving
  };

  return (
    <View className="flex-1 p-4">
      <ContactForm onContactSaved={handleContactSaved} />
    </View>
  );
};

export default CreateContactScreen;
