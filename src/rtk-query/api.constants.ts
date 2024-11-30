// BASE URL CONSTANT START
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// BASE URL CONSTANT END

// METHODS CONSTANTS START
export const GET_METHOD = 'get' as const;
export const POST_METHOD = 'post' as const;
export const PUT_METHOD = 'put' as const;
export const DELETE_METHOD = 'delete' as const;
export const PATCH_METHOD = 'patch' as const;
// METHODS CONSTANTS END

// AXIOS CONSTANTS START
export const AXIOS_TIMEOUT_TIME = 60000 as const;
export const AXIOS_TIMEOUT_MSG = 'Request Timeout' as const;
export const TOKEN_EXPIRED_MSG =
  'Session expired. please login again.' as const;
// AXIOS CONSTANT END

// UNAUTHENTICATED GLOBAL API REDUCER PATH START
export const UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH =
  'unauthenticated_global_api' as const;
// UNAUTHENTICATED GLOBAL API REDUCER PATH END

// AUTHENTICATED GLOBAL API REDUCER PATH START
export const AUTHENTICATED_GLOBAL_API_REDUCER_PATH =
  'authenticated_global_api' as const;
// AUTHENTICATED GLOBAL API REDUCER PATH END
