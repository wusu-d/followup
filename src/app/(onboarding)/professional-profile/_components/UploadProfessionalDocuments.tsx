import { PiCloudArrowUp } from 'react-icons/pi';

import DocumentIcon from '@/components/icons/DocumentIcon';

const UploadProfessionalDocuments = ({
  label,
  id,
  onUpload,
  value,
}: {
  label: string;
  id: string;
  onUpload: (file: File[], shouldValidate?: boolean) => void;
  value: File[];
}) => {
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      // if (file.type.includes('image/')) {
      //   file =
      //     (await compressImage(file, {
      //       quality: 0.5,
      //       type: 'image/webp',
      //     })) || undefined;
      // }
      onUpload([file], true);
    } else if (!file) {
      return null;
    }
  }

  return (
    <div>
      <div className='relative focus-within:ring ring-primary-green/30 w-full aspect-[335/160] p-3 gap-2 flex flex-col items-center bg-light-green/50 justify-center border-2 border-primary-green border-dashed rounded-lg'>
        <PiCloudArrowUp className='text-primary-green text-5xl' />

        <div className='text-primary-green font-bold'>{label}</div>

        <div className='text-[#6B6B6B] w-3/5 text-xs'>
          Drag and drop the file or directly upload from the device (Only pdf
          files are accepted)
        </div>

        <input
          type='file'
          accept='application/pdf'
          id={id}
          max={1}
          min={1}
          className='absolute top-0 left-0 size-full opacity-0 cursor-pointer'
          onChange={handleFileUpload}
        />
      </div>

      {value && !!value.length && value[0] instanceof File && (
        <div className='w-full flex gap-4 items-center bg-[#F6F8FB] rounded-lg border border-[#e1e1e1] p-5 mt-4'>
          <div className='bg-[#DAF2D9] flex-shrink-0 text-4xl text-primary-green w-2/12 grid place-items-center aspect-[48/56] rounded-lg'>
            <DocumentIcon />
          </div>

          <div className='flex w-full flex-col gap-1 text-left'>
            <div className='text-sm font-semibold'>{value[0].name}</div>
            <div className='text-xs text-[#111111]/50'>{`${(
              value[0].size / 1024
            ).toLocaleString('en-us', {
              maximumFractionDigits: 2,
            })}KB`}</div>
            <div className='grid grid-cols-[1fr_auto] gap-4'>
              <span className='block w-full my-auto bg-primary-green h-3 rounded-full'></span>
              100%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProfessionalDocuments;
