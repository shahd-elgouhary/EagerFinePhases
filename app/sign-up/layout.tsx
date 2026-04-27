import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up – Econova",
  description: "Create your Econova account and start making an impact.",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
