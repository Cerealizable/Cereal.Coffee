const dev = {
  STRIPE_KEY: "pk_test_51HSSaVJTHaakjM27QJfqv7a0MfXRLtOynXdaz17urPEcbqJxTsgA6tf5eeycLgMJcdS6DNGsp2RUWy2sY9xi1AEv004gkYhAmn",
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-cereal-coffee-shop-infra-s3-uploads4f6eb0fd-1aq1kf2pw4gjg"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "api.cerealizable.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_9eXnfOYq5",
    APP_CLIENT_ID: "3l58ufc14pe1gokjie1ibr79id",
    IDENTITY_POOL_ID: "us-east-1:abc4706b-c071-4c6a-8475-301348955711"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51HSSaVJTHaakjM27QJfqv7a0MfXRLtOynXdaz17urPEcbqJxTsgA6tf5eeycLgMJcdS6DNGsp2RUWy2sY9xi1AEv004gkYhAmn",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-cereal-coffee-shop-infra-s3-uploads4f6eb0fd-p1cpkcb2i8k1"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "api.cerealizable.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_aWwj7Spv4",
    APP_CLIENT_ID: "3h5kss1b2pqudi5g15lkou9h6g",
    IDENTITY_POOL_ID: "us-east-1:0d3d9e34-8d3f-43bf-8f11-bbad7494fad2"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};