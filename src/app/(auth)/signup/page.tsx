"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    matricNumber: "",
    fullName: "",
    department: "",
    level: "",
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

    const users = JSON.parse(localStorage.getItem("users") || "[]") as Array<{ matricNumber: string }>;

    const userExists = users.some(
      (user: { matricNumber: string }) => user.matricNumber === formData.matricNumber
    );

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

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="matricNumber">Matric Number</Label>
            <Input
              id="matricNumber"
              placeholder="190295"
              type="text"
              value={formData.matricNumber}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="Electrical Engineering"
              type="text"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              placeholder="400"
              type="number"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Input Your Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
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

const BottomGradient = () => {
  return (
    <span className="absolute inset-0 h-full w-full rounded-md bg-gradient-to-br from-black to-neutral-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10"></span>
  );
};
