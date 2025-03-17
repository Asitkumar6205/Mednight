"use client"
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

type FormData = z.infer<typeof FormSchema>;

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const [signUpLoading, setSignUpLoading] = useState(false);
>>>>>>> c3f08b9 (Study CRUD Added)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    setError(null);
<<<<<<< HEAD

=======
>>>>>>> c3f08b9 (Study CRUD Added)
    try {
      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInData?.error) {
<<<<<<< HEAD
        console.log(error)
=======
>>>>>>> c3f08b9 (Study CRUD Added)
        if (signInData.error.includes("CredentialsSignin")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        router.refresh();
        router.push("/admin");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SignInWithGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/admin" });
    setGoogleLoading(false)
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
=======
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      {signUpLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      )}
>>>>>>> c3f08b9 (Study CRUD Added)
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={SignInWithGoogle}
        >{googleLoading ? <Loader2 className="animate-spin text-stone-500" size={24} /> :  <FcGoogle size={20} /> }
        Sign In with Google
        </button>
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-md"
            />
            <span
              className="absolute right-3 top-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff
                  className="text-gray-500 hover:text-gray-700"
                  size={20}
                />
              ) : (
                <Eye className="text-gray-500 hover:text-gray-700" size={20} />
              )}
            </span>
            {errors.password?.message && (
              <p className="text-red-500 text-sm">
                {String(errors.password.message)}
              </p>
            )}
          </div>
          <div className="flex flex-row justify-between w-full items-center -mt-4">
            <div className="flex flex-row gap-1 items-center">
              <Checkbox className="scale-75 border-stone-400 text-white data-[state=checked]:bg-white data-[state=checked]:text-black" />
              <h4 className="text-xs text-stone-600">Remember me</h4>
            </div>
            <div className="text-xs text-blue-600">
              <Link href="#">Forgot Password?</Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 "
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-100"
                    fill="currentColor"
                    d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          If you don't have an account, please{" "}
<<<<<<< HEAD
          <Link href="/signup" className="text-blue-500 hover:underline">
=======
          <Link href="/signup" className="text-blue-500 hover:underline" onClick={(e) => {
            e.preventDefault();
            setSignUpLoading(true);
            router.push("/signup");
          }}>
>>>>>>> c3f08b9 (Study CRUD Added)
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
