export function getRandomReceipes() {
    return {
      types: [`RANDOM_RECEIPES_PENDING`, 
              `RANDOM_RECEIPES_FULFILLED`, 
              `RANDOM_RECEIPES_REJECTED`],
      url: `/complexSearch?cuisine=${'italian'}`,
  
    };
  }
  