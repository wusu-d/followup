'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TermsPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='border border-[#E9E9E9] rounded-[20px] w-[90%] mx-auto my-5 py-8 relative px-20'>
        <span
          onClick={() => router.back()}
          className='cursor-pointer absolute top-5 right-5 h-10 w-10 border[#05253666] border rounded-full flex items-center justify-center'
        >
          <X color='#052536' strokeWidth={1.5} />
        </span>
        <div className='bg-[#F7F7F7] rounded-[20px] flex flex-col items-center py-8 gap-3 mb-10'>
          <h1 className='text-[28px] font-bold text-[#111]'>
            Terms & Conditions
          </h1>
          <p className='text-[#6B6B6B]'>Last Updated: July 10, 2023</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
          feugiat in ante metus. Neque convallis a cras semper. Lectus
          vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt
          ornare. Eros in cursus turpis massa tincidunt. Pharetra pharetra massa
          massa ultricies. Malesuada pellentesque elit eget gravida cum. Mauris
          augue neque gravida in fermentum et sollicitudin. Porttitor lacus
          luctus accumsan tortor posuere ac ut consequat. Ac orci phasellus
          egestas tellus rutrum tellus pellentesque eu. Libero justo laoreet sit
          amet cursus sit amet. Pharetra diam sit amet nisl suscipit. Varius
          <br />
          duis at consectetur lorem donec. Eleifend quam adipiscing vitae proin
          sagittis nisl rhoncus mattis rhoncus. Pellentesque adipiscing commodo
          elit at imperdiet dui accumsan. Massa placerat duis ultricies lacus.
          Sed nisi lacus sed viverra. A diam sollicitudin tempor id eu. Felis
          eget nunc lobortis mattis aliquam faucibus purus. Convallis convallis
          tellus id interdum. Vivamus at augue eget arcu dictum varius.
          Consequat mauris nunc congue nisi vitae suscipit tellus. Purus semper
          eget duis at tellus at. Eu mi bibendum neque egestas congue quisque
          egestas. Neque sodales ut etiam sit amet nisl. Morbi tristique
          <br />
          senectus et netus et malesuada. Donec massa sapien faucibus et
          molestie. Mattis rhoncus urna neque viverra justo nec. Donec pretium
          vulputate sapien nec sagittis. Adipiscing at in tellus integer feugiat
          scelerisque varius morbi. Neque ornare aenean euismod elementum. Dolor
          magna eget est lorem ipsum dolor sit amet consectetur. Viverra vitae
          congue eu consequat. Suspendisse in est ante in nibh mauris cursus.
          Dolor sed viverra ipsum nunc aliquet bibendum. Consectetur adipiscing
          elit ut aliquam purus sit amet luctus venenatis. Sed tempus urna et
          pharetra pharetra massa. Nibh sit amet commodo nulla. Tempus egestas
          <br />
          sed sed risus. Ut etiam sit amet nisl purus in mollis nunc sed.
          Facilisi cras fermentum odio eu feugiat. Nunc non blandit massa enim
          nec dui nunc mattis enim. Integer enim neque volutpat ac. Nunc
          pulvinar sapien et ligula ullamcorper malesuada proin libero nunc.
          Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Ut
          pharetra sit amet aliquam id. Tincidunt arcu non sodales neque
          sodales. Ut tellus elementum sagittis vitae et leo duis ut diam.
          Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.
          Lectus sit amet est placerat in egestas erat imperdiet. Vitae et leo
          <br />
          duis ut diam quam nulla porttitor. Aenean vel elit scelerisque mauris
          pellentesque pulvinar. Egestas sed tempus urna et pharetra pharetra.
          Neque ornare aenean euismod elementum nisi quis. Egestas fringilla
          phasellus faucibus scelerisque eleifend. Eget gravida cum sociis
          natoque penatibus et magnis. Eu tincidunt tortor aliquam nulla
          facilisi cras. Euismod nisi porta lorem mollis aliquam ut porttitor
          leo. Porttitor rhoncus dolor purus non enim praesent. Tincidunt dui ut
          ornare lectus sit amet est. Vel quam elementum pulvinar etiam non quam
          lacus. Tincidunt praesent semper feugiat nibh sed pulvinar. Volutpat
          diam ut venenatis tellus. Convallis a cras semper auctor neque vitae.
          Pellentesque elit eget gravida cum sociis. Faucibus turpis in eu mi
          bibendum neque egestas.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
