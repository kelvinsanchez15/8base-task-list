import { Auth, AUTH_STRATEGIES } from "@8base/auth";
const { REACT_APP_CLIENT_DOMAIN, REACT_APP_CLIENT_ID } = process.env;

export default Auth.createClient(
  {
    strategy: AUTH_STRATEGIES.WEB_COGNITO,
    subscribable: true,
  },
  {
    clientId: REACT_APP_CLIENT_ID,
    domain: REACT_APP_CLIENT_DOMAIN,
    redirectUri: `${window.location.origin}/auth/callback`,
    logoutRedirectUri: `${window.location.origin}/logout`,
  }
);
