<script lang="ts">
    import {
        TILE_NEIGHBOR_RULE,
        TileAtlas,
        TileRenderer,
        TileSheet,
        type Tile,
        type Vector2,
    } from "$lib/tiles";

    let sheetSize: Vector2 = $state({ x: 20, y: 20 });
    let tileSize: Vector2 = $state({ x: 16, y: 16 });
    let {
        sheet = $bindable(new TileSheet(sheetSize, tileSize)),
        selectedAtlas,
    }: { sheet: TileSheet | undefined; selectedAtlas: TileAtlas | undefined } =
        $props();
    let canvasSheet: HTMLCanvasElement;
    let canvasOverlay: HTMLCanvasElement;
    let tilePreviewCanvas: HTMLCanvasElement;
    let ctxSheet: CanvasRenderingContext2D;
    let ctxOverlay: CanvasRenderingContext2D;
    let ctxPreview: CanvasRenderingContext2D;
    let selectedTile: Tile | undefined = $state();
    let drawLines: boolean = $state(true);
    let path: Path2D | undefined;
    let mousePos: Vector2 = $state({ x: 0, y: 0 });
    let panning = false;
    let dragging = false;
    let deleting = false;

    let sheetTransform = {
        scale: 1,
        translate: { x: 0, y: 0 },
    };

    $effect(() => {
        canvasSheet.addEventListener("pointermove", pointermove);
        canvasSheet.addEventListener("pointerleave", pointerleave);
        canvasSheet.addEventListener("pointerup", pointerup);
        canvasSheet.addEventListener("pointerdown", pointerdown);
        canvasSheet.addEventListener("contextmenu", (e) => e.preventDefault());
        ctxSheet = canvasSheet.getContext("2d")!;

        let rect = canvasSheet.getBoundingClientRect();
        canvasSheet.width = rect.width;
        canvasOverlay.width = rect.width;
        canvasSheet.height = rect.height;
        canvasOverlay.height = rect.height;
        ctxOverlay = canvasOverlay.getContext("2d")!;

        if (tileSize.x && tileSize.y) {
            path = undefined;
        }

        draw();
    });

    function pointermove(ev: PointerEvent) {
        const pos = getPosFromPointerEvent(ev);
        if (panning) {
            sheetTransform.translate.x += ev.movementX;
            sheetTransform.translate.y += ev.movementY;
        }
        if (deleting) {
            const tilePos = getTileLocationFromPos(pos);
            if (tilePos) sheet.setTile(undefined, tilePos);
        }
        if (dragging) {
            placeSelectedTilesAtMousePosition();
        }
        draw();
    }
    function pointerleave(ev: PointerEvent) {
        //
    }
    function pointerdown(ev: PointerEvent) {
        const pos = getPosFromPointerEvent(ev);
        if (ev.button === 0) {
            dragging = true;
            ev.preventDefault();
        }
        if (ev.button === 1) {
            panning = true;
            ev.preventDefault();
        }
        if (ev.button === 2) {
            deleting = true;
            const tilePos = getTileLocationFromPos(pos);
            if (tilePos) sheet.setTile(undefined, tilePos);
            ev.preventDefault();
        }
    }
    function pointerup(ev: PointerEvent) {
        const pos = getPosFromPointerEvent(ev);
        if (ev.button === 0) {
            // left mouse
            dragging = false;
            placeSelectedTilesAtMousePosition();
        } else if (ev.button === 1) {
            // middle mouse
            panning = false;
        } else if (ev.button === 2) {
            // right mouse
            deleting = false;
        }

        draw();
    }

    function placeSelectedTilesAtMousePosition() {
        const tilePos = getTileLocationFromPos(mousePos);
        if (!tilePos) return;
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
                sheet.setTile(tile, mousePos);
            }
            selectedTile = tile;
        }
    }

    function zoom(ev: WheelEvent) {
        ev.preventDefault();
        const rect = canvasSheet.getBoundingClientRect();
        const pos: Vector2 = {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top,
        };
        const direction = -Math.sign(ev.deltaY);
        const currentScale = sheetTransform.scale;
        sheetTransform.scale *= Math.pow(2, direction);
        const newScale = sheetTransform.scale;
        const scaleChange = newScale / currentScale;
        sheetTransform.translate.x =
            pos.x + (sheetTransform.translate.x - pos.x) * scaleChange;
        sheetTransform.translate.y =
            pos.y + (sheetTransform.translate.y - pos.y) * scaleChange;
        draw();
    }

    function getPosFromPointerEvent(ev: PointerEvent | WheelEvent): Vector2 {
        const rect = canvasSheet.getBoundingClientRect();
        const pos: Vector2 = {
            x:
                (ev.clientX - rect.left - sheetTransform.translate.x) /
                sheetTransform.scale,
            y:
                (ev.clientY - rect.top - sheetTransform.translate.y) /
                sheetTransform.scale,
        };
        mousePos = pos;
        return pos;
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
        resetAndTransformCanvas(ctxSheet);
        sheet.render(ctxSheet);
        ctxSheet.strokeStyle = "rgba(0, 0, 0, 1)";
        ctxSheet.lineWidth = 1;
        if (!path) {
            path = new Path2D();
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
        }
        if (drawLines) {
            ctxSheet.stroke(path);
        }
        drawOverlay();
    }

    function drawOverlay() {
        resetAndTransformCanvas(ctxOverlay);
        const tilePos = getTileLocationFromPos(mousePos);
        if (!tilePos) return;

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

    function resetAndTransformCanvas(ctx: CanvasRenderingContext2D) {
        ctx.reset();
        ctx.translate(sheetTransform.translate.x, sheetTransform.translate.y);
        ctx.scale(sheetTransform.scale, sheetTransform.scale);
        ctx.clearRect(0, 0, canvasSheet.width, canvasSheet.height);
    }

    function resetView() {
        sheetTransform.scale = 1;
        sheetTransform.translate.x = 0;
        sheetTransform.translate.y = 0;
        draw();
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
        <canvas id="sheet-canvas" bind:this={canvasSheet} onwheel={zoom}
        ></canvas>
        <canvas id="overlay-canvas" bind:this={canvasOverlay}></canvas>
    </div>
    <div id="tile-info-wrapper">
        <!-- <span>Mouse: {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}</span> -->
        {#if selectedTile}
            <div id="tile-info">
                <canvas bind:this={tilePreviewCanvas}></canvas>
                {selectedTile.id}, {selectedTile.type}
            </div>
        {/if}
    </div>
</div>

<style>
    #sheet-wrapper {
        height: 100%;
        width: 100%;
    }

    #sheet-canvas-wrapper {
        position: relative;
    }

    #sheet-canvas {
        height: 100%;
        width: 100%;
        border: 1px solid;
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
</style>
