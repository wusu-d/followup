import { FaBoxOpen } from 'react-icons/fa';

import LoadingSpinner from '@/components/Spinner';

import { useGetPaymentHistoryQuery } from '@/rtk-query/subscription';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const transactions = [
  {
    date: '12 Jul 2023 - 11:23 am',
    payment: 'Regular - Monthly Plan',
    transactionId: 'SA4817CCXM6L848W00',
    price: -8.75,
  },
  {
    date: '12 Jun 2023 - 12:31 am',
    payment: 'Regular - Monthly Plan',
    transactionId: 'LK0421424TFQDSE568325',
    price: -8.75,
  },
  {
    date: '12 May 2023 - 01:23 pm',
    payment: 'Consultation Fee',
    transactionId: 'OPB5GH451XC21NB542J',
    price: -220.0,
  },
  {
    date: '12 Jun 2023 - 12:31 am',
    payment: 'Consultation Fee',
    transactionId: 'LK0421424TFQDSE568325',
    price: -220.0,
  },
  {
    date: '12 May 2023 - 01:23 pm',
    payment: 'Consultation Fee',
    transactionId: 'OPB5GH451XC21NB542J',
    price: -220.0,
  },
];

const PaymentHistory = () => {
  const { data, isLoading } = useGetPaymentHistoryQuery(
    { page: 1 },
    { refetchOnMountOrArgChange: true }
  );
  const transactions1 = data?.data ?? [];

  return (
    <div className='border rounded-[20px] border-[#F1F1F1] mt-10 p-5'>
      <p className='font-bold text-[#111] text-lg'>Payment History</p>
      {isLoading ? (
        <div className='grid place-items-center w-full min-h-72 '>
          <LoadingSpinner />
        </div>
      ) : transactions1.length === 0 ? (
        <div className='grid place-items-center w-full min-h-72'>
          <div className='flex flex-col items-center justify-center'>
            <FaBoxOpen className='text-primary-green' size={80} />
            <p className='text-[#111] font-bold'>Nothing to see here yet</p>
          </div>
        </div>
      ) : (
        <table className='w-full border-collapse mt-5'>
          <thead>
            <tr className=''>
              <th className='text-left py-2 px-4 font-bold text-[#111]'>
                Date
              </th>
              <th className='text-left py-2 px-4 font-bold text-[#111]'>
                Payment
              </th>
              <th className='text-left py-2 px-4 font-bold text-[#111]'>
                Transaction ID
              </th>
              <th className='text-left py-2 px-4 font-bold text-[#111]'>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions1?.map((transaction, index) => {
              const timestamp = transaction?.created_at * 1000;
              const date = new Date(timestamp);
              const formattedDate = date
                .toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true, // Use 12-hour format with am/pm
                })
                .replace(',', ' -');
              return (
                <tr key={index} className=''>
                  <td className='py-2 px-4 text-[#111]'>{formattedDate}</td>
                  <td className='py-2 px-4 text-[#111]'>
                    {transaction.intent}
                  </td>
                  <td className='py-2 px-4 text-[#111] font-mono'>
                    {transaction.transaction_id}
                  </td>
                  <td className='py-2 px-4 text-left font-semibold text-[#C30000]'>
                    {formatToCurrency(transaction.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
