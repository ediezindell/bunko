import { SearchForm } from '@/components/SearchForm';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Suspense>
        <section className="grid place-items-center p-4">
          <SearchForm />
        </section>
      </Suspense>
    </>
  );
}
