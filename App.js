import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChatStackNavigator from "./src/navigations/Navigator";

const App = () => {
  // let [fontsLoaded] = useFonts({
  //   Montserrat_700Bold,
  //   Montserrat_600SemiBold,
  //   Montserrat_800ExtraBold
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <NavigationContainer>
      <ChatStackNavigator />
    </NavigationContainer>
  );
};
export default App;
