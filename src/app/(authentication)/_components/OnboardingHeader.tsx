const OnboardingHeader = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <h2>{title}</h2>

      <p className='w-3/6 mx-auto mt-2 text-[#6B6B6B]'>{content}</p>
    </>
  );
};

export default OnboardingHeader;
