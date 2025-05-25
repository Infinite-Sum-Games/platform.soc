import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSignIn = () => {
  const width = 600;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/github`,
    'GitHub Sign In',
    `width=${width},height=${height},left=${left},top=${top}`,
  );
};
