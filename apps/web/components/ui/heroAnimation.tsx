import Image from 'next/image';
import gif from '../../public/static/book.gif'


export  const HeroAnimation = () => {
  return (
 
     <Image
    src={gif} 
    alt="Loading..."
    width="60"
    height="60"
    unoptimized 
    className="md:w-35.25 md:h-35.25"
  />
   
  );
};