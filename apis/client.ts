import axios from "axios";
import { PokemonClient } from "pokenode-ts";

import { env } from "~/configs/env";

export const axiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Cache-Control": "max-age=600", // upto 10 mins of cached response
  },
});

export const pokemonInstance = new PokemonClient();
