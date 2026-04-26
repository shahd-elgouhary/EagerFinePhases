import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigationItems = [
  { label: "Explore", active: false },
  { label: "Campaigns", active: false },
  { label: "Map", active: true },
];

export const PrimaryNavigationHeaderSection = (): JSX.Element => {
  return (
    <header className="w-full border-b border-stone-200 bg-[#fdfbef] shadow-[0px_1px_2px_#0000000d]">
      <div className="mx-auto flex h-20 w-full max-w-screen-xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
          <a
            href="#"
            className="flex h-8 items-center [font-family:'Cairo',Helvetica] text-2xl font-normal leading-8 tracking-[-0.40px] text-[#1a281e] whitespace-nowrap"
          >
            Econova
          </a>
          <nav aria-label="Primary navigation">
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
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden sm:block">
            <Input
              type="search"
              defaultValue=""
              placeholder="Search areas..."
              aria-label="Search areas"
              className="h-10 w-56 rounded-full border-0 bg-stone-100 px-6 [font-family:'Cairo',Helvetica] text-sm font-normal tracking-[-0.40px] text-gray-500 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 lg:w-64"
            />
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <Avatar className="h-10 w-10 bg-stone-200">
              <AvatarImage
                src="/figmaAssets/user-profile.png"
                alt="User profile"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button className="h-auto rounded-full bg-[#1a281e] px-6 py-2 [font-family:'Cairo',Helvetica] text-base font-normal leading-6 tracking-[-0.40px] text-white hover:bg-[#1a281e]/95">
              Create
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
