import Login from '@/app/components/Auth/login';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Login",
    description: "Login Page",
  };

export default function LoginPage() {
  return (
    <Login />
  )
}
