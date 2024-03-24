import type { PokemonDataGet } from "~/components/pokemons/types";

type Props = {
  data: PokemonDataGet;
};

export function PokemonsAbility({ data }: Props) {
  const { height, weight, abilityName } = data;

  return (
    <div className="border-foreground/20 border p-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="">
          <h4 className="">Height</h4>
          <p className="font-bold">{height}</p>
        </div>

        <div className="">
          <h4 className="">Weight</h4>
          <p className="font-bold">{weight}</p>
        </div>

        <div className="">
          <h4 className="">Abilities</h4>
          <p className="font-bold">{abilityName}</p>
        </div>
      </div>
    </div>
  );
}
