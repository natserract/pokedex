import Image from "next/image";
import Link from "next/link";

import { PokemonsTypes } from "~/components/pokemons/shared/pokemons-types";
import type { PokemonDataList } from "~/components/pokemons/shared/types";

type PokemonsCardProps = {
  data: PokemonDataList;
};

export function PokemonsCard({ data }: PokemonsCardProps) {
  const { name, types, thumbnailUrl } = data;
  const pokemonLink = `/pokemons/${name.toLowerCase()}`;

  return (
    <div className="relative h-full w-full hover:bg-[#232323]">
      <Link href={pokemonLink}>
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
      </Link>
    </div>
  );
}

export function PokemonsTitle({ name }: Pick<PokemonDataList, "name">) {
  return <h3>{name}</h3>;
}
