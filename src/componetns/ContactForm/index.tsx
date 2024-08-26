import * as Contacts from 'expo-contacts';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRefresh } from '@/context/RefreshContext';
import { validateAddress, validateEmail, validatePhoneNumber } from '@/helpers';

import CustomButton from '../CustomButton';

interface ContactFormProps {
  contactId?: string; // Optional prop to determine if it's an update or create
}

const ContactForm: React.FC<ContactFormProps> = ({ contactId }) => {
  const [name, setName] = useState<string>('');
  const [emails, setEmails] = useState<string[]>(['']);
  const [phones, setPhones] = useState<string[]>(['']);
  const [address, setAddress] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();
  const { triggerRefresh } = useRefresh();

  useEffect(() => {
    const loadContact = async () => {
      if (contactId) {
        const contact = await Contacts.getContactByIdAsync(contactId);
        if (contact) {
          setName(contact.name || '');
          setEmails(contact.emails?.map((email) => email.email) || ['']);
          setPhones(contact.phoneNumbers?.map((phone) => phone.number) || ['']);
          setAddress(contact.addresses?.[0]?.street || '');
          setImageUri(contact.image?.uri || null);
        }
      }
    };
    loadContact();
  }, [contactId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addEmailField = () => setEmails([...emails, '']);
  const removeEmailField = (index: number) =>
    setEmails(emails.filter((_, i) => i !== index));
  const updateEmail = (text: string, index: number) => {
    const newEmails = [...emails];
    newEmails[index] = text;
    setEmails(newEmails);
  };

  const addPhoneField = () => setPhones([...phones, '']);
  const removePhoneField = (index: number) =>
    setPhones(phones.filter((_, i) => i !== index));
  const updatePhone = (text: string, index: number) => {
    const newPhones = [...phones];
    newPhones[index] = text;
    setPhones(newPhones);
  };

  const handleSubmit = async () => {
    if (!name || !phones[0]) {
      Alert.alert('Name and at least one phone number are required');
      return;
    }

    if (!validatePhoneNumber(phones[0])) {
      Alert.alert('Please enter a valid phone number');
      return;
    }

    for (const email of emails) {
      if (email && !validateEmail(email)) {
        Alert.alert('Please enter a valid email address');
        return;
      }
    }

    if (address && !validateAddress(address)) {
      Alert.alert('Please enter a valid address');
      return;
    }

    const contactData = {
      [Contacts.Fields.FirstName]: name,
      [Contacts.Fields.Emails]: emails
        .filter((email) => email)
        .map((email) => ({ email, label: 'work' })),
      [Contacts.Fields.PhoneNumbers]: phones
        .filter((phone) => phone)
        .map((phone) => ({ number: phone, label: 'mobile' })),
      [Contacts.Fields.Addresses]: address
        ? [{ street: address, label: 'home' }]
        : [],
      [Contacts.Fields.Image]: imageUri ? { uri: imageUri } : undefined,
    };

    try {
      if (contactId) {
        await Contacts.updateContactAsync({ ...contactData, id: contactId });
        Alert.alert('Contact updated successfully');
      } else {
        await Contacts.addContactAsync(contactData);
        Alert.alert('Contact created successfully');
      }

      triggerRefresh();
      router.push('/');
    } catch (error) {
      Alert.alert('Failed to save contact');
    }
  };

  return (
    <ScrollView className="flex-1 p-5" testID="scrollable-container">
      {imageUri ? (
        <View className=" items-center">
          <Image
            source={{ uri: imageUri }}
            className="h-24 w-24 rounded-full"
            testID="image"
          />
        </View>
      ) : (
        <View className=" items-center">
          <View className="h-24 w-24 rounded-full bg-gray-200" testID="image" />
        </View>
      )}
      <TouchableOpacity
        testID="image-picker-button"
        className="mb-5 items-center"
        onPress={pickImage}
      >
        <Text className="mt-2 text-secondary">Update Image</Text>
      </TouchableOpacity>

      <TextInput
        testID="name-input"
        className="mb-4 h-10 rounded-lg border border-gray-300 px-3"
        placeholder="Name (Required)"
        value={name}
        onChangeText={setName}
      />

      {phones.map((phone, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`phone${index}`} className="mb-4 flex-row items-center">
          <TextInput
            testID={`phone-input-${index}`}
            className="h-10 flex-1 rounded-lg border border-gray-300 px-3"
            placeholder={`Phone ${index + 1}`}
            value={phone}
            onChangeText={(text) => updatePhone(text, index)}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            onPress={() => removePhoneField(index)}
            className="ml-2"
          >
            <Text className="text-red-500">Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        testID="add-phone-button"
        onPress={addPhoneField}
        className="mb-4"
      >
        <Text className="text-secondary">Add Phone Number</Text>
      </TouchableOpacity>

      {emails.map((email, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`email${index}`} className="mb-4 flex-row items-center">
          <TextInput
            testID={`email-input-${index}`}
            className="h-10 flex-1 rounded-lg border border-gray-300 px-3"
            placeholder={`Email ${index + 1}`}
            value={email}
            onChangeText={(text) => updateEmail(text, index)}
            keyboardType="email-address"
          />
          <TouchableOpacity
            onPress={() => removeEmailField(index)}
            className="ml-2"
          >
            <Text className="text-red-500">Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        testID="add-email-button"
        onPress={addEmailField}
        className="mb-4"
      >
        <Text className="text-secondary">Add Email</Text>
      </TouchableOpacity>

      <TextInput
        testID="address-input"
        className="mb-4 h-10 rounded-lg border border-gray-300 px-3"
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <CustomButton
        testID="submit-button"
        title={contactId ? 'Update Contact' : 'Create Contact'}
        handlePress={handleSubmit}
      />
    </ScrollView>
  );
};
export default ContactForm;
