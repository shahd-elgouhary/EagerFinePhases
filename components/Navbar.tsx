"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, X, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Map", href: "/map" },
];

export function Navbar() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b border-stone-200 bg-[#fdfbef] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sticky top-0 z-40">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-5 sm:px-8">
        {/* Logo + nav */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="font-cairo text-2xl font-normal tracking-[-0.4px] text-[#1a281e] whitespace-nowrap" data-testid="link-logo">
            Econova
          </Link>
          <nav className="hidden md:block" aria-label="Primary navigation">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "font-public-sans text-base transition-colors",
                        active
                          ? "border-b-2 border-[#4c7a5a] pb-1 text-[#4c7a5a]"
                          : "text-stone-600 hover:text-stone-900"
                      )}
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 lg:gap-5">
          {pathname !== "/map" && (
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="h-10 w-52 rounded-full border-0 bg-stone-100 pl-9 pr-9 font-public-sans text-sm text-stone-700 placeholder:text-stone-400 focus-visible:ring-1 focus-visible:ring-[#4c7a5a] focus-visible:ring-offset-0 lg:w-64"
                data-testid="input-search"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          <Link href="/profile">
            <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-[#4c7a5a] hover:ring-offset-2 transition-all" data-testid="link-profile">
              <AvatarImage src="/figmaAssets/user-profile.png" alt="Profile" />
              <AvatarFallback className="bg-stone-200 text-stone-600 text-sm">U</AvatarFallback>
            </Avatar>
          </Link>

          <Link href="/sign-up" className="hidden sm:block">
            <Button className="h-auto rounded-full bg-[#1a281e] px-6 py-2.5 font-cairo text-base font-normal tracking-[-0.4px] text-white hover:bg-[#2e4535] transition-colors">
              Create
            </Button>
          </Link>

          <button
            className="md:hidden rounded-lg p-2 hover:bg-stone-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-[#fdfbef] px-5 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-cairo block py-3 text-base border-b border-stone-50 last:border-0",
                pathname === item.href ? "text-[#4c7a5a]" : "text-stone-700"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="font-cairo block py-3 text-base text-stone-700">
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
