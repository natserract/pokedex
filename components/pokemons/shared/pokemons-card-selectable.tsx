import Image from "next/image";

import { PokemonsTypes } from "~/components/pokemons/shared/pokemons-types";
import { PokemonsTitle } from "~/components/pokemons/shared/pokemons-card";
import type { PokemonDataList } from "~/components/pokemons/shared/types";

import { cn } from "~/utils/cn";

type PokemonsCardProps = {
  data: PokemonDataList;
  onSelect: (data: PokemonDataList) => void;
  isSelected: boolean;
  maxSelected?: boolean;
};

export function PokemonsCardSelectable({
  data,
  onSelect,
  isSelected,
  maxSelected,
}: PokemonsCardProps) {
  const { name, types, thumbnailUrl } = data;

  const classes = cn(
    "relative h-full w-full cursor-pointer hover:bg-[#232323]",
    {
      "bg-[#232323]": isSelected,
      "cursor-not-allowed": maxSelected && !isSelected,
    },
  );

  const handleClick = () => {
    if (maxSelected && !isSelected) {
      return;
    }

    onSelect(data);
  };

  return (
    <div className={classes} onClick={handleClick}>
      <div className="border-slate-muted card relative flex h-full w-full flex-col items-center border py-10">
        <Image
          width={150}
          height={150}
          className="h-20 w-20"
          alt={name}
          src={thumbnailUrl || ""}
        />

        <PokemonsTitle name={name} />
        <PokemonsTypes classNames="mt-4" types={types} />
      </div>
    </div>
  );
}
