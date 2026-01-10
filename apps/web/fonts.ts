import { Syne, Unica_One } from 'next/font/google';

export const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne', 
});

export const unicaOne = Unica_One({
  weight: '400', 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unica',
});