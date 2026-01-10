import Image from 'next/image';
import gif from '../../public/static/error.gif'

interface ErrorAnimationProps {
  className?: string;
}

export  const ErrorAnimation = ({ className }: ErrorAnimationProps) => {
  return (
    <div className={`flex items-center gap-2 group ${className} hover:text-blue-500`}>
     <Image
    src={gif} // Шлях до файлу в папці public
    alt="Loading..."
    width="329"
    height="329"
    unoptimized // Обов'язково для збереження анімації
    className={className}
  />
    </div>
  );
};