import { writable } from "svelte/store";
import type { Tile, TileBasic } from "./tiles";

export const selectedTilesAtlas = writable([] as TileBasic[][]);
export const selectedTileSheet = writable<Tile | undefined>();