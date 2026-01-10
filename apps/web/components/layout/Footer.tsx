import { FigmaIcon, GitHubIcon, LinkedinIcon } from "../ui/icons";

export default function Footer() {
  return (
    <footer className="sticky top-0 z-50 w-full  backdrop-blur dark:bg-gray-950/80 border-t-2 border-dashed pt-11">
      <div className="container flex  items-center justify-between text-[20px]">
        <div className="font-syne ">BookStore Project</div>
        <div className="flex gap-4.5 items-center justify-center h-11.25 w-11.25"><div className="rounded-full border-2  dark:border-gray-100 p-2 h-11.25 w-11.25"><LinkedinIcon/></div><div className="rounded-full border-2  dark:border-gray-100 p-2 h-11.25 w-11.25"><GitHubIcon/></div><div className="rounded-full border-2  dark:border-gray-100 p-2"><FigmaIcon/></div></div>
        <div className="font-syne ">by eduarda mirelly</div>
      </div>
    </footer>
  );
}
