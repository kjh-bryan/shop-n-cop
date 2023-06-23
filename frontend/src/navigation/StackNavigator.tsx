import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HistoryPageScreen,
  RegisterScreen,
  ResultsPageScreen,
  SearchScreen,
  SignInScreen,
} from "../screens";
import { ShopNCopStackNavigation } from "./NavigationConstants";
import { StackParams } from "./NavigationTypes";

const Stack = createNativeStackNavigator<StackParams>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ShopNCopStackNavigation.signIn}>
        <Stack.Screen
          name={ShopNCopStackNavigation.signIn}
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ShopNCopStackNavigation.register}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ShopNCopStackNavigation.search}
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ShopNCopStackNavigation.results}
          component={ResultsPageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ShopNCopStackNavigation.history}
          component={HistoryPageScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
