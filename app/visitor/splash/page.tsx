// app/visitor/splash/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const VisitorSplash = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/visitor/home');
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-l from-blue-900 to-cyan-700 text-white p-4">
      <Loader size={200} className='text-cyan-500 animate-spin'/>
      <h1 className="text-3xl font-bold mb-4">Welcome Visitor!</h1>
      <p className="mb-6 text-center animate-pulse">You can add, check, and delete your tasks. Let’s go!</p>
      <Button onClick={handleStart} className="bg-cyan-600 text-white hover:bg-gray-200 hover:text-black w-[6rem]">
        Start
      </Button>
    </main>
  );
};

export default VisitorSplash;