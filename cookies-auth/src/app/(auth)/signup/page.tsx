import { Metadata } from 'next';
import SignUp from '@/app/components/Auth/signup';

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up Page",
};

export default function SignUpPage() {
  return (
    <SignUp />
  )
}
