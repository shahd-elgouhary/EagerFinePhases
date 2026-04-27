import { useLocation, Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Map", href: "/map" },
];

interface Props {
  children: React.ReactNode;
}

export const AppShell = ({ children }: Props): JSX.Element => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbef]">
      <header className="w-full border-b border-stone-200 bg-[#fdfbef] shadow-[0px_1px_2px_#0000000d] sticky top-0 z-30">
        <div className="mx-auto flex h-20 w-full items-center justify-between px-5 sm:px-8">
          {/* Logo + nav */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/">
              <span
                className="flex h-8 items-center [font-family:'Cairo',Helvetica] text-2xl font-normal leading-8 tracking-[-0.40px] text-[#1a281e] whitespace-nowrap cursor-pointer"
                data-testid="link-logo"
              >
                Econova
              </span>
            </Link>
            <nav aria-label="Primary navigation" className="hidden md:block">
              <ul className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <li key={item.label}>
                      <Link href={item.href}>
                        <span
                          className={`[font-family:'Cairo',Helvetica] text-base font-normal leading-6 tracking-[-0.40px] cursor-pointer transition-colors ${
                            isActive
                              ? "border-b-2 border-[#4c7a5a] pb-1 text-[#4c7a5a]"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                          data-testid={`nav-${item.label.toLowerCase()}`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Search — hidden on map page since map has its own search */}
            {location !== "/map" && (
              <div className="hidden sm:block relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns..."
                  aria-label="Search campaigns"
                  className="h-10 w-52 rounded-full border-0 bg-stone-100 pl-9 pr-9 [font-family:'Cairo',Helvetica] text-sm tracking-[-0.40px] text-stone-700 placeholder:text-stone-400 focus-visible:ring-1 focus-visible:ring-[#4c7a5a] focus-visible:ring-offset-0 lg:w-64 transition-all"
                  data-testid="input-search"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Avatar
                  className="h-10 w-10 bg-stone-200 cursor-pointer hover:ring-2 hover:ring-[#4c7a5a] hover:ring-offset-2 transition-all"
                  data-testid="link-profile"
                >
                  <AvatarImage src="/figmaAssets/user-profile.png" alt="User profile" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Link>
              <Link href="/sign-up">
                <Button
                  className="hidden sm:flex h-auto rounded-full bg-[#1a281e] px-6 py-2 [font-family:'Cairo',Helvetica] text-base font-normal leading-6 tracking-[-0.40px] text-white hover:bg-[#2e4535] transition-colors"
                  data-testid="button-create"
                >
                  Create
                </Button>
              </Link>
              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-stone-100"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5 text-stone-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-100 bg-[#fdfbef] px-5 py-4 flex flex-col gap-3">
            {navItems.map(item => (
              <Link key={item.label} href={item.href}>
                <span
                  className={`block [font-family:'Cairo',Helvetica] text-base py-2 cursor-pointer ${
                    location === item.href ? "text-[#4c7a5a]" : "text-stone-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};
