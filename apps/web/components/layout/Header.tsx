"use client";

import Link from "next/link";
import { ThemeToggle } from "../shared/ThemeToggle";
import { BookMark, KorbIcon, Logo } from "../ui/icons";
import UserLink from '@/components/features/UserLink';


export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full  backdrop-blur transition-colors duration-300  ">
      <div
        className="container flex items-center justify-between 
        md:pt-[60px] md:pb-[70px] md:px-[5px] pb-[60px]"
      >
        <Link href="/">
          <Logo className="scale-90 md:scale-100 origin-left transition-transform"/>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          <UserLink/>

          <ThemeToggle/>

          <Link
            href="/favorites"
            className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-lg hover:text-blue-500  "
          >
            <BookMark className="h-[18px] w-[18px] md:h-6 md:w-6"/>
          </Link>

          <button className="flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-lg hover:text-blue-500  ">
            <KorbIcon className="h-[18px] w-[18px] md:h-6 md:w-6"/>
          </button>
        </div>
      </div>
    </header>
  );
}
