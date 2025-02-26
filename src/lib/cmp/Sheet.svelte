<script lang="ts">
    import {
        CanvasController,
        type CanvasControllerEvent,
        type CanvasControllerPointerEvent,
    } from "$lib/CanvasController";
    import {
        TILE_NEIGHBOR_RULE,
        TileAtlas,
        TileRenderer,
        TileSheet,
        type Tile,
        type Vector2,
    } from "$lib/tiles";
    import { onMount } from "svelte";
    import TileInfo from "./TileInfo.svelte";

    let sheetSize: Vector2 = $state({ x: 20, y: 20 });
    let tileSize: Vector2 = $state({ x: 16, y: 16 });
    let {
        sheet = $bindable(new TileSheet(sheetSize, tileSize)),
        selectedAtlas,
    }: { sheet: TileSheet | undefined; selectedAtlas: TileAtlas | undefined } =
        $props();
    let canvasSheet: HTMLCanvasElement;
    let canvasOverlay: HTMLCanvasElement;
    let ctxSheet: CanvasRenderingContext2D;
    let ctxOverlay: CanvasRenderingContext2D;
    let controllerSheet: CanvasController;
    let selectedTile: Tile | undefined = $state();
    let drawLines: boolean = $state(true);
    let mousePos: Vector2 = $state({ x: 0, y: 0 });
    let dragging = false;
    let deleting = false;

    onMount(() => {
        controllerSheet = new CanvasController(canvasSheet);
        controllerSheet.addEventListener("draw", draw);
        //@ts-expect-error
        controllerSheet.addEventListener("pointerdown", pointerdown);
        //@ts-expect-error
        controllerSheet.addEventListener("pointermove", pointermove);
        //@ts-expect-error
        controllerSheet.addEventListener("pointerup", pointerup);
        ctxSheet = canvasSheet.getContext("2d")!;

        let rect = canvasSheet.getBoundingClientRect();
        canvasSheet.width = rect.width;
        canvasOverlay.width = rect.width;
        canvasSheet.height = rect.height;
        canvasOverlay.height = rect.height;
        ctxOverlay = canvasOverlay.getContext("2d")!;
        controllerSheet.addCtxToSync(ctxOverlay);

        draw();
    });

    function pointerdown(ev: CustomEvent<CanvasControllerPointerEvent>) {
        if (ev.detail.event.button === 0) {
            dragging = true;
        } else if (ev.detail.event.button === 2) {
            deleting = true;
            const tilePos = getTileLocationFromPos(ev.detail.pos);
            if (tilePos) sheet.setTile(undefined, tilePos);
        }
    }
    function pointermove(ev: CustomEvent<CanvasControllerPointerEvent>) {
        mousePos = ev.detail.pos;
        if (deleting) {
            const tilePos = getTileLocationFromPos(ev.detail.pos);
            if (tilePos) sheet.setTile(undefined, tilePos);
        }
        if (dragging) {
            placeSelectedTilesAtMousePosition();
        }
        controllerSheet.draw();
    }
    function pointerup(ev: CustomEvent<CanvasControllerPointerEvent>) {
        if (ev.detail.event.button === 0) {
            // left mouse
            dragging = false;
            placeSelectedTilesAtMousePosition();
        } else if (ev.detail.event.button === 2) {
            // right mouse
            deleting = false;
        }
    }

    function placeSelectedTilesAtMousePosition() {
        const tilePos = getTileLocationFromPos(mousePos);
        if (!tilePos) {
            selectedTile = undefined;
            return;
        }
        if (TileAtlas.selectedTiles.length > 0) {
            for (let y: number = 0; y < TileAtlas.selectedTiles.length; y++) {
                for (
                    let x: number = 0;
                    x < TileAtlas.selectedTiles[y].length;
                    x++
                ) {
                    if (!TileAtlas.selectedTiles[y][x]) continue;
                    if (
                        tilePos.x + x >= sheet.mapSize.x ||
                        tilePos.y + y >= sheet.mapSize.y
                    )
                        continue;
                    sheet.setTile(TileAtlas.selectedTiles[y][x], {
                        x: tilePos.x + x,
                        y: tilePos.y + y,
                    });
                }
            }
        } else {
            let tile = sheet.getTile(tilePos);
            if (!tile) {
                tile = TileRenderer.newTile("rule");
                sheet.setTile(tile, tilePos);
            }
            selectedTile = tile;
        }
    }

    function getTileLocationFromPos(pos: Vector2): Vector2 | undefined {
        const tilePos: Vector2 = {
            x: Math.floor(pos.x / tileSize.x),
            y: Math.floor(pos.y / tileSize.y),
        };

        if (tilePos.x < 0 || tilePos.y < 0) return;
        if (tilePos.x >= sheet.mapSize.x || tilePos.y >= sheet.mapSize.y)
            return;
        return tilePos;
    }

    function draw() {
        sheet.render(ctxSheet);
        ctxSheet.strokeStyle = "rgba(0, 0, 0, 1)";
        ctxSheet.lineWidth = 1;
        const path = new Path2D();
        for (let y: number = 0; y < sheetSize.y; y++) {
            for (let x: number = 0; x < sheetSize.x; x++) {
                path.moveTo(x * tileSize.x, y * tileSize.y + tileSize.y);
                path.lineTo(x * tileSize.x, y * tileSize.y);
                path.lineTo(x * tileSize.x + tileSize.x, y * tileSize.y);
            }
        }
        path.moveTo(0, sheetSize.y * tileSize.y);
        path.lineTo(sheetSize.x * tileSize.x, sheetSize.y * tileSize.y);
        path.lineTo(sheetSize.x * tileSize.x, 0);

        if (drawLines) {
            ctxSheet.stroke(path);
        }
        drawOverlay();
    }

    function drawOverlay() {
        const tilePos = getTileLocationFromPos(mousePos);
        if (!tilePos) return;

        ctxOverlay.imageSmoothingEnabled = false;
        for (let y: number = 0; y < TileAtlas.selectedTiles.length; y++) {
            for (
                let x: number = 0;
                x < TileAtlas.selectedTiles[y].length;
                x++
            ) {
                if (
                    tilePos.x + x >= sheet.mapSize.x ||
                    tilePos.y + y >= sheet.mapSize.y
                )
                    continue;
                const pos: Vector2 = {
                    x: (tilePos.x + x) * sheet.tileSize.x,
                    y: (tilePos.y + y) * sheet.tileSize.y,
                };
                TileRenderer.drawTile(
                    TileAtlas.selectedTiles[y][x],
                    ctxOverlay,
                    pos,
                    tileSize,
                );
            }
        }
    }

    function resetView() {
        controllerSheet.reset();
    }
