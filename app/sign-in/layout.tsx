import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In – Econova",
  description: "Sign in to your Econova account.",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
