const endPoint = 'https://api.spoonacular.com/recipes';
const dev = {
  API_ENDPOINT_URL: endPoint
};

const prod = {
  API_ENDPOINT_URL: endPoint
};

const test = {
  API_ENDPOINT_URL: endPoint
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    case 'test':
      return test;
    default:
      break;
  }
};

export const env = getEnv();
