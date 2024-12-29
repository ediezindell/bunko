import { SearchForm } from '@/components/SearchForm';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Suspense>
        <SearchForm />
      </Suspense>
    </>
  );
}
