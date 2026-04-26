import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const navigationItems = [
  { label: "Explore", active: false },
  { label: "Campaigns", active: false },
  { label: "Map", active: true },
];

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PrimaryNavigationHeaderSection = ({
  searchQuery,
  onSearchChange,
}: Props): JSX.Element => {
  return (
    <header className="w-full border-b border-stone-200 bg-[#fdfbef] shadow-[0px_1px_2px_#0000000d] sticky top-0 z-30">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
          <a
            href="#"
            className="flex h-8 items-center [font-family:'Cairo',Helvetica] text-2xl font-normal leading-8 tracking-[-0.40px] text-[#1a281e] whitespace-nowrap"
            data-testid="link-logo"
          >
            Econova
          </a>
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Button
                    type="button"
                    variant="ghost"
                    className={`h-auto rounded-none px-0 py-0 [font-family:'Cairo',Helvetica] text-base font-normal leading-6 tracking-[-0.40px] hover:bg-transparent ${
                      item.active
                        ? "border-b-2 border-[#4c7a5a] pb-1 text-[#4c7a5a] hover:text-[#4c7a5a]"
                        : "text-stone-600 hover:text-stone-700"
                    }`}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden sm:block relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search campaigns..."
              aria-label="Search campaigns"
              className="h-10 w-56 rounded-full border-0 bg-stone-100 pl-9 pr-9 [font-family:'Cairo',Helvetica] text-sm font-normal tracking-[-0.40px] text-stone-700 placeholder:text-stone-400 focus-visible:ring-1 focus-visible:ring-[#4c7a5a] focus-visible:ring-offset-0 lg:w-64 transition-all"
              data-testid="input-search"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                aria-label="Clear search"
                data-testid="button-clear-search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <Avatar className="h-10 w-10 bg-stone-200 cursor-pointer hover:ring-2 hover:ring-[#4c7a5a] hover:ring-offset-2 transition-all">
              <AvatarImage
                src="/figmaAssets/user-profile.png"
                alt="User profile"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button
              className="h-auto rounded-full bg-[#1a281e] px-6 py-2 [font-family:'Cairo',Helvetica] text-base font-normal leading-6 tracking-[-0.40px] text-white hover:bg-[#2e4535] transition-colors"
              data-testid="button-create"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
