'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Globe } from 'lucide-react';
import { authClient, signUp} from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Register() {
  const router = useRouter();

   const handleGoogleLogin = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
      });
      console.log(data);
    };
  // password validation function
  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    if (!hasLength) return "Password must be at least 6 characters";
    if (!hasUpper) return "Password must contain an uppercase letter";
    if (!hasLower) return "Password must contain a lowercase letter";

    return null;
  };
  const handleRegister = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const registerData = {
    name: formData.get("name")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    image: formData.get("image")?.toString().trim(),
    password: formData.get("password")?.toString(),
  };

  console.log("CLEAN DATA:", registerData);

  // password validation
  const errorMsg = validatePassword(registerData.password);

  if (errorMsg) {
    toast.error(errorMsg);
    return;
  }

  try {
    const res = await signUp.email({
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      image: registerData.image,
    });
  console.log(res);
    if (res?.error) {
      toast.error(res.error.message || "Registration failed");
      return;
    }

    toast.success("Registration successful! Please login.");
    router.push("/login");

  } catch (err) {
    console.log(err);
    toast.error("Server error during registration");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b100b] px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">
            Join <span className="text-blue-600">Library</span>
          </h2>
          <p className="text-slate-500">Create your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleRegister}>

          {/* Name */}
          <Input
            name="name"
            required
            placeholder="Full Name"
            className="w-full"
            startContent={<User className="w-4 h-4" />}
          />

          {/* Email */}
          <Input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full"
            startContent={<Mail className="w-4 h-4" />}
          />

          {/* Image */}
          <Input
            name="image"
            type="url"
            required
            placeholder="Photo URL"
            className="w-full"
            startContent={<User className="w-4 h-4" />}
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

          {/* Register */}
          <Button type="submit" color="primary" className="w-full h-12">
            Create Account <ArrowRight className="ml-2" />
          </Button>


           {/* Google Button */}
        <Button
          // onClick={handleGoogleLogin}
          onClick={handleGoogleLogin}
          className="w-full h-12 border border-slate-300 bg-white text-black"
        >
          <Globe className="w-4 h-4 mr-2" />
          Continue with Google
        </Button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-bold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}