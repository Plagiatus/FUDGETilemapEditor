<script lang="ts">
    import type { TileAtlas, TileBasic, Vector2 } from "$lib/tiles";

    let { atlas = $bindable(), activate, active }: { atlas: TileAtlas, activate: (atlas: TileAtlas)=>void, active: boolean} = $props();

    let canvasBase: HTMLCanvasElement;
    let canvasOverlay: HTMLCanvasElement;
    let wrapper: HTMLFieldSetElement;
    let ctxOverlay: CanvasRenderingContext2D;

    let tiles: TileBasic[] = [];
    let selectedTiles: Set<TileBasic> = new Set<TileBasic>();
    let hoveredTile: TileBasic | undefined;

    let showNumbers: boolean = $state(true);
    let showLines: boolean = $state(true);

    $effect(() => {
        wrapper.addEventListener("click", ()=>{activate(atlas);})

        canvasOverlay.addEventListener("pointermove", pointermove);
        canvasOverlay.addEventListener("pointerleave", pointerleave);
        canvasOverlay.addEventListener("pointerup", pointerup);
        // canvasOverlay.addEventListener("pointerdown", pointerdown);
        canvasOverlay.addEventListener("contextmenu", (e) =>
            e.preventDefault(),
        );
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
            if (showLines) ctx.strokeRect(x, y, w, h);
            if (showNumbers)
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
        if (_e.ctrlKey) {
            if (selectedTiles.has(tile)) {
                selectedTiles.delete(tile);
            } else {
                selectedTiles.add(tile);
            }
        } else {
            selectedTiles.clear();
            selectedTiles.add(tile);
        }
        drawOverlayCanvas();
    }

    function drawOverlayCanvas() {
        ctxOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        if (hoveredTile) {
            ctxOverlay.fillStyle = "rgba(255, 255, 255, 0.5)";
            let { x, y, w, h } = atlas.getTilePosition(hoveredTile);
            ctxOverlay.fillRect(x, y, w, h);
        }
        for (let tile of selectedTiles.values()) {
            ctxOverlay.strokeStyle = "rgba(255, 0, 0, 1)";
            ctxOverlay.lineWidth = 1;
            let { x, y, w, h } = atlas.getTilePosition(tile);
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

<fieldset class="atlas-display" class:active={active} bind:this={wrapper}>
    <img class="img-preview" src={atlas.src} alt="" />
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
    <div class="settings-wrapper">
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
    .atlas-display:not(.active){
        cursor: pointer;
    }
    .img-preview {
        height: 50px;
    }

    .canvas-wrapper {
        position: relative;
        flex-grow: 1;
    }

    .canvas-overlay {
        position: absolute;
        top: 0;
        left: 0;
    }

    input[type="number"] {
        width: 5em;
    }
</style>
