'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type React from 'react';

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="mt-8 bg-linear-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center font-medium text-4xl text-transparent tracking-tight md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md',
        className,
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center ">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage:
              'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="absolute inset-auto right-1/2 h-56 w-120 overflow-visible bg-gradient-conic from-[#6e6cff] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          {/* <div className="absolute  w-full left-0   h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-full left-0    bottom-0 z-20 mask-[linear-gradient(to_right,white,transparent)]" /> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage:
              'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="absolute inset-auto left-1/2 h-56 w-120 bg-gradient-conic from-transparent via-transparent to-[#6e6cff] text-white [--conic-position:from_290deg_at_center_top]"
        >
          {/* <div className="absolute  w-40 h-full right-0    bottom-0 z-20 mask-[linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-full right-0   h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" /> */}
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="-translate-y-1/2 absolute inset-auto z-50 h-36 w-md rounded-full opacity-50 blur-3xl" />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '20rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="-translate-y-24 absolute inset-auto z-30 h-36 w-64 rounded-full blur-2xl"
        />
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="-translate-y-28 absolute inset-auto z-50 h-0.5 w-120 "
        />

        <div className="-translate-y-50 absolute inset-auto z-40 h-44 w-full " />
      </div>

      <div className="-translate-y-80 relative z-50 px-5">{children}</div>
    </div>
  );
};
