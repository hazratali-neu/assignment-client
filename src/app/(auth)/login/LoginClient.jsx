'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Globe } from 'lucide-react';
import { authClient, signIn } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginData = {
      email: formData.get('email')?.toString().trim(),
      password: formData.get('password')?.toString(),
    };

    if (!loginData.email || !loginData.password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      const res = await signIn.email({
        email: loginData.email,
        password: loginData.password,
      });

      if (res?.error) {
        toast.error(res.error.message || 'Invalid email or password');
        return;
      }

      toast.success('Login successful!');
      router.push(callbackUrl);
    } catch (err) {
      console.log(err);
      toast.error('Server error during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center  bg-[#0b100b]  justify-center px-4">

      <div className="w-full max-w-md space-y-15  bg-white p-6 rounded-xl shadow">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">
            Welcome to <span className="text-blue-600">Login</span>
          </h2>
          <p className="text-slate-500">Login to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-10" onSubmit={handleLogin}>

          {/* Email */}
          <Input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full"
            startContent={<Mail className="w-4 h-4" />}
          />

          {/* Password */}
          <Input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full"
            startContent={<Lock className="w-4 h-4" />}
          />

          {/* Login Button */}
          <Button type="submit" color="primary" className="w-full h-12">
            Login <ArrowRight className="ml-2" />
          </Button>

          {/* Google Login */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-12 border border-slate-300 bg-white text-black"
          >
            <Globe className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <Link href="/register" className="text-blue-600 font-bold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}