import BackButton from "@/components/BackButton";

type Props = {
  params: Promise<{
    bookId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const bookId = (await params).bookId;
  return (
    <>
      <h1>books 個別</h1>
      <p>{bookId}</p>
      <BackButton />
    </>
  );
};

export default Page;
