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

// Sends the verification code to the user and shows either the success or error message via the snackbar
export async function sendVerificationCode(props) {
  const { setModalSnackbarMessage, setIsModalSnackbarVisible } = props;
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { email } = user.attributes;
    await Auth.verifyCurrentUserAttribute("email", { email });
    console.log("Verification sent");
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icons.successIcon}
        iconSize={16}
        iconColor={THEME.colors.primary}
        text={"SUCCESS: Verification code sent to " + email + "."}
        textColor={THEME.colors.primary}
      />
    );
    setIsModalSnackbarVisible(true);
  } catch (error) {
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icons.errorIcon}
        iconSize={THEME.icons.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text={
          "ERROR: Unable to send verification code to " +
          email +
          " ,please try again."
        }
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
    console.log("Error sending verification code: ", error);
  }
}
