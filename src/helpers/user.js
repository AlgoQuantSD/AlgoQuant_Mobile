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
