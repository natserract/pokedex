"use client";
import { useMemo } from "react";

import { cn } from "~/utils/cn";
import { toCamelCase } from "~/utils/string";
import type { PokemonStat } from "~/types/models";

type Props = {
  data: PokemonStat[];
};

// References:
//
// effort: The effort points (EV) the Pokémon has in the stat.
// base_stat: The base value of the stat.
//
// @see https://pokeapi.co/docs/v2#pokemonstat
//
export default function PokemonStats({ data }: Props) {
  const statsIterations = useMemo(() => {
    if (!data) return [];
    return data.map(createStatIteration);
  }, [data]);

  return (
    <div className="border-foreground/20 border p-5">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-6">
        {statsIterations.map((stat) => {
          return (
            <div key={stat.name}>
              <h4 className="mb-2">{toCamelCase(stat.name)}</h4>

              <ul className="list-none">
                {stat.values.map((value) => (
                  <li
                    key={`${stat.name}-${value.id}`}
                    data-value={value.id}
                    className={cn("mb-1 h-[0.2em] w-full bg-white", {
                      "active bg-brand-300": value.active,
                    })}
                  ></li>
                ))}
                <span className="text-foreground/30 text-xs">
                  {stat.base_stat}%
                </span>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type CreateStatsIterationParams = PokemonStat;

type CreateStatsIterationReturns = {
  name: string;
  base_stat: number;
  values: {
    id: number;
    active: boolean | undefined;
  }[];
};

export function createStatIteration({
  stat,
  base_stat,
}: CreateStatsIterationParams): CreateStatsIterationReturns {
  let iters: {
    id: number;
    active: boolean | undefined;
  }[] = [];

  const statsConfigurations = {
    min: 0,
    max: 100,
  };

  for (let i = statsConfigurations.min; i < statsConfigurations.max; i++) {
    iters.push({ id: i, active: false });

    if (i < base_stat) {
      iters[i] = {
        id: i,
        active: true,
      };
    }
  }

  return {
    name: stat.name,
    base_stat,
    values: iters.reverse(),
  };
}
