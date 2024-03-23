import { PokemonsCard } from "~/components/pokemons/pokemons-card";
import { PaginationButton } from "~/components/pokemons/pagination/pagination-button";
import { listPokemons } from "~/components/pokemons/pokemons-utils";

type Props = {
  offset: number;
  limit: number;
};

export async function Pokemons({ offset, limit }: Props) {
  const pokemons = await listPokemons(offset, limit);

  const hasNextPage = !!pokemons.next;
  const hasPrevPage = !!pokemons.previous;
  const nextPageState = pokemons.next;
  const previousPageState = pokemons.previous;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {pokemons.results.map((pokemon) => {
          return (
            <PokemonsCard
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              imgUrl={pokemon.imgUrl || ""}
              types={pokemon.types}
            />
          );
        })}
      </div>

      <div className="flex flex-row items-center justify-center gap-5 py-10">
        {hasNextPage && (
          <PaginationButton
            type="next"
            offset={nextPageState?.offset || 0}
            limit={nextPageState?.limit || 20}
          />
        )}

        {hasPrevPage && (
          <PaginationButton
            type="prev"
            offset={previousPageState?.offset || 0}
            limit={previousPageState?.limit || 20}
          />
        )}
      </div>
    </section>
  );
}
