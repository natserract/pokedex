import Image from "next/image";

type PokemonsCardProps = {
  name: string;
  imgUrl: string;
};

export function PokemonsCard({ name, imgUrl }: PokemonsCardProps) {
  return (
    <div className="relative h-full w-full pt-12">
      <div className="relative block h-full w-full rounded-lg bg-gray-100 px-8 pb-10 pt-36 md:px-16 md:pb-20 dark:bg-gray-800">
        <h3>{name}</h3>
      </div>

      <div className="absolute left-16 top-0">
        <Image
          className="h-32 w-auto object-contain"
          width={100}
          height={100}
          src={imgUrl}
          alt={name}
        />
      </div>
    </div>
  );
}
