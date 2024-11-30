export const GET_SUBSCRIPTION_PLANS = '/subscription-plans' as const;

export const GET_ACTIVE_SUBSCRIPTION_PATH = '/u/subscription/active' as const;

export const INITIALIZE_SUBSCRIPTION = '/u/subscription/init' as const;

export const LIST_PAYMENT_METHODS_PATH = '/u/payment-methods' as const;

export const GET_PAYMENT_HISTORY_PATH =
  'u/payment-method/payment-history' as const;

export const INITIALIZE_PAYMENT = '/u/payment-method/init' as const;

export const COMPLETE_PAYMENT = '/u/payment-method/complete' as const;

export const APPLY_COUPON_PATH = '/u/subscription/coupon/apply' as const;
