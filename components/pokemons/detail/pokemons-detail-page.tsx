import Image from "next/image";

import {
  GetPokemonParams,
  getPokemon,
} from "~/components/pokemons/pokemons-utils";
import type { PokemonDataGet } from "~/components/pokemons/types";
import { PokemonsTypes } from "~/components/pokemons/pokemons-types";
import { PokemonsAbility } from "~/components/pokemons/detail/pokemons-ability";

import { toCamelCase } from "~/utils/string";

type PokemonsDetailProps = GetPokemonParams;

export async function PokemonsDetail({ name }: PokemonsDetailProps) {
  const data = await getPokemon({ name });

  return <PokemonsDetailSection data={data} />;
}

type PokemonsDetailSectionProps = {
  data: PokemonDataGet;
};

function PokemonsDetailSection({ data }: PokemonsDetailSectionProps) {
  const { id, name, coverUrl, types, description } = data;

  return (
    <section className="pokemons-detail">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <aside className="">
          <Image width={361} height={361} alt={name} src={coverUrl || ""} />
        </aside>
        <aside className="">
          <h1 className="text-3xl font-bold">{toCamelCase(name)}</h1>

          <div className="mt-4 inline-flex items-center gap-5">
            <span className="text-foreground/20 block">Types: </span>
            <PokemonsTypes types={types} />
          </div>

          <p className="my-5">{description}</p>
          <PokemonsAbility data={data} />
        </aside>
      </div>
    </section>
  );
}
