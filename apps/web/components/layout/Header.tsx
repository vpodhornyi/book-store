"use client";

import Link from "next/link";
import { ThemeToggle } from "../shared/ThemeToggle";
import { BookMark, KorbIcon, Logo } from "../ui/icons";
import UserLink from '@/components/features/UserLink';


export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full  backdrop-blur transition-colors duration-300  ">
      <div
        className="flex items-center justify-between pt-6 pb-15 px-2 md:pt-15 md:pb-17.5 md:px-18.75"
      >
        <Link href="/">
          <Logo className="scale-90 md:scale-100 origin-left transition-transform"/>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          <ThemeToggle/>

          <Link
            href="/favorites"
            className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-lg hover:text-blue-500  "
          >
            <BookMark className="h-4.5 w-4.5 md:h-6 md:w-6"/>
          </Link>

          <button className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-lg hover:text-blue-500  ">
            <KorbIcon className="h-4.5 w-4.5 md:h-6 md:w-6"/>
          </button>
          <UserLink/>
        </div>
      </div>
    </header>
  );
}
