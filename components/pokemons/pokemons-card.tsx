import Image from "next/image";
import Link from "next/link";

import Button from "~/components/base/button";
import type { PokemonData } from "~/components/pokemons/pokemons-utils";

type PokemonsCardProps = PokemonData;

export function PokemonsCard({ name, types, imgUrl }: PokemonsCardProps) {
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
            src={imgUrl || ""}
          />

          <PokemonsTitle name={name} />
          <PokemonsTypes types={types} />
        </div>
      </Link>
    </div>
  );
}

export function PokemonsTitle({ name }: Pick<PokemonData, "name">) {
  return <h3>{name}</h3>;
}

export function PokemonsTypes({ types }: Pick<PokemonData, "types">) {
  return (
    <div className="mt-4 flex flex-row gap-3">
      {types.map((data) => {
        return (
          <Button key={data.slot} className="text-xs">
            {data.type.name}
          </Button>
        );
      })}
    </div>
  );
}
