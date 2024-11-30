import PageComponentWrapper from '@/components/PageComponentWrapper';

import ClientList from '@/app/(authenticated)/clients/_components/ClientList';

const ClientsPage = () => {
  return (
    <PageComponentWrapper headerComponent={<h3>Clients</h3>}>
      <ClientList />
    </PageComponentWrapper>
  );
};

export default ClientsPage;
