import { Auth } from "aws-amplify";
import SnackbarContent from "../components/reusable_components/SnackbarContent";
import { THEME } from "../constants/Theme";

export async function getCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false,
    });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
