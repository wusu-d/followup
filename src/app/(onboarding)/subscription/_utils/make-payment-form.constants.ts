import { number, object, string } from 'yup';

import {
  SUBSCRIPTION_CARD_HOLDER_NAME,
  SUBSCRIPTION_CARD_NUMBER,
  SUBSCRIPTION_CVV,
  SUBSCRIPTION_EXPIRY_DATE,
} from '@/slices/service-provider-subscription.slice';

export type MakePaymentFormType = {
  [SUBSCRIPTION_CARD_HOLDER_NAME]: string;
  [SUBSCRIPTION_CARD_NUMBER]: string;
  [SUBSCRIPTION_EXPIRY_DATE]: string;
  [SUBSCRIPTION_CVV]: string;
};

export const makePaymentFormValidationSchema = object().shape({
  [SUBSCRIPTION_CARD_HOLDER_NAME]: string().required(
    'Please enter card holder name'
  ),
  [SUBSCRIPTION_CARD_NUMBER]: number()
    .required('Please enter your card number')
    .typeError('Please enter a valid card number'),
  [SUBSCRIPTION_EXPIRY_DATE]: string().required('Expiry Date is required'),
  [SUBSCRIPTION_CVV]: number()
    .required('Invalid')
    .test('length', 'Invalid', (val) => `${val}`.length === 3)
    .typeError('Invalid'),
});
