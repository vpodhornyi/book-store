"use client";

import React from "react";

import { Loader } from '@/components/ui/icons';

export interface ButtonProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  submitting?: boolean;
}

export function Button({ className, children, disabled, submitting = false }: ButtonProps) {
  return (
    <button type="submit" className={`${className} flex justify-center items-center`} disabled={disabled}>
      {submitting ? <Loader/> : children}
    </button>
  );
}
