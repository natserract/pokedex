import { PokemonType, Pokemon } from "pokenode-ts";

export interface PokemonDataList {
  id: number;
  name: string;
  types: PokemonType[];
  thumbnailUrl?: string | null;
}

export interface PokemonDataGet
  extends PokemonDataList,
    Pick<Pokemon, "height" | "weight"> {
  abilityName: string;
  coverUrl: string | null;
  description: string;
}

export interface BaseParams {
  offset: number;
  limit: number;
}

export type SortType = "asc" | "desc";
