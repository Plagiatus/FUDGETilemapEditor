<script lang="ts">
    import {
        CanvasController,
        type CanvasControllerPointerEvent,
    } from "$lib/CanvasController";
    import {
        TileAtlas,
        TileRenderer,
        TileSheet,
        type Tile,
        type Vector2,
    } from "$lib/tiles";
    import { onMount } from "svelte";
    import TileInfo from "./TileInfo.svelte";
    import { tryToCreateRuleTile } from "$lib/ruleGenerator.svelte";
    import Vector2Input from "./util/Vector2Input.svelte";
    import { drawGridOverlay, setCanvasSize } from "$lib/util";
    import { selectedTileSheet, selectedTilesAtlas } from "$lib/stores";

    let sheetSize: Vector2 = $state({ x: 20, y: 20 });
    let tileSize: Vector2 = $state({ x: 16, y: 16 });
    let {
        // svelte-ignore state_referenced_locally
                sheet = $bindable(new TileSheet(sheetSize, tileSize)),
    }: { sheet: TileSheet | undefined } = $props();
    let wrapperSheet: HTMLDivElement;
    let canvasSheet: HTMLCanvasElement;
    let canvasOverlay: HTMLCanvasElement;
    let ctxSheet: CanvasRenderingContext2D;
    let ctxOverlay: CanvasRenderingContext2D;
    let controllerSheet: CanvasController;
    let selectedTilePosition: Vector2 | undefined = $state();
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

        setCanvasSizes();
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
            checkMousedownAction(ev);
        }
        controllerSheet.draw();
    }
    function pointerup(ev: CustomEvent<CanvasControllerPointerEvent>) {
        if (ev.detail.event.button === 0) {
            // left mouse
            dragging = false;
            checkMousedownAction(ev);
        } else if (ev.detail.event.button === 2) {
            // right mouse
            deleting = false;
        }
        controllerSheet.draw();
    }

    function checkMousedownAction(
        ev: CustomEvent<CanvasControllerPointerEvent>,
    ) {
        const tilePos = getTileLocationFromPos(mousePos);
        if (!tilePos) {
            // didn't click on a valid tile position, deselect and return
            $selectedTileSheet = undefined;
            return;
        }

        if ($selectedTilesAtlas.length > 0) {
            // there are selected tiles to place
            if (ev.detail.event.shiftKey) {
                // try to create a rule tile from the selected tiles
                const newTile = tryToCreateRuleTile();
                if (!newTile) return;
                sheet.setTile(newTile, tilePos);
                $selectedTileSheet = newTile;
            } else {
                // place all tiles as selected
                placeSelectedTiles(tilePos);
            }
        } else {
            // there aren't selected tiles to place, so select the sheets tiles or create a rule tile
            let tile = sheet.getTile(tilePos);
            if (!tile) {
                let tile = $state(TileRenderer.newTile("rule"));
                sheet.setTile(tile, tilePos);
                $selectedTileSheet = tile;
            } else {
                $selectedTileSheet = tile;
            }
            selectedTilePosition = tilePos;
        }
    }

    function placeSelectedTiles(pos: Vector2) {
        for (let y: number = 0; y < $selectedTilesAtlas.length; y++) {
            for (
                let x: number = 0;
                x < $selectedTilesAtlas[y].length;
                x++
            ) {
                if (!$selectedTilesAtlas[y][x]) continue;
                if (
                    pos.x + x >= sheet.mapSize.x ||
                    pos.y + y >= sheet.mapSize.y
                )
                    continue;
                sheet.setTile($selectedTilesAtlas[y][x], {
                    x: pos.x + x,
                    y: pos.y + y,
                });
            }
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

        if (drawLines) {
            drawGridOverlay(ctxSheet, { tileSize, tileAmount: sheetSize });
        }
        drawOverlay();
    }

    function drawOverlay() {
        const tilePos = getTileLocationFromPos(mousePos);
        if (tilePos) {
            ctxOverlay.imageSmoothingEnabled = false;
            for (let y: number = 0; y < $selectedTilesAtlas.length; y++) {
                for (
                    let x: number = 0;
                    x < $selectedTilesAtlas[y].length;
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
                        $selectedTilesAtlas[y][x],
                        ctxOverlay,
                        pos,
                        tileSize,
                    );
                }
            }
        }
        if ($selectedTileSheet && selectedTilePosition) {
            ctxOverlay.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctxOverlay.fillRect(
                selectedTilePosition.x * sheet.tileSize.x,
                selectedTilePosition.y * sheet.tileSize.y,
                sheet.tileSize.x,
                sheet.tileSize.y,
            );
        }
    }

    function setCanvasSizes() {
        setCanvasSize(canvasOverlay, wrapperSheet);
        setCanvasSize(canvasSheet, wrapperSheet);
    }

    function resetView() {
        setCanvasSizes();
        controllerSheet.reset();
    }

    function updateSheetSettings() {
        controllerSheet.draw();
    }
</script>

<div id="sheet-wrapper">
    <fieldset>
        <Vector2Input
            legend="Tile Size"
            bind:vector={tileSize}
            change={updateSheetSettings}
        />
        <Vector2Input
            legend="Sheet Size"
            bind:vector={sheetSize}
            change={updateSheetSettings}
        />
        <fieldset>
            <legend>Display Settings</legend>
            <label
                >show lines <input type="checkbox" bind:checked={drawLines} />
            </label>
            <button onclick={resetView}>reset view</button>
        </fieldset>
    </fieldset>
    <div id="sheet-canvas-wrapper" bind:this={wrapperSheet}>
        <canvas id="sheet-canvas" bind:this={canvasSheet}></canvas>
        <canvas id="overlay-canvas" bind:this={canvasOverlay}></canvas>
    </div>
    <div id="tile-info-wrapper">
        <!-- <span>Mouse: {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}</span> -->
        <div id="tile-info">
            {#if $selectedTileSheet}
                <TileInfo bind:tile={$selectedTileSheet} />
            {/if}
        </div>
    </div>
</div>

<style>
    #sheet-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #sheet-canvas-wrapper {
        position: relative;
        border: 1px solid var(--color-outline);
        flex-grow: 1;
        margin-top: 1px;
    }

    #sheet-canvas {
        position: absolute;
        top: 0;
        left: 0;
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
        top: 0;
        pointer-events: all;
        height: 100%;
    }

    fieldset {
        border: 1px solid var(--color-outline);
    }
</style>
