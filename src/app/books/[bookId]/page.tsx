import BackButton from "@/components/BackButton";

type Props = {
  params: {
    bookId: string;
  };
};

const Page = ({ params: { bookId } }: Props) => {
  return (
    <>
      <h1>books 個別</h1>
      <p>{bookId}</p>
      <BackButton />
    </>
  );
};

export default Page;
