import { ThemeToggle } from "../shared/ThemeToggle";
import { BookMark, KorbIcon, Logo } from "../ui/icons";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full  backdrop-blur transition-colors duration-300 dark:bg-gray-800 ">
      <div
        className="container mx-auto flex items-center justify-between 
        md:pt-[60px] md:pb-[70px] md:px-[5px]"
      >
        <Link href="/">
          <Logo className="scale-90 md:scale-100 origin-left transition-transform" />
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          <ThemeToggle />

          <Link
            href="/favorites"
            className="flex h-5 w-5 md:h-8 md:w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <BookMark className="h-[18px] w-[18px] md:h-6 md:w-6" />
          </Link>

          <button className="flex h-5 w-5 md:h-8 md:w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <KorbIcon className="h-[18px] w-[18px] md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
