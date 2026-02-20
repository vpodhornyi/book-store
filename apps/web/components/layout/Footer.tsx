import { FigmaIcon, GitHubIcon, LinkedinIcon } from "../ui/icons";
import {IconContainer} from "../ui/iconContainer"

export default function Footer() {
  return (
    <footer className="w-full backdrop-blur border-t-2 border-dashed border-gray-200 dark:border-gray-700 md:pr-17.5 md:pb-27.5 md:pl-17.5 md:pt-11 pr-3.75 pb-25 pl-3.75 pt-15">
      <div className=" mx-auto flex flex-col md:flex-row items-center md:justify-between text-[20px] gap-11.5 ">
        <div className="font-syne">BookStore Project</div>
        
        <div className="flex gap-6 items-center">
          <IconContainer>
            <LinkedinIcon className="md:h-6 md:w-6" />
          </IconContainer>
          
          <IconContainer>
            <GitHubIcon className="md:h-6 md:w-6" />
          </IconContainer>
          
          <IconContainer>
            <FigmaIcon className="md:h-6 md:w-6" />
          </IconContainer>
        </div>

        <div className="font-syne text-center md:text-right">
          by eduarda mirelly
        </div>
      </div>
    </footer>
  );
}