import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigation from "./navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={undefined} />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </Provider>
  );
}
