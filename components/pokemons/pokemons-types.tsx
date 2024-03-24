import Button from "~/components/base/button";
import type { PokemonDataList } from "~/components/pokemons/types";

import { cn } from "~/utils/cn";

interface Props extends Pick<PokemonDataList, "types"> {
  classNames?: string;
}

export function PokemonsTypes({ types, classNames }: Props) {
  const classes = cn("flex flex-row gap-3", classNames);

  return (
    <div className={classes}>
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
