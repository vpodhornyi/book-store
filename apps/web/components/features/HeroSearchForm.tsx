"use client"
import { useState } from "react";

import { SearchInput } from "../shared/SearchInput";
import { BinocularIcon } from "../ui/icons";
import { Button } from "../shared/button";

export const HeroSearchForm = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("Submit Search:", query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-8 w-full">
      <SearchInput value={query} onChange={setQuery}/>
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 w-full">
        <Button
          className="flex items-center gap-5 border-2 w-full justify-center rounded-[10px] border-gray-800 text-gray-800 py-4 bg-yellow-500 hover:bg-orange-500 md:w-[153px] md:px-2 md:shrink-0"><span
          className="font-syne text-[16px]">Explore</span><BinocularIcon/></Button>
        <div className="
          w-full h-0 
           md:h-[2px]
          border-t-2 border-dashed border-gray-800 dark:border-gray-100
          self-center
        "/>
      </div>
    </form>
  );
};