"use client";
import { useCallback, useState, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import Button from "~/components/base/button";
import { Loading } from "~/components/base/loading";
import * as Dialog from "~/components/base/dialog";
import type {
  PokemonDataGet,
  PokemonDataList,
} from "~/components/pokemons/shared/types";
import { listPokemons as listPokemonsCall } from "~/components/pokemons/pokemons-utils";
import { PokemonsCardSelectable } from "~/components/pokemons/shared/pokemons-card-selectable";
import { PaginationButton } from "~/components/pokemons/shared/pagination/pagination-button";

type Pokemons = any;

type Props = {
  data: Pick<PokemonDataGet, "height" | "weight" | "abilityName" | "types">;
};

export function PokemonComparisons({ data }: Props) {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [dialogVisible, setVisibleDialog] = useState(false);

  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [hasNext, setNext] = useState(false);
  const [hasPrev, setPrev] = useState(false);

  const [selectedItems, setSelectedItems] = useState<
    Map<string, PokemonDataList>
  >(new Map());

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    const responses = await listPokemonsCall({
      offset: pagination.offset,
      limit: pagination.limit,
    });

    setPokemons(responses.results);
    setNext(!!responses.next);
    setPrev(!!responses.previous);
    setLoading(false);
  }, [pagination]);

  const handleClick = () => {
    setVisibleDialog(true);
  };

  const handleSelect = (data: PokemonDataList) => {
    const updatedItems = new Map(selectedItems);

    if (updatedItems.has(data.name)) {
      updatedItems.delete(data.name);
    } else {
      updatedItems.set(data.name, data);
    }

    setSelectedItems(updatedItems);
  };

  console.log("selectedItems", [...selectedItems.values()]);

  const handleNextPagination = () => {
    setPagination((state) => ({
      ...state,
      offset: state.offset + state.limit,
    }));
  };

  const handlePrevPagination = () => {
    if (pagination.offset < pagination.limit) return;

    setPagination((state) => ({
      ...state,
      offset: state.offset - state.limit,
    }));
  };

  useEffect(() => {
    if (dialogVisible) {
      fetchPokemons();
    }
  }, [dialogVisible, fetchPokemons]);

  return (
    <Dialog.Root open={dialogVisible} onOpenChange={setVisibleDialog}>
      <Button variant="secondary" className="mt-5 w-full" onClick={handleClick}>
        Compares
      </Button>

      <Dialog.Portal>
        <Dialog.Content className="min-h-[600px] overflow-y-auto">
          <Dialog.Title>Select Items</Dialog.Title>

          {isLoading && <Loading />}
          {!isLoading && (
            <ScrollArea type="always" style={{ height: 180 }}>
              <div className="grid grid-cols-1 pb-20 pt-10 sm:grid-cols-3 md:grid-cols-5">
                {pokemons.map((pokemon) => {
                  return (
                    <PokemonsCardSelectable
                      key={pokemon.id}
                      data={{
                        ...pokemon,
                        thumbnailUrl: pokemon.thumbnailUrl || "",
                      }}
                      onSelect={handleSelect}
                      isSelected={selectedItems.has(pokemon.name)}
                      maxSelected={selectedItems.size == 3} // Max selected items 3
                    />
                  );
                })}
              </div>

              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-center gap-5 py-10">
                  {hasNext && (
                    <PaginationButton
                      type="next"
                      offset={pagination.offset}
                      limit={pagination.limit}
                      onClick={handleNextPagination}
                    />
                  )}

                  {hasPrev && (
                    <PaginationButton
                      type="prev"
                      offset={pagination.offset}
                      limit={pagination.limit}
                      onClick={handlePrevPagination}
                    />
                  )}
                </div>

                <div className="flex flex-row py-10">
                  <Button
                    variant="primary"
                    disabled={!selectedItems.size}
                    className="text-xs"
                  >
                    Proceed To Compares ({selectedItems.size})
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
