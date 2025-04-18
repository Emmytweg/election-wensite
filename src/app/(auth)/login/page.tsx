"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    matricNumber: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (user: { matricNumber: string; password: string }) =>
        user.matricNumber === formData.matricNumber &&
        user.password === formData.password
    );

    if (!foundUser) {
      alert("Invalid matric number or password.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(foundUser)); // Save current session
    alert("Login successful!");
    router.push("/vote");
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

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="matricNumber">Matric Number</Label>
            <Input
              id="matricNumber"
              value={formData.matricNumber}
              onChange={handleChange}
              placeholder="190295"
              type="text"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Input Your Password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-500 to-neutral-300 font-medium text-white"
            type="submit"
          >
            Login →
            <BottomGradient />
          </button>
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
