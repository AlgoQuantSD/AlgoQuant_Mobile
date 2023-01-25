import { AlgoQuant } from "algoquant/lib/AlgoQuant";

// This function is a helper function that is used to create and initialize the the Algoquant object from algoquant SDK.
// Param: User: amplify user object from user context
export default function initAlgoQuantApi(user) {
  const jwtToken = user?.signInUserSession?.accessToken?.jwtToken;
  return new AlgoQuant(jwtToken);
}