</script>

<div id="sheet-wrapper">
    <fieldset>
        <fieldset>
            <legend>Tile Size</legend>
            <label
                >width<input
                    type="number"
                    bind:value={tileSize.x}
                    min="0"
                /></label
            >
            <label
                >height<input
                    type="number"
                    bind:value={tileSize.y}
                    min="0"
                /></label
            >
        </fieldset>
        <fieldset>
            <legend>Sheet Size</legend>
            <label
                >width<input
                    type="number"
                    bind:value={sheetSize.x}
                    min="0"
                /></label
            >
            <label
                >height<input
                    type="number"
                    bind:value={sheetSize.y}
                    min="0"
                /></label
            >
        </fieldset>
        <fieldset>
            <legend>Display Settings</legend>
            <label
                >show lines <input type="checkbox" bind:checked={drawLines} />
            </label>
            <button onclick={resetView}>reset view</button>
        </fieldset>
    </fieldset>
    <div id="sheet-canvas-wrapper">
        <canvas id="sheet-canvas" bind:this={canvasSheet}></canvas>
        <canvas id="overlay-canvas" bind:this={canvasOverlay}></canvas>
    </div>
    <div id="tile-info-wrapper">
        <!-- <span>Mouse: {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}</span> -->
        <div id="tile-info">
            {#if selectedTile}
                <TileInfo tile={selectedTile} />
            {/if}
        </div>
    </div>
</div>

<style>
    #sheet-wrapper {
        height: 100%;
        width: 100%;
    }

    #sheet-canvas-wrapper {
        position: relative;
        border: 2px solid var(--color-3);
    }

    #sheet-canvas {
        height: 100%;
        width: 100%;
    }

    #overlay-canvas {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
    }

    #tile-info-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        pointer-events: none;
    }

    #tile-info {
        position: absolute;
        right: 0;
        pointer-events: all;
    }

    fieldset {
        border: 2px solid var(--color-3);
    }
</style>
