<script lang="ts">
    import AtlasImport from "$lib/cmp/AtlasImport.svelte";
    import TileMapDisplay from "$lib/cmp/TileMapDisplay.svelte";
    import { TileAtlas, TileMap } from "$lib/tiles";
    import { onMount } from "svelte";

    let promises: Promise<any>[] = $state([]);
    let atlantes: TileAtlas[] = $state([]);
    onMount(async () => {
        // const atlas = new TileAtlas(
        //     "/tile_atlas.png",
        //     {
        //         startOffset: { x: 0, y: 0 },
        //         tileGap: { x: 0, y: 0 },
        //         tileSize: { x: 64, y: 64 },
        //     },
        //     "example",
        // );
        // atlantes.push(atlas);

        // let tm = new TileMap(
        //     { x: 5, y: 5 },
        //     { x: 64, y: 64 },
        //     [...(await atlas.createTiles(1))],
        //     [atlas],
        //     [
        //         10, 10, 10, 10, 10, 2, 2, 2, 3, 10, 10, 10, 10, 10, 10, 10, 10,
        //         10, 2, 3, 2, 2, 2, 2, 3,
        //     ],
        // );
    });
</script>

<h1>Tilemap Generator</h1>

<AtlasImport bind:atlantes={atlantes} />

<!-- <TileMapDisplay map={tm} /> -->
