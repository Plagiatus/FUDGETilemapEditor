<script lang="ts">
    import {
        CanvasController,
        type CanvasControllerPointerEvent,
    } from "$lib/CanvasController";
    import { TileAtlas, type TileBasic, type Vector2 } from "$lib/tiles";
    import { onMount } from "svelte";

    let {
        atlas = $bindable(),
        activate,
        remove,
        active,
    }: {
        atlas: TileAtlas;
        activate: (atlas: TileAtlas) => void;
        remove: (atlas: TileAtlas) => void;
        active: boolean;
    } = $props();

    let wrapperCanvas: HTMLDivElement;
    let canvasBase: HTMLCanvasElement;
    let canvasOverlay: HTMLCanvasElement;
    let wrapperAtlas: HTMLFieldSetElement;
    let ctxOverlay: CanvasRenderingContext2D;
    let ctxBase: CanvasRenderingContext2D;
    let controller: CanvasController;

    let tiles: TileBasic[] = [];
    let selectedTiles: Set<TileBasic> = new Set<TileBasic>();
    let hoveredTile: TileBasic | undefined;

    let showNumbers: boolean = $state(false);
    let showLines: boolean = $state(true);

    onMount(() => {
        wrapperAtlas.addEventListener("click", () => {
            if (active) return;
            activate(atlas);
            updateSelectedTiles();
        });

        controller = new CanvasController(canvasOverlay);

        controller.addEventListener("draw", draw);
        //@ts-expect-error
        controller.addEventListener("pointermove", pointermove);
        //@ts-expect-error
        controller.addEventListener("pointerup", pointerup);
        canvasOverlay.addEventListener("pointerleave", pointerleave);

        ctxOverlay = canvasOverlay.getContext("2d")!;
        ctxBase = canvasBase.getContext("2d")!;
        controller.addCtxToSync(ctxBase);

        setCanvasSize();

        controller.draw();
    });

    function updateSelectedTiles() {
        if (selectedTiles.size == 0) {
            TileAtlas.selectedTiles = [];
            return controller.draw();
        }
        const tileAmount = atlas.tileAmount;
        const min: Vector2 = { x: Infinity, y: Infinity };
        const max: Vector2 = { x: -Infinity, y: -Infinity };
        selectedTiles.forEach((t) => {
            const pos: Vector2 = {
                x: t.indexInAtlas % tileAmount.x,
                y: Math.floor(t.indexInAtlas / tileAmount.x),
            };
            if (min.x > pos.x) min.x = pos.x;
            if (min.y > pos.y) min.y = pos.y;
            if (max.x < pos.x) max.x = pos.x;
            if (max.y < pos.y) max.y = pos.y;
        });
        TileAtlas.selectedTiles = Array.from(
            { length: max.y - min.y + 1 },
            () => [],
        );
        selectedTiles.forEach((t) => {
            const pos: Vector2 = {
                x: (t.indexInAtlas % tileAmount.x) - min.x,
                y: Math.floor(t.indexInAtlas / tileAmount.x) - min.y,
            };
            TileAtlas.selectedTiles[pos.y][pos.x] = t;
        });

        controller.draw();
    }

    function draw() {
        ctxBase.imageSmoothingEnabled = false;
        ctxBase.drawImage(atlas.img!, 0, 0);
        ctxBase.lineWidth = 1;
        ctxBase.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctxBase.textAlign = "right";

        tiles = atlas.getTiles();

        for (let tile of tiles) {
            let { x, y, w, h } = atlas.getTilePosition(tile);
            if (showLines) ctxBase.strokeRect(x, y, w, h);
            if (showNumbers)
                ctxBase.fillText(tile.id.toString(), x + w - 1, y + h - 1, w);
        }

        drawOverlayCanvas();
    }

    function pointermove(_e: CustomEvent<CanvasControllerPointerEvent>) {
        const tile = findTileAtPosition(_e.detail.pos.x, _e.detail.pos.y);
        if (!tile) return pointerleave();
        hoveredTile = tile;
        controller.draw();
    }

    function pointerleave() {
        hoveredTile = undefined;
        controller.draw();
    }

    function pointerup(_e: CustomEvent<CanvasControllerPointerEvent>) {
        if (_e.detail.event.button !== 0) return;
        const tile = findTileAtPosition(_e.detail.pos.x, _e.detail.pos.y);
        if (!tile) {
            selectedTiles.clear();
            return updateSelectedTiles();
        }
        if (_e.detail.event.ctrlKey) {
            if (selectedTiles.has(tile)) {
                selectedTiles.delete(tile);
            } else {
                selectedTiles.add(tile);
            }
        } else {
            if (selectedTiles.has(tile) && selectedTiles.size === 1) {
                selectedTiles.clear();
            } else {
                selectedTiles.clear();
                selectedTiles.add(tile);
            }
        }
        updateSelectedTiles();
    }

    function drawOverlayCanvas() {
        if (hoveredTile) {
            ctxOverlay.fillStyle = "rgba(255, 255, 255, 0.5)";
            let { x, y, w, h } = atlas.getTilePosition(hoveredTile);
            ctxOverlay.fillRect(x, y, w, h);
        }
        for (let tile of selectedTiles.values()) {
            ctxOverlay.strokeStyle = "rgba(255, 0, 0, 1)";
            ctxOverlay.fillStyle = "rgba(255, 0, 0, 0.25)";
            ctxOverlay.lineWidth = 1;
            let { x, y, w, h } = atlas.getTilePosition(tile);
            ctxOverlay.fillRect(x, y, w, h);
            ctxOverlay.strokeRect(x, y, w, h);
        }
    }

    function findTileAtPosition(
        posX: number,
        posY: number,
    ): TileBasic | undefined {
        for (let tile of tiles) {
            let { x, y, w, h } = atlas.getTilePosition(tile);
            if (posX > x && posX < x + w && posY > y && posY < y + h) {
                return tile;
            }
        }
        return;
    }

    function updateTiles() {
        atlas.createTiles();

        controller.draw();
    }

    function setCanvasSize() {
        canvasBase.width = wrapperCanvas.clientWidth;
        canvasBase.height = wrapperCanvas.clientHeight;
        canvasOverlay.width = wrapperCanvas.clientWidth;
        canvasOverlay.height = wrapperCanvas.clientHeight;
    }

    function resetView() {
        setCanvasSize();
        controller.reset();
    }
