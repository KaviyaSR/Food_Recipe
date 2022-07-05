export function getRandomReceipes() {
    return {
      types: [`RANDOM_RECEIPES_PENDING`, 
              `RANDOM_RECEIPES_FULFILLED`, 
              `RANDOM_RECEIPES_REJECTED`],
      url: `/complexSearch?apiKey=${'6801c08cede84bb99bccf86960684f84'}&number=${100}`,
  
    };
  }
  