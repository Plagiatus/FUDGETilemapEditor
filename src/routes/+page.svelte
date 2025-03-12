<script lang="ts">
    import AtlasImport from "$lib/cmp/AtlasImport.svelte";
    import Sheet from "$lib/cmp/Sheet.svelte";
    import TileMapDisplay from "$lib/cmp/TileMapDisplay.svelte";
    import { selectedTilesAtlas } from "$lib/stores";
    import { TileAtlas, TileMap, TileSheet, type Tile } from "$lib/tiles";
    let atlantes: TileAtlas[] = $state([]);

    let atlasTab: HTMLDivElement;
    let atlasTabVisible: boolean = $state(true);
    let mapTab: HTMLDivElement;
    let activeAtlas: TileAtlas | undefined = $state();
    let selectedTile: Tile | undefined = $state();
    let tileSheet: TileSheet | undefined = $state();

    $effect(() => {
        atlasTab.addEventListener("pointerup", () => {
            atlasTabVisible = true;
        });
        mapTab.addEventListener("pointerup", () => {
            atlasTabVisible = false;
            $selectedTilesAtlas = [];
        });
    });
    let map = new TileMap(
        { x: 5, y: 5 },
        { x: 64, y: 64 },
        [],
    );

    $effect(()=>{
        TileMap.setAtlantes(atlantes);
    })
</script>

<svelte:head>
    <title>FUDGE Tilemap Editor</title>
</svelte:head>

<div id="outer-wrapper">
    <h1>
        <a
            href="https://github.com/hs-furtwangen/FUDGE"
            target="_blank"
            rel="noopener noreferrer">FUDGE</a
        > Tilemap Editor
    </h1>
    <div class="tabs">
        <div
            class="tab"
            class:shown={atlasTabVisible}
            bind:this={atlasTab}
            id="tab-atlas"
        >
            <h2>Tile Atlas</h2>
            <div class="tab-content">
                <AtlasImport bind:atlantes bind:activeAtlas/>
            </div>
        </div>
        <div class="tab shown" id="tab-sheet">
            <h2>Tile Sheet</h2>
            <div class="tab-content">
                <Sheet sheet={tileSheet}/>
            </div>
        </div>
        <div
            class="tab"
            class:shown={!atlasTabVisible}
            bind:this={mapTab}
            id="tab-map"
        >
            <h2>Tile Map</h2>
            <div class="tab-content">
                <TileMapDisplay map={map}/>
            </div>
        </div>
    </div>
</div>

<style>
    #outer-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .tabs {
        display: flex;
        flex-grow: 1;
    }

    .tab {
        overflow: hidden;
        width: 50px;
        padding: 0.5em;
        transition: flex-grow 0.2s ease;
        display: flex;
        flex-direction: column;
    }
    .tab.shown {
        flex-grow: 1;
    }
    .tab:not(.shown) {
        cursor: pointer;
    }
    .tab:not(.shown) .tab-content {
        scale: 0;
        pointer-events: none;
    }
    .tab-content {
        scale: 1;
        transition: scale 0.2s ease;
        flex-grow: 1;
    }
    .tab:not(.shown) h2 {
        writing-mode: vertical-lr;
    }

    #tab-atlas {
        --color-outline: var(--color-3);
        background-color: var(--color-1);
    }
    #tab-sheet {
        --color-outline: var(--color-3);
        background-color: var(--color-2);
    }
    #tab-map {
        --color-outline: var(--color-4);
        background-color: var(--color-3);
    }
    h1 {
        color: var(--color-1);
        background-color: var(--color-4);
        padding: 0.2em;
        text-align: center;
    }
</style>
