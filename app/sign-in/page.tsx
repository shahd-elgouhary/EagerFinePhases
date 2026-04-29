"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Leaf, AlertCircle } from "lucide-react";
import { SiGoogle, SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");
    try {
      await api.signIn(email, password);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1a281e]">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)` }} />
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Link href="/" className="font-cairo text-2xl text-white tracking-[-0.4px]">Econova</Link>
          <div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 w-fit mb-6">
              <Leaf className="h-3.5 w-3.5 text-[#4c7a5a]" />
              <span className="font-public-sans text-xs text-white/80 uppercase tracking-widest">Real Impact</span>
            </div>
            <h2 className="font-cairo text-4xl text-white leading-snug mb-4">Every tree planted starts with a single action.</h2>
            <p className="font-public-sans text-base text-white/60 leading-7">Join a global network of environmental stewards and track the real-time impact of your contributions.</p>
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[{ value: "7,202", label: "Trees Planted" }, { value: "455", label: "Volunteers" }, { value: "3", label: "Campaigns" }].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-4"><p className="font-cairo text-2xl text-white">{s.value}</p><p className="font-public-sans text-xs text-white/50 mt-1">{s.label}</p></div>
              ))}
            </div>
          </div>
          <p className="font-public-sans text-xs text-white/30">© 2024 Econova. All rights reserved.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-[#fdfbef]">
        <div className="w-full max-w-md">
          <div className="mb-4 lg:hidden"><Link href="/" className="font-cairo text-2xl text-[#1a281e] tracking-[-0.4px]">Econova</Link></div>
          <h1 className="font-cairo text-3xl text-[#1a281e] mb-2">Welcome back</h1>
          <p className="font-public-sans text-sm text-stone-500 mb-8">Sign in to your account to continue.</p>

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 mb-5">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              <p className="font-public-sans text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 mb-6">
            <Button variant="outline" className="h-12 w-full rounded-xl border-stone-200 bg-white font-public-sans text-sm text-stone-700 hover:bg-stone-50 gap-3" data-testid="button-google-signin">
              <SiGoogle className="h-4 w-4 text-red-500" />Continue with Google
            </Button>
            <Button variant="outline" className="h-12 w-full rounded-xl border-stone-200 bg-white font-public-sans text-sm text-stone-700 hover:bg-stone-50 gap-3" data-testid="button-github-signin">
              <SiGithub className="h-4 w-4" />Continue with GitHub
            </Button>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200" /></div>
            <div className="relative flex justify-center"><span className="bg-[#fdfbef] px-3 font-public-sans text-xs text-stone-400">or continue with email</span></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="font-public-sans text-sm text-stone-600">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 pl-10 rounded-xl border-stone-200 bg-white font-public-sans text-sm focus-visible:ring-[#4c7a5a]" data-testid="input-email" required />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-public-sans text-sm text-stone-600">Password</Label>
                <button type="button" className="font-public-sans text-xs text-[#4c7a5a] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-12 pl-10 rounded-xl border-stone-200 bg-white font-public-sans text-sm focus-visible:ring-[#4c7a5a]" data-testid="input-password" required />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-[#1a281e] font-cairo text-base text-white hover:bg-[#2e4535] mt-2 gap-2" data-testid="button-submit-signin">
              {loading ? "Signing in…" : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>
          <p className="text-center font-public-sans text-sm text-stone-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#4c7a5a] hover:underline font-medium">Sign Up</Link>
          </p>
          <p className="text-center font-public-sans text-xs text-stone-400 mt-4">Demo: elena@example.com / password123</p>
        </div>
      </div>
    </div>
  );
}
