import { FigmaIcon, GitHubIcon, LinkedinIcon } from "../ui/icons";

export default function Footer() {
  const circleStyle = "flex items-center justify-center rounded-full border-2 border-gray-800 dark:border-gray-100 h-10 w-10 md:h-12 md:w-12 shrink-0 bg-white dark:bg-gray-950 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]";

  return (
    <footer className="w-full backdrop-blur dark:bg-gray-950/80 border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-11 pb-11">
      <div className="container flex items-center md:justify-between text-[20px] flex-col md:flex-row gap-11.5">
        <div className="font-syne">BookStore Project</div>
        
        <div className="flex gap-6 items-center">
          <div className={circleStyle}><LinkedinIcon className="md:h-6 md:w-6"/></div>
          <div className={circleStyle}><GitHubIcon className="md:h-6 md:w-6"/></div>
          <div className={circleStyle}><FigmaIcon className="md:h-6 md:w-6"/></div>
        </div>

        <div className="font-syne">by eduarda mirelly</div>
      </div>
    </footer>
  );
}