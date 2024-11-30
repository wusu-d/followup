export const GET_SERVICE_CHALLENGE_PATH = (id: string | string[]) => {
  return `/services/${id}/challenge`;
};

export const GET_SERVICE_PROVIDERS_PATH = (id: string | string[]) => {
  return `/u/services/${id}/get-providers`;
};

export const GET_PROVIDER_PORTFOLIO_PATH = (userId: string) => {
  return `/u/services/providers/${userId}/get-portfolio`;
};

export const GET_PROVIDER_AVAILABILITY_PATH = (providerId: string) => {
  return `/u/provider/${providerId}/availability`;
};
