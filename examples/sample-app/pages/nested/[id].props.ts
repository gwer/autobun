import { type PageGetServerSideProps } from 'autobun';

type NestedPageProps = {
  id: number;
};

const getServerSideProps: PageGetServerSideProps<NestedPageProps> = async ({
  route,
}) => {
  const id = route.params.id;
  const numberId = Number(id);
  const parsedId = Number.isInteger(numberId) ? numberId : NaN;

  if (isNaN(parsedId)) {
    return {
      notFound: true,
    };
  }

  return {
    id: parsedId,
  };
};

export default getServerSideProps;
