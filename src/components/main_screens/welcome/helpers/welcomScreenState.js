import AsyncStorage from "@react-native-async-storage/async-storage";
import { WELCOME_SCREEN_SHOWN_KEY } from "../../../../general_constants/async-storage/asyncStorageKeys";

export const checkWelcomeScreenShown = async (setShowWelcomeScreen) => {
  const welcomeScreenShown = await AsyncStorage.getItem(
    WELCOME_SCREEN_SHOWN_KEY
  );
  if (welcomeScreenShown === "true") {
    setShowWelcomeScreen(false);
  }
};

export async function resetWelcomeScreen(setShowWelcomeScreen) {
  await AsyncStorage.setItem(WELCOME_SCREEN_SHOWN_KEY, "false");
  setShowWelcomeScreen(true);
}

export const handleWelcomeScreenCompleted = async (setShowWelcomeScreen) => {
  await AsyncStorage.setItem(WELCOME_SCREEN_SHOWN_KEY, "true");
  setShowWelcomeScreen(false);
  setTimeout(() => {
    resetWelcomeScreen(setShowWelcomeScreen);
  }, 1000);
};
