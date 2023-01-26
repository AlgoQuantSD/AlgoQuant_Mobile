import { Auth } from "aws-amplify";

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

export async function sendVerificationCode() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { email } = user.attributes;
    await Auth.verifyCurrentUserAttribute("email", { email });
    console.log("Verification sent");
  } catch (error) {
    console.log("Error sending verification code: ", error);
  }
}

export async function handleVerificationCodeSubmit(verificationCode) {
  try {
    await Auth.verifyCurrentUserAttributeSubmit("email", verificationCode);
    // update the email in the user's profile and confirm the change to the user
  } catch (error) {
    console.log("Error submitting verification code: ", error);
  }
}
