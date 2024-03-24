"use client";
import React, { useCallback, useState, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import Button from "~/components/base/button";
import { Loading } from "~/components/base/loading";
import * as Dialog from "~/components/base/dialog";
import type {
  PokemonDataGet,
  PokemonDataList,
} from "~/components/pokemons/shared/types";
import { listPokemons as listPokemonsCall } from "~/components/pokemons/pokemons-utils";
import { PokemonsCardSelectable } from "~/components/pokemons/shared/pokemons-card/pokemons-card-selectable";
import { PaginationButton } from "~/components/pokemons/shared/pagination/pagination-button";
import useSelectedItems from "~/hooks/useSelectedItems";

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
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [event, setEvent] = useState<Events | undefined>();

  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: 20,
  });
  const [hasNext, setNext] = useState(false);
  const [hasPrev, setPrev] = useState(false);

  const { selectedItemsLen, isSelected, updateSelectedItem } =
    useSelectedItems<PokemonDataList>();

  const fetchPokemons = useCallback(async () => {
    setLoading(true);

    const responses = await listPokemonsCall({
      offset: pagination.offset,
      limit: pagination.limit,
    });

    // The behaviour's, the initial value of selected items is current pokemon `data`
    // So, the current data within same name/id will excluded
    const filteredPokemons = responses.results.filter(
      (val) => val.name !== data.name,
    );
    setPokemons(filteredPokemons);

    setNext(!!responses.next);
    setPrev(!!responses.previous);
    setLoading(false);
  }, [pagination, data.name]);

  const handleToggleDialog = (open: boolean) => {
    open ? setEvent(Events.SELECT_ITEMS) : setEvent(undefined);
  };

  const handleToSelectItems = () => {
    setEvent(Events.SELECT_ITEMS);
  };

  const handleToProceed = () => {
    setEvent(Events.PROCEED);
  };

  useEffect(() => {
    if (event === Events.SELECT_ITEMS) {
      fetchPokemons();
    }
  }, [event, fetchPokemons]);

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
        <Dialog.Content className="min-h-[600px] overflow-y-auto">
          <Dialog.Title>{renderTitleByEvent(event)}</Dialog.Title>

          {isLoading && <Loading />}
          {!isLoading && event === Events.SELECT_ITEMS && (
            <SelectItemsDialogContent
              hasNext={hasNext}
              hasPrev={hasPrev}
              pokemons={pokemons}
              isSelected={isSelected}
              pagination={pagination}
              onProceed={handleToProceed}
              setPagination={setPagination}
              selectedItemsLen={selectedItemsLen}
              onUpdateSelectedItem={updateSelectedItem}
            />
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

type SelectItemsDialogContentProps = {
  pokemons: Pokemons[];
  hasNext: boolean;
  hasPrev: boolean;
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  selectedItemsLen: number;
  isSelected: (value: string) => boolean;
  onUpdateSelectedItem: (data: PokemonDataList, key: string) => void;
  onProceed: () => void;
};

function SelectItemsDialogContent({
  pokemons,
  hasNext,
  hasPrev,
  pagination,
  setPagination,
  selectedItemsLen,
  isSelected,
  onUpdateSelectedItem,
  onProceed,
}: SelectItemsDialogContentProps) {
  const handleSelect = (data: PokemonDataList) => {
    onUpdateSelectedItem(data, data.name);
  };

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

  return (
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
            disabled={!selectedItemsLen}
            className="text-xs"
            onClick={onProceed}
          >
            Proceed To Compares ({selectedItemsLen})
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
