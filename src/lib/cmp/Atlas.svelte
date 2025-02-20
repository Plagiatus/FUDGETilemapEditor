<script lang="ts">
    import type { TileAtlas, TileBasic } from "$lib/tiles";
    import { draw } from "svelte/transition";

    let { atlas = $bindable() }: { atlas: TileAtlas } = $props();

    let canvasBase: HTMLCanvasElement;
    let canvasOverlay: HTMLCanvasElement;
    let ctxOverlay: CanvasRenderingContext2D;

    let tiles: TileBasic[] = [];
    let selectedTile: TileBasic | undefined;
    let hoveredTile: TileBasic | undefined;

    $effect(() => {
        canvasOverlay.addEventListener("pointermove", pointermove);
        canvasOverlay.addEventListener("pointerleave", pointerleave);
        canvasOverlay.addEventListener("pointerup", pointerup);
        ctxOverlay = canvasOverlay.getContext("2d")!;
    });

    $effect(() => {
        const ctx = canvasBase.getContext("2d")!;
        ctx.clearRect(0, 0, canvasBase.width, canvasBase.height);
        ctx.drawImage(atlas.img!, 0, 0);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.textAlign = "right";

        tiles = atlas.createTiles(1);

        for (let tile of tiles) {
            let { x, y, w, h } = atlas.getTilePosition(tile);
            ctx.strokeRect(x, y, w, h);
            ctx.fillText(tile.id.toString(), x + w - 1, y + h - 1, w);
        }
    });

    function pointermove(_e: PointerEvent) {
        const tile = getTileFromPointerEvent(_e);
        if (!tile) return pointerleave();
        hoveredTile = tile;
        drawOverlayCanvas();
    }

    function pointerleave() {
        hoveredTile = undefined;
        drawOverlayCanvas();
    }

    function pointerup(_e: PointerEvent) {
        const tile = getTileFromPointerEvent(_e);
        if (!tile) return;
        selectedTile = tile;
        drawOverlayCanvas();
    }

    function drawOverlayCanvas() {
        ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        if (hoveredTile) {
            ctxOverlay.fillStyle = "rgba(255, 255, 255, 0.5)";
            let { x, y, w, h } = atlas.getTilePosition(hoveredTile);
            ctxOverlay.fillRect(x, y, w, h);
        }
        if (selectedTile) {
            ctxOverlay.strokeStyle = "rgba(255, 0, 0, 1)";
            ctxOverlay.lineWidth = 1;
            let { x, y, w, h } = atlas.getTilePosition(selectedTile);
            ctxOverlay.strokeRect(x, y, w, h);
        }
    }

    function getTileFromPointerEvent(
        event: PointerEvent,
    ): TileBasic | undefined {
        const rect = canvasOverlay.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;
        return findTileAtPosition(posX, posY);
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
</script>

<fieldset class="atlas-display">
    <fieldset>
        <legend>Tile Size</legend>
        <label
            >width <input
                type="number"
                bind:value={atlas.settings.tileSize.x}
                min="0"
            /></label
        >
        <label
            >height <input
                type="number"
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
                bind:value={atlas.settings.tileGap.x}
            /></label
        >
        <label
            >height <input
                type="number"
                bind:value={atlas.settings.tileGap.y}
            /></label
        >
    </fieldset>
    <fieldset>
        <legend>Offset</legend>
        <label
            >width <input
                type="number"
                bind:value={atlas.settings.startOffset.x}
            /></label
        >
        <label
            >height <input
                type="number"
                bind:value={atlas.settings.startOffset.y}
                width="5"
            /></label
        >
    </fieldset>
    <div class="canvas-wrapper">
        <canvas
            width={atlas.img!.naturalWidth}
            height={atlas.img!.naturalHeight}
            bind:this={canvasBase}
        ></canvas>
        <canvas
            class="canvas-overlay"
            width={atlas.img!.naturalWidth}
            height={atlas.img!.naturalHeight}
            bind:this={canvasOverlay}
        ></canvas>
    </div>
</fieldset>

<style>
    .canvas-wrapper {
        position: relative;
    }

    .canvas-overlay {
        position: absolute;
        top: 0;
        left: 0;
    }

    input[type="number"]{
        width: 5em;
    }
</style>
