import type React from 'react';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

interface SearchFilterProps {
  placeholder?: string;
  onFilter: (query: string) => void;
  testID?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = 'Search...',
  onFilter,
  testID,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (query: string) => {
    setSearchQuery(query);
    onFilter(query);
  };

  return (
    <View className="mb-4" testID="searchfilterinput">
      <TextInput
        value={searchQuery}
        onChangeText={handleChange}
        placeholder={placeholder}
        className="rounded-lg bg-white p-3 shadow"
        testID={testID}
      />
    </View>
  );
};

export default SearchFilter;
