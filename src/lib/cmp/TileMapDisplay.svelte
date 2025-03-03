<script lang="ts">
    import type { Tile, TileMap, Vector2 } from "$lib/tiles";
    import { onMount } from "svelte";
    import Vector2Input from "./util/Vector2Input.svelte";
    import {
        CanvasController,
        type CanvasControllerPointerEvent,
    } from "$lib/CanvasController";
    import { drawGridOverlay, setCanvasSize } from "$lib/util";
    import { selectedTileSheet } from "$lib/stores";

    let { map }: { map: TileMap } = $props();
    let mapSize: Vector2 = $state({ x: 20, y: 20 });
    let tileSize: Vector2 = $state({ x: 16, y: 16 });
    let canvas: HTMLCanvasElement;
    let wrapper: HTMLDivElement;
    let ctx: CanvasRenderingContext2D;
    let controller: CanvasController;
    let showLines: boolean = $state(true);

    onMount(() => {
        controller = new CanvasController(canvas);
        controller.addEventListener("draw", draw);
        // @ts-expect-error
        controller.addEventListener("pointerup", pointerup);

        ctx = canvas.getContext("2d")!;
        setCanvasSizes();
        updateMap();
    });

    function pointerup(ev: CustomEvent<CanvasControllerPointerEvent>) {
        if (ev.detail.event.button === 0) {
            if (!$selectedTileSheet) return;
            const tilePos = getTileLocationFromPos(ev.detail.pos);
            if (!tilePos) return;
            map.setTile(tilePos.x, tilePos.y, $selectedTileSheet);
        }
        else if (ev.detail.event.button === 2) {
            const tilePos = getTileLocationFromPos(ev.detail.pos);
            if (!tilePos) return;
            map.setTile(tilePos.x, tilePos.y, undefined!);
        }
        controller.draw();
    }

    function getTileLocationFromPos(pos: Vector2): Vector2 | undefined {
        const tilePos: Vector2 = {
            x: Math.floor(pos.x / tileSize.x),
            y: Math.floor(pos.y / tileSize.y),
        };

        if (tilePos.x < 0 || tilePos.y < 0) return;
        if (tilePos.x >= mapSize.x || tilePos.y >= mapSize.y) return;
        return tilePos;
    }

    function draw() {
        map.render(ctx);
        if (showLines) drawGridOverlay(ctx, { tileAmount: mapSize, tileSize });
    }

    function updateMap() {
        map.tileSize = tileSize;
        map.mapSize = mapSize;
        controller.draw();
    }

    function setCanvasSizes() {
        setCanvasSize(canvas, wrapper);
    }

    function resetView() {
        setCanvasSizes();
        controller.reset();
        // controller.draw();
    }

    function resetMap(){
        map.reset();
    }
</script>

<div id="map-display">
    <div class="map-display-settings">
        <Vector2Input
            legend="Tile Size"
            bind:vector={tileSize}
            change={updateMap}
        />
        <Vector2Input
            legend="Map Size"
            bind:vector={mapSize}
            change={updateMap}
        />
        <fieldset>
            <legend>Display Settings</legend>
            <label
                >show lines <input type="checkbox" bind:checked={showLines} />
            </label>
            <button onclick={resetView}>reset view</button>
            <button onclick={resetMap}>reset map</button>
        </fieldset>
    </div>
    <div id="map-display-canvas-wrapper" bind:this={wrapper}>
        <canvas bind:this={canvas}></canvas>
    </div>
</div>

<style>
    #map-display {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    #map-display-canvas-wrapper {
        flex-grow: 1;
        border: 1px solid var(--color-4);
    }
</style>
