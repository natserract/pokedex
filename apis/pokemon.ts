import { BaseClient } from "~/apis/client";
import { ENDPOINTS } from "~/constants/endpoints";

import type { Ability, NamedAPIResourceList, Pokemon } from "~/types/models";

export class PokemonClient extends BaseClient {
  public async getAbilityById(id: number): Promise<Ability> {
    return this.getResource(ENDPOINTS.ABILITY, id);
  }

  public async getPokemonByName(name: string): Promise<Pokemon> {
    return this.getResource(ENDPOINTS.POKEMON, name);
  }

  public async listPokemons(
    offset?: number,
    limit?: number,
  ): Promise<NamedAPIResourceList> {
    return this.getListResource(ENDPOINTS.POKEMON, offset, limit);
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
