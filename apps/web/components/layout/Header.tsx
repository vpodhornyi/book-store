import { ThemeToggle } from "../shared/ThemeToggle";
import { BookMark, KorbIcon, Logo } from "../ui/icons";

import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full   backdrop-blur dark:bg-gray-950/80">
      <div className="container mx-auto flex items-center justify-between pt-15 pr-1.25 pb-17.5 pl  -1.25">
        <Link href={'/'}><Logo /></Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href={"/favorites"} className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <BookMark />
          </Link>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <KorbIcon />
          </button>
          
        </div>
      </div>
    </header>
  );
}
