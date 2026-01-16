"use client";

import Link from 'next/link';
import { User, Loader, CaretDownIcon } from "@/components/ui/icons";
import { useAuth } from "@/providers/auth-provider";

export default function UserLink() {
  const { user, isLoading } = useAuth();

  return (
    <>
      {
        isLoading ? <Loader/> :
          user ?
            <div className="
             shadow-[5px_5px_0px_0px_#F9784B]
             hover:shadow-[3px_3px_0px_0px_#F9784B]
             hover:translate-x-0.5
             hover:translate-y-0.5
             p-0.5 pl-3 pr-3
             border-2
             hover:text-blue-500
             rounded-xl cursor-pointer flex items-center justify-center hover:blue-500">
              <User className="mr-10 h-4.5 w-4.5 md:h-6 md:w-6 "/>
              <CaretDownIcon className="h-3 w-3 md:h-4 md:w-4"/>
            </div>
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