import { useNetworkState } from "expo-network";

export const checkInternetConnection = () => {
  const networkState = useNetworkState();
  if (networkState && networkState.isConnected) {
    return networkState.isConnected;
  } else {
    return false;
  }
};
