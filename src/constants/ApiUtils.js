import { AlgoQuant } from "algoquant/lib/AlgoQuant";

export default function initAlgoQuantApi(user) {
  const jwtToken = user?.signInUserSession?.accessToken?.jwtToken;
  return new AlgoQuant(jwtToken);
}
