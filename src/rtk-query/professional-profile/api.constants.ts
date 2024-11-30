export const UPDATE_WORK_PROFILE_PATH = '/u/profile/work/update' as const;

export const COMPLETE_ONBOARDING_PATH = '/u/profile/complete' as const;

export const UPLOAD_PROFILE_DOCUMENTS_PATH =
  '/u/profile/documents/upload' as const;

export const UPDATE_BANK_EMAIL_PATH = '/u/profile/bank' as const;

export const UPDATE_AVAILABILTY_PATH = '/u/availability/update' as const;

export const GET_SERVICES_PATH = '/services' as const;

export const UPDATE_USER_SERVICES_PATH = '/u/services/update' as const;

export const FETCH_USER_sERVICES_PATH = '/u/services/fetch/all' as const;

export const GET_AVAILABILITY_PATH = '/u/availability';

export const DELETE_SERVICE_PATH = (serviceId: string) => {
  return `/u/services/${serviceId}`;
};

export const UPDATE_SERVICE_PRICE_PATH = (id: string) => {
  return `/u/services/${id}/update-price`;
};
