import BackButton from '@/components/BackButton';

type Props = {
  params: Promise<{
    isbn: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const isbn = (await params).isbn;
  return (
    <>
      <h1>books</h1>
      <p>{isbn}</p>
      <BackButton />
    </>
  );
};

export default Page;
