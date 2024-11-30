'use client';

import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { object, string } from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';

import { useAppDispatch, useAppSelector } from '@/store';

import UpgradeSubscriptionDialog from '@/app/(authenticated)/profile/_components/UpgradeSubscriptionDialog';
import {
  useApplyCouponMutation,
  useInitializeSubscriptionMutation,
} from '@/rtk-query/subscription';
import { updateEditProfileState } from '@/slices/editProfile.slice';
import {
  SUBSCRIPTION_DISCOUNT,
  SUBSCRIPTION_NEW_PRICE,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_FREE_TRIAL,
  SUBSCRIPTION_PROMO_CODE,
  SUBSCRIPTION_SLICE_REDUCER_NAME,
  updateSubscriptionState,
} from '@/slices/service-provider-subscription.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const ConfirmPaymentDetailsForm = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [applyCoupon, { isLoading }] = useApplyCouponMutation();
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initializeSubscription, { isLoading: isInitializeLoading }] =
    useInitializeSubscriptionMutation();
  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => {
    dispatch(updateEditProfileState({ stage: 'home' }));
    setIsDialogOpen(false);
  };

  const {
    [SUBSCRIPTION_PROMO_CODE]: promoCode,
    [SUBSCRIPTION_NEW_PRICE]: promoPrice,
    [SUBSCRIPTION_DISCOUNT]: discountAmount,
    [SUBSCRIPTION_PLAN]: plan,
    [SUBSCRIPTION_PLAN_FREE_TRIAL]: freeTrial,
  } = useAppSelector((state) => state[SUBSCRIPTION_SLICE_REDUCER_NAME]);

  const memoizedInitiaValues = useMemo(() => {
    return {
      [SUBSCRIPTION_PROMO_CODE]: promoCode,
    };
  }, [promoCode]);

  const formik = useFormik({
    initialValues: memoizedInitiaValues,
    validationSchema: object().shape({
      [SUBSCRIPTION_PROMO_CODE]: string().optional(),
    }),
    onSubmit: async (value) => {
      // logic here
      try {
        await applyCoupon({
          code: value[SUBSCRIPTION_PROMO_CODE],
        }).unwrap();

        setCouponMessage('true');
        dispatch(updateSubscriptionState(value));
      } catch (err) {
        if (err && typeof err === 'object') {
          if ('data' in err && typeof err.data === 'object' && err.data) {
            if ('messages' in err.data && err.data.messages) {
              const data = err.data.messages as Record<string, string>;
              toast(data.error);
            }
          }
        }
        logger(err);
      }
    },
  });

  const getInputProps = (id: keyof typeof formik.values) => {
    return {
      ...formik.getFieldProps(id),
      ...formik.getFieldMeta(id),
    };
  };

  const promoInputProps = getInputProps(SUBSCRIPTION_PROMO_CODE);

  const handleContinue = async () => {
    if (pathname === '/profile') {
      try {
        await initializeSubscription({ plan_id: plan?.id }).unwrap();
        openDialog();
      } catch (error) {
        logger(error);
      }
    } else {
      dispatch(updateSubscriptionState({ stage: 'payment-details' }));
    }
  };

  const price = plan?.price;

  const discountPrice =
    promoPrice && plan?.billing_cycle === 'yearly'
      ? promoPrice * 12
      : promoPrice;
  const totalAmount =
    price && plan?.billing_cycle === 'yearly' ? price * 12 : price;
  return (
    <div className='mx-auto'>
      {!freeTrial ||
        (pathname !== '/profile' && (
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-end gap-3'>
              <Input
                id={SUBSCRIPTION_PROMO_CODE}
                required
                label='Promo Code'
                type='text'
                placeholder='Have A Promo Code? Enter Here'
                autoFocus
                {...promoInputProps}
              />

              <Button
                className='py-4 px-12'
                type='submit'
                disabled={!promoInputProps.value.length}
                isLoading={isLoading}
              >
                Apply
              </Button>
            </div>

            {couponMessage && (
              <p className='mt-2 font-medium text-[#16C098]'>
                Coupon Successfully Applied
              </p>
            )}
          </form>
        ))}

      <div className='bg-light-green p-4 mt-5 rounded-[11px]'>
        <p className='p-4 bg-white rounded-[10px]'>
          Subscription Plan:{' '}
          <span className='font-bold text-primary-green'>{plan?.name}</span>
        </p>

        <table className='w-full mt-4 border-separate border-spacing-y-3'>
          <tbody>
            <tr>
              <td className='text-left'>Subscription Amount</td>
              <td className='text-right'>
                {price && formatToCurrency(price)} / Month
              </td>
            </tr>
            {/* <tr>
              <td className='text-left'>Convenience Fees</td>
              <td className='text-right'>$2.50</td>
            </tr> */}
            {promoCode && (
              <tr>
                <td className='text-left'>Discount</td>
                <td className='text-right'>
                  {formatToCurrency(discountAmount)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr className='w-5/6 mt-3 border-primary-black/20 mx-auto' />
        <table className='w-full mt-3'>
          <tbody>
            <tr className='font-bold'>
              <td className='text-left'>Total Amount</td>
              <td className='text-right'>
                {promoCode
                  ? formatToCurrency(discountPrice)
                  : totalAmount && formatToCurrency(totalAmount)}{' '}
                / {plan?.billing_cycle === 'yearly' ? 'Year' : 'Month'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='w-max mt-8 mx-auto'>
        <Button
          onClick={handleContinue}
          isLoading={isInitializeLoading}
          type='submit'
          className=' py-4 px-7'
        >
          Continue & pay
        </Button>
      </div>
      <UpgradeSubscriptionDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
      />
    </div>
  );
};

export default ConfirmPaymentDetailsForm;
