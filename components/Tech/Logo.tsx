import { Logos } from "@/components/Logos/Logos";

interface LogoProps {
  name: string;
}

export const Logo = ({ name }: LogoProps) => {
  const found = Logos.find((l) => l.name === name);

  if (!found) return null;

  return (
    <div
      className="logo size:16 2xl:size-18 p-1 md3:p-2 rounded hover:bg-[#5654496a] bg-[#5654496a] transition-colors duration-200 ease-in-out cursor-pointer flex justify-center items-center flex-shrink-0 "
    >

      <div className="size-12 md:size-[42px] md2:size-11 md3:size-12 xl:size-[42px] xl2:size-12 2xl:size-12 ">
        {typeof found.url === "string" ?
          <img src={found.url} alt={name} className="h-full w-full" />
          :
          found.url
        }
      </div>

    </div>
  );
};