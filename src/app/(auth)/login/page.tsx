"use client";

import React,{useState} from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Users from '../../../../my-election-backend/users.json'
// Validation schema
const schema = yup.object().shape({
  matricNumber: yup.string().required("Matric Number is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

type FormData = {
  matricNumber: string;
  password: string;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
 
  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        setError("matricNumber", {
          type: "manual",
          message: result.message || "Login failed",
        });
        setError("password", {
          type: "manual",
          message: result.message || "Login failed",
        });
        return;
      }
  
      localStorage.setItem("user", JSON.stringify(result.user));
      alert("Login successful!");
      router.push("/vote");
    } catch (error) {
      console.error(error);
      setError("matricNumber", {
        type: "manual",
        message: "Server error. Please try again.",
      });
    } finally{
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-black-500 dark:text-neutral-200">
          Election Login
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Log in to participate in the upcoming Election.
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="matricNumber">Matric Number</Label>
            <Input
              id="matricNumber" 
              placeholder="190295"
              type="text"
              {...register("matricNumber")}
            />
            {errors.matricNumber && (
              <p className="text-sm text-red-500">{errors.matricNumber.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password" 
              placeholder="Input Your Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-500 to-neutral-300 font-medium text-white"
            type="submit"
          >
            Login →
            <BottomGradient />
          </button>

          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Utility Components

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
