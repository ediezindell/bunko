import Link from 'next/link';

const Page = () => {
  return (
    <>
      <h1>books</h1>
      {[1, 2, 3, 4, 5].map((i) => (
        <Link href={`/books/${i}`} key={i}>
          {i}
        </Link>
      ))}
    </>
  );
};

export default Page;
