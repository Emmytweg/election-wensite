"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Validation schema
const schema = yup.object().shape({
  matricNumber: yup.string().required("Matric Number is required"),
  fullName: yup.string().required("Full Name is required"),
  department: yup.string().required("Department is required"),
  level: yup.number().typeError("Level must be a number").required("Level is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<{ matricNumber: string }>;

    const userExists = users.some((user) => user.matricNumber === formData.matricNumber);

    if (userExists) {
      alert("Matric number already registered.");
      return;
    }

    const updatedUsers = [...users, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(formData)); // current session

    alert("Registration successful!");
    router.push("/vote");
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Election Registration
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Sign up to participate in the upcoming Election.
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="matricNumber">Matric Number</Label>
            <Input id="matricNumber" {...register("matricNumber")} placeholder="190295" />
            <ErrorText>{errors.matricNumber?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
            <ErrorText>{errors.fullName?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="department">Department</Label>
            <Input id="department" {...register("department")} placeholder="Electrical Engineering" />
            <ErrorText>{errors.department?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="level">Level</Label>
            <Input id="level" {...register("level")} placeholder="400" type="number" />
            <ErrorText>{errors.level?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register("password")} placeholder="Input Your Password" type="password" />
            <ErrorText>{errors.password?.message}</ErrorText>
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
            type="submit"
          >
            Register Now →
            <BottomGradient />
          </button>

          <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            Already registered?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Utility Components

const LabelInputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => (
  <span className="absolute inset-0 h-full w-full rounded-md bg-gradient-to-br from-black to-neutral-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10"></span>
);

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  children ? <p className="text-red-500 text-xs mt-1">{children}</p> : null;
