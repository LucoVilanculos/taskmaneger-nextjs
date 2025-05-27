// app/visitor/splash/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const VisitorSplash = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/visitor/home');
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }} 
      className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-l from-blue-900 to-cyan-700 text-white p-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
      >
        <Loader size={150} className='text-cyan-500'/>
      </motion.div>

      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="md:text-2xl lg:text-3xl font-bold mt-6 mb-4"
      >
        Welcome Visitor!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }} 
        className="mb-6 text-center animate-pulse"
      >
        You can add, check, and delete your tasks. Let’s go!
      </motion.p>
    
      <motion.div 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <Button onClick={handleStart} className="bg-cyan-600 text-white hover:bg-gray-200 hover:text-black w-[6rem]">
          Start
        </Button>
      </motion.div> 
    </motion.main>
  );
};

export default VisitorSplash;