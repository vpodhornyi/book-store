"use client";

import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  className: string;
}

export function Button({ className, children }: ButtonProps) {
  return (
    <button type="submit" className={className}>
      {children}
    </button>
  );
}
