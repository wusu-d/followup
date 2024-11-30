import { useFormik } from 'formik';
import { X } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { BiSolidPlusSquare } from 'react-icons/bi';
import { FaFilePdf } from 'react-icons/fa';
import * as Yup from 'yup';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import TaskIcon from '@/app/(authenticated)/clients/[clientId]/add-project/_components/TaskIcon';
import { useUploadInvoiceMutation } from '@/rtk-query/appointments';
import { compressImage } from '@/utils/compress-image.utils';
type FileWithPreview = {
  file: File;
  preview: string;
  id: string;
};

const validationSchema = Yup.object({
  amount: Yup.string().required('Please enter an amount'),
});

const UploadInvoiceButton = ({
  appointmentId,
  refetch,
}: {
  appointmentId: string;
  refetch: () => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploadInvoice, { isLoading }] = useUploadInvoiceMutation();
  const [price, setPrice] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      amount: price || '',
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleUploadInvoice = async () => {
    const data = new FormData();
    data.append('appointment_id', appointmentId);
    selectedFiles.forEach((document, index) => {
      data.append(`file`, document.file);
    });
    data.append('total_charge', `${price}`);
    try {
      await uploadInvoice(data).unwrap();
      refetch();
      setIsDialogOpen(false);
    } catch (error) {
      logger(error);
    }
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );

    const newFiles = await Promise.all(
      validFiles.map(async (file) => {
        let processedFile: File;
        let preview: string;

        if (file.type.startsWith('image/')) {
          // Apply compression for image files
          const compressedFile = await compressImage(file);
          // If compression fails, use original file
          processedFile = compressedFile || file;
          preview = URL.createObjectURL(processedFile);
        } else if (file.type === 'application/pdf') {
          processedFile = file;
          preview = '/images/projectcard.png';
        } else {
          processedFile = file;
          preview = '/api/placeholder/100/100';
        }

        return {
          file: processedFile,
          preview,
          id: Math.random().toString(36).substr(2, 9),
        };
      })
    );

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id);
      // Cleanup preview URLs
      prev.forEach((file) => {
        if (file.id === id && file.file.type.startsWith('image/')) {
          URL.revokeObjectURL(file.preview);
        }
      });
      return updatedFiles;
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className='px-[72px]'>Upload Invoice</Button>
      </DialogTrigger>
      <DialogContent className='rounded-2xl min-w-md p-10 border-none outline-none'>
        <DialogTitle className='text-[28px] text-[#111] font-bold mb-5 text-center'>
          Upload Invoice
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-5'>
            <Input
              id='amount'
              name='amount'
              isMoneyInput={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPrice(e.target.value);
              }}
              type='number'
              touched={formik.dirty}
              onBlur={formik.handleBlur}
              label='Invoice Amount'
              min={0}
              placeholder='Enter Amount'
              value={price}
              className='pr-10'
            />
          </div>
          {selectedFiles.length === 0 && (
            <div>
              <div className=' relative mx-auto w-[150px] flex items-center justify-center h-[150px] border border-primary-green bg-[#16C09814] rounded-full'>
                <TaskIcon />
                <label
                  htmlFor='pdf-upload'
                  className='cursor-pointer absolute bottom-0 right-0 h-[50px] w-[50px] bg-[#052536] rounded-full flex items-center justify-center'
                >
                  <input
                    id='pdf-upload'
                    type='file'
                    accept='.pdf,image/*'
                    className='hidden'
                    onChange={handleFileSelect}
                  />
                  <BiSolidPlusSquare size={24} color='#16C098' />{' '}
                </label>
              </div>
              <p className='text-center font-bold text-lg text-[#111] mt-5 mb-5'>
                Upload Invoice
              </p>
            </div>
          )}
          {selectedFiles.length > 0 && (
            <div className='grid place-items-center mb-4'>
              {selectedFiles.map((file) => (
                <div key={file.id} className='relative group '>
                  <div className='bg-[#F6F8FB] rounded-2xl p-4 relative w-[200px]'>
                    {file.file.type === 'application/pdf' ? (
                      <p className='h-[180px] grid place-items-center'>
                        <FaFilePdf className='text-primary-green' size={100} />
                      </p>
                    ) : (
                      <div className='relative rounded-[10px] w-full h-[180px] overflow-hidden'>
                        <Image
                          src={file.preview}
                          alt={file.file.name}
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <X className='h-4 w-4' />
                    </button>
                    <div className='flex gap-4 justify-between items-start mt-[10px] mb-1'>
                      <p className='text-[#111111] text-xs font-semibold leading-7 truncate'>
                        {file.file.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
        <DialogFooter>
          <div className='grid place-items-center'>
            <Button
              isLoading={isLoading}
              onClick={handleUploadInvoice}
              className='px-24'
              disabled={!price || selectedFiles.length === 0}
            >
              Submit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadInvoiceButton;
