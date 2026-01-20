import Image from "next/image";
import { HeroAnimation } from "../ui/heroAnimation";
import { HeroSearchForm } from "../features/HeroSearchForm";
import Library from "../../public/Library.jpg";

const Hero = () => {
  return (
    <section className="b-2 border-gray-600 border-dashed">
      <div
        className="flex flex-col min-[1200px]:flex-row items-start min-[1200px]:items-center min-[1200px]:gap-[clamp(50px,10vw,250px)] relative">
        <div className="flex flex-col items-center md:items-start relative">
          <div className="">
            <h1 className="font-syne text-[36px] md:text-[64px] text-gray-800 dark:text-gray-100 md:w-125 w-67.75 ">
              What book you looking for?
              <span className="inline-block ml-4 align-middle">
                <HeroAnimation/>
              </span>
            </h1>
          </div>
          <p
            className="font-syne text-[14px] md:text-[16px] text-gray-800 dark:text-gray-100 leading-relaxed md:absolute md:top-51">
            Explore our catalog and find your next read.
          </p>
          <div className="mt-9 flex justify-center md:justify-start md:w-125 w-73.25 mb-9">
            <HeroSearchForm/>
          </div>
        </div>

        <div className="hidden min-[1200px]:block shrink-0 relative mt-10">
          <div
            className="
    absolute 
    -top-4 -left-4 
    w-full h-full 
    bg-blue-500 
    border-none
    rounded-tr-[20px] 
    rounded-bl-[20px] 
    -z-10
  "
          />

          <div
            className="relative border-2 border-gray-800 rounded-tr-[20px] rounded-bl-[20px] overflow-hidden bg-white">
            <Image
              src={Library}
              alt="Girl in Library Illustration"
              width={484}
              height={503}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
