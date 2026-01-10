import { FigmaIcon, GitHubIcon, LinkedinIcon } from "../ui/icons";

export default function Footer() {
  // 1. Додаємо flex, items-center та justify-center, щоб іконка була в центрі
  // 2. Додаємо bg-white або dark:bg-gray-950, щоб тінь не просвічувалася крізь іконку
  // 3. Додаємо shrink-0, щоб Flexbox не міг стиснути коло в овал
  const circleStyle = "flex items-center justify-center rounded-full border-2 border-gray-800 dark:border-gray-100 h-12 w-12 shrink-0 bg-white dark:bg-gray-950 shadow-[4px_4px_0px_0px_rgba(59,130,246,1)]";

  return (
    <footer className="w-full backdrop-blur dark:bg-gray-950/80 border-t-2 border-dashed border-gray-200 dark:border-gray-700 pt-11 pb-11">
      <div className="container mx-auto flex items-center justify-between text-[20px]">
        <div className="font-syne">BookStore Project</div>
        
        {/* Прибираємо h-11.25 та w-11.25 звідси, бо цей div має вмістити всі три іконки */}
        <div className="flex gap-6 items-center">
          <div className={circleStyle}><LinkedinIcon /></div>
          <div className={circleStyle}><GitHubIcon /></div>
          <div className={circleStyle}><FigmaIcon /></div>
        </div>

        <div className="font-syne">by eduarda mirelly</div>
      </div>
    </footer>
  );
}