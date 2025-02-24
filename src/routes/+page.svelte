<script lang="ts">
    import AtlasImport from "$lib/cmp/AtlasImport.svelte";
    import Sheet from "$lib/cmp/Sheet.svelte";
    import TileMapDisplay from "$lib/cmp/TileMapDisplay.svelte";
    import { TileAtlas, TileMap, TileRenderer, TileSheet } from "$lib/tiles";
    let atlantes: TileAtlas[] = $state([]);

    let atlasTab: HTMLDivElement;
    let atlasTabVisible: boolean = $state(true);
    let mapTab: HTMLDivElement;
    let activeAtlas: TileAtlas | undefined = $state();
    let tileSheet: TileSheet | undefined = $state();

    $effect(() => {
        atlasTab.addEventListener("pointerup", () => {
            atlasTabVisible = true;
        });
        mapTab.addEventListener("pointerup", () => {
            atlasTabVisible = false;
        });
    });
    let map = new TileMap(
        { x: 5, y: 5 },
        { x: 64, y: 64 },
        [
            1, 2, 2, 2, 3,
            9, 10, 10, 10, 11,
            9, 10, 10, 10, 11,
            9, 10, 10, 10, 11,
            17, 18, 18, 18, 19,
        ],
    );

    $effect(()=>{
        TileRenderer.setAtlantes(atlantes);
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
                <Sheet sheet={tileSheet} selectedAtlas={activeAtlas}/>
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
                <TileMapDisplay map={map} />
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
        min-height: 100%;
    }
    .tab:not(.shown) h2 {
        writing-mode: vertical-lr;
    }

    #tab-atlas {
        background-color: #f8f3d9;
    }
    #tab-sheet {
        background-color: #ebe5c2;
    }
    #tab-map {
        background-color: #b9b28a;
    }
    h1 {
        color: #f8f3d9;
        background-color: #504b38;
        padding: 0.2em;
        text-align: center;
    }
</style>
