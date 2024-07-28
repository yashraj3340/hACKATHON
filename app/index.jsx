import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.cards}
            className="max-w-full h-[120px]"
            resizeMode="contain"
          />

          <Image
            source={images.logo}
            className="max-w-full h-[230px]"
            resizeMode="contain"
          />

          <View>
            <Text className="text-3xl text-white font-bold text-center">
              Empower Indore's Community,{"\n"}
              Take Action Now!{" "}
              <Text className="text-secondary-200">CityAlert</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[18px] absolute -bottom-2 -right-4"
              resizeMode="contain"
            />
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-10"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
