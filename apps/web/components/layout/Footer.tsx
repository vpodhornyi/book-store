import { FigmaIcon, GitHubIcon, LinkedinIcon } from "../ui/icons";
import {IconContainer} from "../ui/iconContainer"

export default function Footer() {
  return (
    <footer className="w-full backdrop-blur border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-11 pb-11">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between text-[20px] gap-11.5">
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