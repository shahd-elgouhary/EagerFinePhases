import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiGoogle, SiGithub } from "react-icons/si";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const perks = [
  "Track your personal environmental impact",
  "Join local & global reforestation campaigns",
  "Connect with a community of stewards",
  "Real-time map updates & live activity",
];

export const SignUpPage = (): JSX.Element => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast({ title: "Account created!", description: `Welcome to Econova, ${data.name}!` });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1a281e]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png)` }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Link href="/">
            <span className="[font-family:'Cairo',Helvetica] text-2xl font-normal text-white tracking-[-0.4px]">Econova</span>
          </Link>
          <div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 w-fit mb-6">
              <Leaf className="h-3.5 w-3.5 text-[#4c7a5a]" />
              <span className="[font-family:'Public_Sans',Helvetica] text-xs text-white/80 uppercase tracking-widest">Join the Movement</span>
            </div>
            <h2 className="[font-family:'Cairo',Helvetica] text-4xl font-normal text-white leading-snug mb-6">
              Start your journey as an environmental steward.
            </h2>
            <div className="flex flex-col gap-3">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#4c7a5a] shrink-0 mt-0.5" />
                  <p className="[font-family:'Public_Sans',Helvetica] text-sm text-white/70 leading-6">{perk}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="[font-family:'Public_Sans',Helvetica] text-xs text-white/30">
            © 2024 Econova. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-[#fdfbef]">
        <div className="w-full max-w-md">
          <div className="mb-2 lg:hidden">
            <Link href="/">
              <span className="[font-family:'Cairo',Helvetica] text-2xl font-normal text-[#1a281e] tracking-[-0.4px]">Econova</span>
            </Link>
          </div>

          <h1 className="[font-family:'Cairo',Helvetica] text-3xl font-normal text-[#1a281e] mb-2">Create your account</h1>
          <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-500 mb-8">
            It's free. Join thousands of stewards today.
          </p>

          {/* Social login */}
          <div className="flex flex-col gap-3 mb-6">
            <Button variant="outline" className="h-12 w-full rounded-xl border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm text-stone-700 hover:bg-stone-50 gap-3"
              data-testid="button-google-signup">
              <SiGoogle className="h-4 w-4 text-red-500" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="h-12 w-full rounded-xl border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm text-stone-700 hover:bg-stone-50 gap-3"
              data-testid="button-github-signup">
              <SiGithub className="h-4 w-4" />
              Sign up with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#fdfbef] px-3 [font-family:'Public_Sans',Helvetica] text-xs text-stone-400">or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-600">Full name</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  id="name"
                  placeholder="Elena Marcas"
                  className="h-12 pl-10 rounded-xl border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm focus-visible:ring-[#4c7a5a]"
                  data-testid="input-name"
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500">Name is required</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-600">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 pl-10 rounded-xl border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm focus-visible:ring-[#4c7a5a]"
                  data-testid="input-email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">Email is required</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-600">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  className="h-12 pl-10 rounded-xl border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm focus-visible:ring-[#4c7a5a]"
                  data-testid="input-password"
                  {...register("password", { required: true, minLength: 8 })}
                />
              </div>
              {errors.password && <p className="text-xs text-red-500">Password must be at least 8 characters</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#1a281e] [font-family:'Cairo',Helvetica] text-base font-normal text-white hover:bg-[#2e4535] transition-colors mt-2 gap-2"
              data-testid="button-submit-signup"
            >
              {loading ? "Creating account…" : <>Create Account <ArrowRight className="h-4 w-4" /></>}
            </Button>

            <p className="text-center [font-family:'Public_Sans',Helvetica] text-xs text-stone-400">
              By signing up you agree to our{" "}
              <span className="text-[#4c7a5a] hover:underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="text-[#4c7a5a] hover:underline cursor-pointer">Privacy Policy</span>.
            </p>
          </form>

          <p className="text-center [font-family:'Public_Sans',Helvetica] text-sm text-stone-500 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className="text-[#4c7a5a] hover:underline cursor-pointer font-medium">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
