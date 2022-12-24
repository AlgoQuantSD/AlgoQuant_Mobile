// Necessary credentials to connect to our Amplify authentication

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:022fe8ec-df61-465e-815e-a93f645afd87",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_bEKRzMrYd",
  aws_user_pools_web_client_id: "6p9ipia5g55atusv9j8ujkn61e",
  oauth: {},
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [
    "EMAIL",
    "FAMILY_NAME",
    "GIVEN_NAME",
    "PHONE_NUMBER",
  ],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
};

export default awsmobile;
