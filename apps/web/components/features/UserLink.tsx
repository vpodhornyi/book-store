"use client";

import Link from 'next/link';
import { User, Loader } from "@/components/ui/icons";
import { useAuth } from "@/providers/auth-provider";

export default function UserLink() {
  const { user, isLoading } = useAuth();

  return (
    <>
      {
        isLoading ? <Loader/> :
          user ?
            <Link
              href="/profile"
              className="
             p-0.5 pl-2 pr-2
             border-2
             text-blue-500
             rounded-xl cursor-pointer flex items-center justify-center hover:blue-500">
              <User className="h-4.5 w-4.5 md:h-6 md:w-6 "/>
            </Link>
            :
            <Link
              href="/login"
              className="
              flex
              h-6 w-6 md:h-8 md:w-8
               items-center justify-center rounded-lg hover:text-blue-500  "
            >
              <User className="h-4.5 w-4.5 md:h-6 md:w-6"/>
            </Link>
      }
    </>
  );
}