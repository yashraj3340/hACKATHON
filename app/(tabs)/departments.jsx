import React, { useState } from "react";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const departments = [
  { id: "1", name: "Public Works" },
  { id: "2", name: "Health and Sanitation" },
  { id: "3", name: "Education" },
  { id: "4", name: "Water Supply" },
  { id: "5", name: "Urban Planning" },
  { id: "6", name: "Fire Services" },
  { id: "7", name: "Parks and Recreation" },
  { id: "8", name: "Finance" },
  { id: "9", name: "Housing" },
  { id: "10", name: "Transportation" },
];

const Departments = () => {
  const [message, setMessage] = useState("");

  const handlePress = () => {
    setMessage("complaints to be added soon");
  };

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-semibold mb-4">
        Departments
      </Text>
      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handlePress}>
            <View className="py-3 px-4 bg-gray-800 rounded-lg mb-2">
              <Text className="text-lg text-white">{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {message ? (
        <Text className="text-lg text-white mt-4">{message}</Text>
      ) : null}
    </SafeAreaView>
  );
};

export default Departments;
