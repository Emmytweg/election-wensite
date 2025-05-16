"use client";

import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // ✅ Capitalized
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast"



// Validation schema
const schema = yup.object().shape({
  matricNumber: yup.string().required("Matric Number is required"),
  fullName: yup.string().required("Full Name is required"),
  department: yup.string().required("Department is required"),
  faculty: yup.string().required("Faculty is required"),
  hallOfResidence: yup.string().required("Hall Of Residence is required"),
  level: yup.number().typeError("Level must be a number").required("Level is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>; // Define type from schema

export default function SignupPage() {
  const router = useRouter();
const API_URL = 'https://election-backend.up.railway.app' 
const[isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (res.ok) {
        toast.success(responseData.message || "Registration successful!");
        // alert(responseData.message || "Registration successful!");
        console.log(responseData);
        const { fullName, matricNumber, department } = responseData.user;

        localStorage.setItem('user', JSON.stringify({ fullName, matricNumber, department }));

        router.push("/vote");
      } else {
        toast.error("Registration failed. Please try again.");
        // alert(responseData.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again.");
      // console.error(error);
      // alert('Error Submitting Form: ' + error.message);
    }finally{
      setIsLoading(false)
    }
    console.log("Posting to:", `${API_URL}/users`);

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
            <Label htmlFor="faculty">Faculty</Label>
            <Input id="faculty" {...register("faculty")} placeholder="Technology" />
            <ErrorText>{errors.faculty?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="department">Department</Label>
            <Input id="department" {...register("department")} placeholder="Electrical Engineering" />
            <ErrorText>{errors.department?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="hallOfResidence">Hall Of Residence</Label>
            <Input id="hallOfResidence" {...register("hallOfResidence")} placeholder="Queen Idia Hall" />
            <ErrorText>{errors.hallOfResidence?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="level">Level</Label>
            <Input id="level" type="number" {...register("level")} placeholder="400" />
            <ErrorText>{errors.level?.message}</ErrorText>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} placeholder="Input Your Password" />
            <ErrorText>{errors.password?.message}</ErrorText>
          </LabelInputContainer>

          <button disabled={isLoading}
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
            type="submit"
          >
           {isLoading ?  'Registering...' : 'Register Now →' }
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
const LabelInputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

const BottomGradient = () => (
  <span className="absolute inset-0 h-full w-full rounded-md bg-gradient-to-br from-black to-neutral-600 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10"></span>
);

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  children ? <p className="text-red-500 text-xs mt-1">{children}</p> : null;
