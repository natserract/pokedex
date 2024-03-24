"use client";
import React, {
  useCallback,
  useState,
  useMemo,
  useTransition,
  useEffect,
} from "react";
import Image from "next/image";

import Button from "~/components/base/button";
import { Loading } from "~/components/base/loading";
import * as Dialog from "~/components/base/dialog";
import type {
  PokemonDataGet,
  PokemonDataList,
} from "~/components/pokemons/shared/types";
import { PokemonsTypes } from "~/components/pokemons/shared/pokemons-types";
import { listPokemons as listPokemonsCall } from "~/components/pokemons/pokemons-utils";
import { PokemonsTitle } from "~/components/pokemons/shared/pokemons-card/pokemons-card";
import { PaginationButton } from "~/components/pokemons/shared/pagination/pagination-button";
import { PokemonsCardSelectable } from "~/components/pokemons/shared/pokemons-card/pokemons-card-selectable";

import useSelectedItems from "~/hooks/useSelectedItems";

// @todo: fix list pokemons mapper types
type Pokemons = any;

type Pagination = {
  offset: number;
  limit: number;
};

enum Events {
  SELECT_ITEMS = "select_items",
  PROCEED = "PROCEED",
}

type Props = {
  data: PokemonDataGet;
};

export function PokemonComparisons({ data }: Props) {
  const [pokemons, setPokemons] = useState<Pokemons>({});

  const [event, setEvent] = useState<Events | undefined>();
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 20,
  });

  const [isPending, startTransition] = useTransition();

  const {
    selectedItems,
    selectedItemsLen,
    isSelected,
    updateSelectedItem,
    clear,
  } = useSelectedItems<PokemonDataList>();

  const hasNext = useMemo(() => !!pokemons.next, [pokemons.next]);
  const hasPrev = useMemo(() => !!pokemons.previous, [pokemons.previous]);

  const fetchPokemons = useCallback(
    async (offset: number, limit: number) => {
      const responses = await listPokemonsCall({
        offset,
        limit,
      });

      // The behaviour's, the initial value of selected items is current pokemon `data`
      // So, the current data within same name/id will excluded
      const filteredPokemons = responses.results.filter(
        (val) => val.name !== data.name,
      );
      setPokemons({
        ...responses,
        results: filteredPokemons,
      });
    },
    [data.name],
  );

  const handleToggleDialog = (open: boolean) => {
    if (open) {
      setEvent(Events.SELECT_ITEMS);
    } else {
      setEvent(undefined);
      clear();
    }
  };

  const handleNextPagination = () => {
    setPagination((state) => ({
      ...state,
      offset: state.offset + state.limit,
    }));
  };

  const handlePrevPagination = () => {
    setPagination((state) => ({
      ...state,
      offset: state.offset - state.limit,
    }));
  };

  const handleToSelectItems = () => {
    setEvent(Events.SELECT_ITEMS);

    // Initial fetch
    startTransition(async () => {
      await fetchPokemons(pagination.offset, pagination.limit);
    });
  };

  const handleToProceed = () => {
    setEvent(Events.PROCEED);
  };

  // Fetch if pagination state changed
  useEffect(() => {
    startTransition(async () => {
      await fetchPokemons(pagination.offset, pagination.limit);
    });
  }, [pagination, fetchPokemons]);

  return (
    <Dialog.Root open={!!event} onOpenChange={handleToggleDialog}>
      <Button
        variant="secondary"
        className="mt-5 w-full"
        onClick={handleToSelectItems}
      >
        Compares
      </Button>

      <Dialog.Portal>
        <Dialog.Content className="h-full overflow-y-auto">
          <Dialog.Title>
            {renderTitleByEvent(event)}
            <span className="text-foreground/30 block pt-2 text-sm font-normal">
              (Max: 3 items)
            </span>
          </Dialog.Title>

          {isPending && <Loading />}
          {!isPending && event === Events.SELECT_ITEMS && (
            <SelectItemsContent
              hasNext={hasNext}
              hasPrev={hasPrev}
              pokemons={pokemons}
              isSelected={isSelected}
              pagination={pagination}
              onProceed={handleToProceed}
              onNext={handleNextPagination}
              onPrev={handlePrevPagination}
              selectedItemsLen={selectedItemsLen}
              onUpdateSelectedItem={updateSelectedItem}
            />
          )}
          {!isPending && event === Events.PROCEED && (
            <ComparisonItemsContent initial={data} items={selectedItems} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const renderTitleByEvent = (event: Events | undefined) => {
  switch (event) {
    case Events.SELECT_ITEMS:
      return "Select Items";
    case Events.PROCEED:
      return "Comparison";
    default:
      return "";
  }
};

type SelectItemsContentProps = {
  pokemons: Pokemons;
  hasNext: boolean;
  hasPrev: boolean;
  pagination: Pagination;
  selectedItemsLen: number;
  isSelected: (value: string) => boolean;
  onUpdateSelectedItem: (data: PokemonDataList, key: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onProceed: () => void;
};

function SelectItemsContent({
  pokemons,
  hasNext,
  hasPrev,
  pagination,
  onNext,
  onPrev,
  selectedItemsLen,
  isSelected,
  onUpdateSelectedItem,
  onProceed,
}: SelectItemsContentProps) {
  const handleSelect = (data: PokemonDataList) => {
    onUpdateSelectedItem(data, data.name);
  };

  return (
    <div>
      <div className="grid grid-cols-1 pb-20 pt-10 sm:grid-cols-3 md:grid-cols-5">
        {pokemons.results.map((pokemon: any) => {
          return (
            <PokemonsCardSelectable
              key={pokemon.id}
              data={{
                ...pokemon,
                thumbnailUrl: pokemon.thumbnailUrl || "",
              }}
              onSelect={handleSelect}
              isSelected={isSelected(pokemon.name)}
              maxSelected={selectedItemsLen === 3} // Max selected items 3
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
              onClick={onNext}
            />
          )}

          {hasPrev && (
            <PaginationButton
              type="prev"
              offset={pagination.offset}
              limit={pagination.limit}
              onClick={onPrev}
            />
          )}
        </div>

        <div className="flex flex-row py-10">
          <Button
            variant="primary"
            disabled={!selectedItemsLen}
            className="text-xs"
            onClick={onProceed}
          >
            Proceed To Compares ({selectedItemsLen})
          </Button>
        </div>
      </div>
    </div>
  );
}

type ComparisonItemsContentProps = {
  items: PokemonDataList[];
  initial: PokemonDataList;
};

export function ComparisonItemsContent({
  items,
  initial,
}: ComparisonItemsContentProps) {
  return (
    <div className="flex h-screen w-full flex-row gap-10 overflow-x-auto py-10">
      {[initial, ...items].map((value) => {
        return (
          <div key={value.id} className="mr-5 min-w-[300px]">
            <Image
              width={150}
              height={150}
              className="mb-5 h-20 w-20"
              alt={value.name}
              src={value.thumbnailUrl || ""}
            />

            <div className="border-slate-muted mb-5 border-b pb-2">
              <span className="text-foreground/60 mb-1 block text-xs">
                Name:
              </span>
              <PokemonsTitle name={value.name} />
            </div>

            <div className="border-slate-muted mb-5 border-b pb-2">
              <span className="text-foreground/60 mb-1 block text-xs">
                Height:
              </span>
              <p className="font-bold">{value.height}</p>
            </div>

            <div className="border-slate-muted mb-5 border-b pb-2">
              <span className="text-foreground/60 mb-1 block text-xs">
                Weight:
              </span>
              <p className="font-bold">{value.weight}</p>
            </div>

            <div className="border-slate-muted mb-5 border-b  pb-2">
              <span className="text-foreground/60 mb-1 block text-xs">
                Abilities:
              </span>
              <p className="font-bold">{value.weight}</p>
            </div>

            <div className="border-slate-muted mb-5 border-b pb-2">
              <span className="text-foreground/60 mb-1 block text-xs">
                Types:
              </span>
              <PokemonsTypes types={value.types} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
