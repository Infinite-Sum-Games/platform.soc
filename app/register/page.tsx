'use client';

import { make_api_call } from '@/app/api/api';
import Navbar from '@/app/components/Navbar';
import Cloud from '@/app/components/dashboard-components/Cloud';
import SunGlareEffect from '@/app/components/dashboard-components/SunGlareEffect';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { toast } from '@/app/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as z from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .refine((email) => email.endsWith('@cb.students.amrita.edu'), {
      message: 'Email must end with @cb.students.amrita.edu',
    }),
  github_username: z
    .string()
    .min(3, 'GitHub username must be at least 3 characters')
    .max(50, 'GitHub username must be at most 50 characters'),
  first_name: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
  middle_name: z
    .string()
    .min(2, 'Middle name must be at least 2 characters')
    .max(50, 'Middle name must be at most 50 characters')
    .regex(/^[A-Za-z]+$/, 'Middle name must contain only letters'),
  last_name: z
    .string()
    .min(1, 'Last name must be at least 1 character')
    .max(50, 'Last name must be at most 50 characters')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type FormData = z.infer<typeof formSchema>;
type OtpData = z.infer<typeof otpSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    github_username: '',
    first_name: '',
    middle_name: '',
    last_name: '',
  });
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [resendTimer, setResendTimer] = useState(0);

  const validateField = (name: keyof FormData, value: string) => {
    const fieldSchema = formSchema.shape[name];
    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.errors[0]?.message,
      }));
    }
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

  const verifyGithubUsername = async (username: string) => {
    const result = await make_api_call({
      url: `https://api.github.com/users/${username}`,
      method: 'GET',
    });
    return result.success;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = formSchema.parse(formData);

      // Verify GitHub username
      const isGithubValid = await verifyGithubUsername(
        validatedData.github_username,
      );
      if (!isGithubValid) {
        toast({
          title: 'Error',
          description: 'Invalid GitHub username',
          variant: 'destructive',
        });
        return;
      }

      // Register user
      const result = await make_api_call({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        method: 'POST',
        body: validatedData,
      });

      if (!result.success) {
        throw new Error(result.error || 'Registration failed');
      }

      setAccessToken(result.data.access_key);
      setShowOtpInput(true);
      setCanResendOtp(false);
      setTimeout(() => setCanResendOtp(true), 5 * 60 * 1000); // Enable resend after 5 minutes

      toast({
        title: 'Success',
        description: 'OTP sent to your email',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        for (const err of error.errors) {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        }
        setErrors(newErrors);
      } else {
        toast({
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'Registration failed',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;
    setIsVerifying(true);

    try {
      // Validate OTP
      const validatedOtp = otpSchema.parse({ otp });

      const result = await make_api_call({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/otp/verify`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: validatedOtp,
      });

      if (!result.success) {
        throw new Error(result.error || 'OTP verification failed');
      }

      toast({
        title: 'Success',
        description: 'Registration successful!',
      });

      // TODO: Initiate GitHub OAuth
      router.push('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Error',
          description: 'OTP must be 6 digits',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'OTP verification failed',
          variant: 'destructive',
        });
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResendOtp) return;

    const result = await make_api_call({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/otp/resend`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (result.success) {
      setCanResendOtp(false);
      setResendTimer(300); // 5 minutes
      toast({
        title: 'Success',
        description: 'OTP resent to your email',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to resend OTP',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResendOtp && showOtpInput && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canResendOtp, showOtpInput, resendTimer]);

  useEffect(() => {
    if (showOtpInput) {
      setResendTimer(300); // 5 minutes
      setCanResendOtp(false);
    }
  }, [showOtpInput]);

  return (
    <>
      <SunGlareEffect />
      <Cloud />
      <Navbar />

      <div className="container mx-auto min-h-screen flex justify-center items-start md:items-center pt-[100px] md:pb-6 px-4 box-border">
        <div className="max-w-4xl w-full max-h-full">
          <div className="flex flex-col overflow-y-auto max-h-full rounded-2xl md:rounded-3xl border border-white/20 bg-white/40 p-4 sm:p-6 md:p-6 shadow-lg backdrop-blur-md">
            <div className="mb-6 sm:mb-8 md:mb-4 flex items-center justify-between">
              <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800">
                Amrita
                <span className="mb-6 font-extrabold tracking-tight text-yellow-300 ml-1 sm:ml-2">
                  Summer of Code
                </span>
              </h1>
            </div>

            {!showOtpInput ? (
              <form
                onSubmit={onSubmit}
                className="space-y-6 sm:space-y-8 md:space-y-6"
              >
                <div className="grid gap-4 sm:gap-6 md:gap-6 md:grid-cols-2">
                  <div className="space-y-2 sm:space-y-3 md:space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-base sm:text-lg md:text-base font-medium text-gray-800"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="cb.en.u4cse21008@cb.students.amrita.edu"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="h-12 sm:h-14 md:h-12 text-base sm:text-lg md:text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-2xl md:rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs sm:text-sm md:text-xs text-gray-500 italic font-bold mt-1">
                      Only college email allowed (must end with{' '}
                      <span className="font-mono">@cb.students.amrita.edu</span>
                      ).
                    </p>
                    {touched.email && errors.email && (
                      <p className="text-xs sm:text-sm md:text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-3">
                    <Label
                      htmlFor="github_username"
                      className="text-base sm:text-lg md:text-base font-medium text-gray-800"
                    >
                      GitHub Username
                    </Label>
                    <Input
                      id="github_username"
                      name="github_username"
                      placeholder="Ashrockzzz2003"
                      value={formData.github_username}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="h-12 sm:h-14 md:h-12 text-base sm:text-lg md:text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-2xl md:rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs sm:text-sm md:text-xs text-gray-500 italic font-bold mt-1">
                      Enter only your GitHub username (not the URL).
                      <a
                        href="https://www.google.com/search?q=How+to+Find+Github+Username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-700 font-semibold ml-1"
                      >
                        Learn How
                      </a>
                    </p>
                    {touched.github_username && errors.github_username && (
                      <p className="text-xs sm:text-sm md:text-xs text-red-500 mt-1">
                        {errors.github_username}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-3">
                    <Label
                      htmlFor="first_name"
                      className="text-base sm:text-lg md:text-base font-medium text-gray-800"
                    >
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="h-12 sm:h-14 md:h-12 text-base sm:text-lg md:text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-2xl md:rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {touched.first_name && errors.first_name && (
                      <p className="text-xs sm:text-sm md:text-xs text-red-500 mt-1">
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-3">
                    <Label
                      htmlFor="middle_name"
                      className="text-base sm:text-lg md:text-base font-medium text-gray-800"
                    >
                      Middle Name (Optional)
                    </Label>
                    <Input
                      id="middle_name"
                      name="middle_name"
                      placeholder="Middle Name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="h-12 sm:h-14 md:h-12 text-base sm:text-lg md:text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-2xl md:rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-3 md:space-y-3">
                    <Label
                      htmlFor="last_name"
                      className="text-base sm:text-lg md:text-base font-medium text-gray-800"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className="h-12 sm:h-14 md:h-12 text-base sm:text-lg md:text-base bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-2xl md:rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {touched.last_name && errors.last_name && (
                      <p className="text-xs sm:text-sm md:text-xs text-red-500 mt-1">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="group/button relative mt-6 sm:mt-8 md:mt-6 flex w-full cursor-pointer items-center justify-center rounded-3xl bg-blue-500/50 px-4 py-6 sm:py-8 md:py-6 text-base sm:text-lg md:text-lg font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-blue-500/70 hover:text-gray-800 hover:shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Register'}
                </Button>
              </form>
            ) : (
              <form
                onSubmit={onOtpSubmit}
                className="space-y-6 sm:space-y-8 md:space-y-6"
              >
                <div className="space-y-2 sm:space-y-3 md:space-y-3">
                  <p className="text-xs text-blue-700 font-bold italic mb-1">
                    OTP sent to{' '}
                    <span className="font-mono text-blue-900">
                      {formData.email}
                    </span>
                  </p>
                  <Label
                    htmlFor="otp"
                    className="text-base sm:text-lg md:text-base font-medium text-gray-800"
                  >
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="h-12 sm:h-14 md:h-12 text-xl sm:text-2xl md:text-xl tracking-widest text-left bg-white/20 text-gray-800 border-white/30 placeholder:text-gray-500 rounded-2xl md:rounded-xl transition-all duration-200 hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    {!canResendOtp && resendTimer > 0 && (
                      <span className="text-xs md:text-xs text-gray-600 font-bold">
                        Resend in {Math.floor(resendTimer / 60)}:
                        {(resendTimer % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={!canResendOtp}
                      className={
                        'text-xs font-semibold underline text-blue-700 disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed px-1 py-0.5 rounded transition-colors'
                      }
                    >
                      Resend
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4 md:gap-3">
                  <Button
                    type="submit"
                    className="group/button relative flex w-full cursor-pointer items-center justify-center rounded-3xl bg-blue-500/50 px-4 py-6 sm:py-8 md:py-6 text-base sm:text-lg md:text-lg font-medium text-gray-900 shadow-sm transition-all duration-200 hover:bg-blue-500/70 hover:text-gray-800 hover:shadow-md"
                    disabled={isVerifying}
                  >
                    {isVerifying ? 'Loading...' : 'Verify OTP'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
