<script lang="ts">
    import {
        TILE_NEIGHBOR_RULE,
        TileAtlas,
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
    let ctxSheet: CanvasRenderingContext2D;
    let selectedTile: Tile | undefined = $state();
    let drawLines: boolean = $state(true);
    let path: Path2D | undefined;

    $effect(() => {
        canvasSheet.addEventListener("pointermove", pointermove);
        canvasSheet.addEventListener("pointerleave", pointerleave);
        canvasSheet.addEventListener("pointerup", pointerup);
        canvasSheet.addEventListener("contextmenu", (e) => e.preventDefault());
        ctxSheet = canvasSheet.getContext("2d")!;

        let rect = canvasSheet.getBoundingClientRect();
        canvasSheet.width = rect.width;
        canvasSheet.height = rect.height;

        if(tileSize.x && tileSize.y){
            path = undefined;
            console.log("reset path");
        }

        draw();
    });

    function pointermove(ev: PointerEvent) {
        //
    }
    function pointerleave(ev: PointerEvent) {
        //
    }
    function pointerup(ev: PointerEvent) {
        const pos = getPosFromPointerEvent(ev);
        const tilePos: Vector2 = {
            x: Math.floor(pos.x / tileSize.x),
            y: Math.floor(pos.y / tileSize.y),
        };
        if (TileAtlas.selectedTiles.size > 0) {
            const tile = Array.from(TileAtlas.selectedTiles.values())[0];
            sheet.setTile(tile, tilePos);
            selectedTile = tile;
        } else {
            const tile = sheet.getTile(tilePos);
            selectedTile = tile;
        }
        draw();
    }

    function getPosFromPointerEvent(ev: PointerEvent): Vector2 {
        const rect = canvasSheet.getBoundingClientRect();
        const pos: Vector2 = {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top,
        };
        return pos;
    }

    function draw() {
        ctxSheet.clearRect(0, 0, canvasSheet.width, canvasSheet.height);
        sheet.render(ctxSheet);
        ctxSheet.strokeStyle = "rgba(0, 0, 0, 0.5)";
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
        </fieldset>
    </fieldset>
    <canvas id="sheet-canvas" bind:this={canvasSheet}></canvas>
    {#if selectedTile}
        <div id="tile-info">
            {selectedTile.id}, {selectedTile.type}
        </div>
    {/if}
</div>

<style>
    #sheet-wrapper {
        height: 100%;
        width: 100%;
    }

    #sheet-canvas {
        height: 100%;
        width: 100%;
        border: 1px solid;
    }

    #tile-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
