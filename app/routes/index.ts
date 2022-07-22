import Route from "@ember/routing/route";
import type { PokeApiReturn } from "codex/types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default class IndexRoute extends Route<string[]> {
  async model() {
    // await delay(555555);

    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const apiReturn = (await response.json()) as PokeApiReturn;

    return apiReturn.results.map(({ name }) => name);
  }
}
