import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, View } from 'react-native';

import ContactCard from '@/componetns/ContactCard';
import CustomButton from '@/componetns/CustomButton';
import SearchFilter from '@/componetns/SearchFilter';
import { useRefresh } from '@/context/RefreshContext';

const ContactsListScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    [],
  );
  const { refresh } = useRefresh();
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails,
            Contacts.Fields.Image,
          ],
        });
        if (data) {
          setContacts(data);
          setFilteredContacts(data);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch contacts');
      }
    };

    fetchContacts();
  }, [refresh]);

  const filterContacts = (query: string) => {
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = contacts.filter((contact) => {
        const nameMatch = contact.name?.toLowerCase().includes(lowerCaseQuery);
        const phoneMatch = contact.phoneNumbers?.some(
          (phoneNumber) =>
            phoneNumber.number?.toLowerCase().includes(lowerCaseQuery),
        );
        const emailMatch = contact.emails?.some(
          (email) => email.email?.toLowerCase().includes(lowerCaseQuery),
        );
        return nameMatch || phoneMatch || emailMatch;
      });
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: Contacts.Contact;
    index: number;
  }) => {
    const handlePress = () => {
      router.push(`/edit/${item.id}`);
    };
    return (
      <ContactCard contact={item} index={index} handlePress={handlePress} />
    );
  };

  return (
    <SafeAreaView>
      <View
        className="flex h-full w-full px-4 "
        id="main-view"
        testID="mainview"
      >
        <CustomButton
          title="Create Contact"
          handlePress={() =>
            router.push({
              pathname: '/modal',
            })
          }
          containerStyles="w-full mt-7 mb-7"
        />
        <SearchFilter
          placeholder="Search by Name, Number, or Email"
          onFilter={filterContacts}
          testID="searchfilter"
        />

        {filteredContacts.length ? (
          <FlatList
            testID="contactslist"
            data={filteredContacts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
              padding: 3,
              backgroundColor: '#f5f5f5',
            }}
          />
        ) : (
          <Text>No contacts synced</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContactsListScreen;
