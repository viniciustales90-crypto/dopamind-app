'use client';

import { useRouter } from 'next/navigation';
import QuizFlow from '@/components/quiz/QuizFlow';

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <QuizFlow onComplete={() => router.push('/result')} />
    </div>
  );
}
