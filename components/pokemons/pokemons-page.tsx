import { PokemonsCard } from "~/components/pokemons/shared/pokemons-card";
import { PaginationButton } from "~/components/pokemons/shared/pagination/pagination-button";
import {
  listPokemons,
  type ListPokemonsParams,
} from "~/components/pokemons/pokemons-utils";

type Props = ListPokemonsParams;

export async function Pokemons({ offset, limit, query, sort }: Props) {
  const pokemons = await listPokemons({
    offset,
    limit,
    query,
    sort,
  });

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
              key={pokemon.id}
              data={{
                ...pokemon,
                thumbnailUrl: pokemon.thumbnailUrl || "",
              }}
            />
          );
        })}
      </div>

      {/* Hide pagination on searching */}
      {!query && (
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
      )}
    </section>
  );
}
