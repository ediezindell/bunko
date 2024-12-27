'use client';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return <button onClick={() => router.back()}>戻る</button>;
};

export default BackButton;
