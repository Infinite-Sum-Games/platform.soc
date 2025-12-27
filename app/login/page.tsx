'use client';

import { useTheme } from '@/app/components/theme-context'; // Ensure path is correct
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from '@/app/components/ui/use-toast';
import { make_api_call } from '@/app/lib/api';
import { useAuthStore } from '@/app/store/useAuthStore';
import { ArrowRight, Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';

// Password hashing utility
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { classes, theme } = useTheme();
  const { setTokens } = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  const inputStyles =
    theme === 'SUMMER'
      ? 'bg-white/50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-600/50 focus:ring-blue-600/20'
      : 'bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20';

  const iconColor = theme === 'SUMMER' ? 'text-gray-500' : 'text-slate-400';

  const buttonStyles =
    theme === 'SUMMER'
      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/10'
      : 'bg-blue-400 hover:bg-blue-500 text-gray-900 shadow-blue-900/20';

  const linkStyles =
    theme === 'SUMMER'
      ? 'text-blue-600 hover:text-blue-500'
      : 'text-blue-400 hover:text-blue-300';

  const validateField = (name: keyof FormData, value: string) => {
    const fieldSchema = formSchema.shape[name];
    const result = fieldSchema.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);
      const hashedPassword = await hashPassword(validatedData.password);

      const result = await make_api_call<{
        accessToken: string;
        refreshToken: string;
        ghUsername: string;
        message: string;
      }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        method: 'POST',
        body: { email: validatedData.email, password: hashedPassword },
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Login failed');
      }

      console.log('Login successful:', result.data);

      setTokens({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        githubUsername: result.data.ghUsername,
        email: validatedData.email,
        bounty: 0,
      });

      toast({ title: 'Success', description: 'Logged in successfully!' });
      router.push('/');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Main Container
    <div className="relative h-[90vh] flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-md">
        <div
          className={`backdrop-blur-xl ${classes.cardBg} ${classes.cardBorder} border rounded-2xl shadow-2xl p-8 overflow-hidden transition-colors duration-300`}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1
              className={`text-3xl font-bold tracking-tight ${classes.cardTitle} mb-2`}
            >
              Welcome Back
            </h1>
            <p className={`text-sm ${classes.cardText}`}>
              Enter your credentials to access your account
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`font-medium ml-1 ${classes.cardText}`}
              >
                Email Address
              </Label>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${iconColor} group-focus-within:text-blue-500`}
                >
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`pl-10 h-11 rounded-xl transition-all ${inputStyles} ${
                    touched.email && errors.email
                      ? 'border-red-500/50 focus:border-red-500/50'
                      : ''
                  }`}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-xs text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label
                  htmlFor="password"
                  className={`font-medium ${classes.cardText}`}
                >
                  Password
                </Label>
              </div>
              <div className="relative group">
                <div
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${iconColor} group-focus-within:text-blue-500`}
                >
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`pl-10 h-11 rounded-xl transition-all ${inputStyles} ${
                    touched.password && errors.password
                      ? 'border-red-500/50 focus:border-red-500/50'
                      : ''
                  }`}
                />
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full h-11 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${buttonStyles}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Login
                  <ArrowRight
                    size={18}
                    className="opacity-80"
                  />
                </span>
              )}
            </Button>

            {/* Footer */}
            <div className="text-center pt-2">
              <p className={`text-sm ${classes.cardText} opacity-80`}>
                Don't have an account?{' '}
                <Link
                  href="https://anokha.amrita.edu/events"
                  className={`font-medium transition-colors hover:underline underline-offset-4 ${linkStyles}`}
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