</script>

<fieldset class="atlas-display" class:active bind:this={wrapperAtlas}>
    <img class="img-preview" src={atlas.src} alt="" />
    <div class="canvas-wrapper" bind:this={wrapperCanvas}>
        <canvas bind:this={canvasBase}></canvas>
        <canvas class="canvas-overlay" bind:this={canvasOverlay}></canvas>
    </div>
    <div class="settings-wrapper">
        <fieldset>
            <legend>Tile Size</legend>
            <label
                >width <input
                    type="number"
                    oninput={updateTiles}
                    bind:value={atlas.settings.tileSize.x}
                    min="0"
                /></label
            >
            <label
                >height <input
                    type="number"
                    oninput={updateTiles}
                    bind:value={atlas.settings.tileSize.y}
                    min="0"
                /></label
            >
        </fieldset>
        <fieldset>
            <legend>Tile Gap</legend>
            <label
                >width <input
                    type="number"
                    oninput={updateTiles}
                    bind:value={atlas.settings.tileGap.x}
                /></label
            >
            <label
                >height <input
                    type="number"
                    oninput={updateTiles}
                    bind:value={atlas.settings.tileGap.y}
                /></label
            >
        </fieldset>
        <fieldset>
            <legend>Offset</legend>
            <label
                >width <input
                    type="number"
                    oninput={updateTiles}
                    bind:value={atlas.settings.startOffset.x}
                /></label
            >
            <label
                >height <input
                    type="number"
                    oninput={updateTiles}
                    bind:value={atlas.settings.startOffset.y}
                    width="5"
                /></label
            >
        </fieldset>
        <fieldset>
            <legend>Display Settings</legend>
            <label
                >show numbers <input
                    type="checkbox"
                    bind:checked={showNumbers}
                /></label
            >
            <label
                >show lines <input
                    type="checkbox"
                    bind:checked={showLines}
                /></label
            >
            <button onclick={resetView}>reset view</button>
        </fieldset>
        <fieldset>
            <legend>Danger Zone</legend>
            <button onclick={()=>{remove(atlas)}}>Remove</button>
        </fieldset>
    </div>
</fieldset>

<style>
    .atlas-display.active {
        display: flex;
    }
    .atlas-display > .canvas-wrapper,
    .atlas-display > .settings-wrapper {
        display: none;
    }
    .atlas-display.active > .canvas-wrapper,
    .atlas-display.active > .settings-wrapper {
        display: block;
    }
    .atlas-display > .img-preview {
        display: block;
    }
    .atlas-display.active > .img-preview {
        display: none;
    }
    .atlas-display:not(.active) {
        cursor: pointer;
    }
    .img-preview {
        height: 50px;
    }

    .canvas-wrapper {
        position: relative;
        flex-grow: 1;
        border: 1px solid var(--color-3);
    }

    .canvas-overlay {
        position: absolute;
        top: 0;
        left: 0;
    }

    input[type="number"] {
        width: 4em;
    }

    fieldset {
        border: 1px solid var(--color-3);
    }
</style>
