"use client";

import { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
import { CaretDownIcon, User } from "@/components/ui/icons";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

/*
const categories = [
  { label: "Categorie", value: "1" },
  { label: "Categorie", value: "2" },
  { label: "Categorie", value: "3" },
];
const [value, setValue] = useState<string | undefined>();
<SelectDownDrop
  options={categories}
  value={value}
  onChange={setValue}
/>
*/

export default function SelectDownDrop({
                                 options,
                                 value,
                                 placeholder = "Categories",
                                 onChange,
                               }: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-34">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          relative w-full flex items-center justify-between
          rounded-xl border-2 px-4 py-1
          font-medium
          transition
          z-11
          ${
          open
            ? "bg-yellow-400 border-black"
            : "bg-white border-black"
        }
          shadow-[4px_4px_0px_0px_#ff7a45]
        `}
      >
        <span className={selected ? "text-black" : "text-gray-500"}>
          <User className="h-4.5 w-4.5 md:h-6 md:w-6"/>
        </span>
        <CaretDownIcon className="h-3 w-3 md:h-4 md:w-4"/>

      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute top-4 z-10 mt-2 w-full
            rounded-b-xl
            pt-7
            border-r-2 border-l-2 border-b-2   border-black
            bg-white overflow-hidden
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 border-t-2
                transition
                ${
                opt.value === value
                  ? "bg-sky-400 text-black"
                  : "hover:bg-gray-100"
              }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
