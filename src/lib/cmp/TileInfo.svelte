<script lang="ts">
    import { TileRenderer, type Tile } from "$lib/tiles";

    let { tile = $bindable() }: { tile: Tile } = $props();
    let type = $derived(tile.type);

    let canvasPreview: HTMLCanvasElement;

    $effect(() => {
        const ctxPreview = canvasPreview.getContext("2d")!;
        ctxPreview.imageSmoothingEnabled = false;
        ctxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
        TileRenderer.drawTile(
            tile,
            ctxPreview,
            { x: 0, y: 0 },
            { x: canvasPreview.width, y: canvasPreview.height },
        );
    });
</script>

<div class="tile-info">
    <div class="tile-base-info">
        <span class="tile-id">
            id: {tile.id}
        </span>
        <span class="tile-type">
            type: {tile.type}
        </span>
        <span class="tile-name">
            name: <input type="text" bind:value={tile.name} />
        </span>
        <div class="tile-preview">
            <canvas width="64" height="64" bind:this={canvasPreview}></canvas>
        </div>
    </div>
</div>

<style>
    .tile-info {
        padding: 1em;
        background-color: var(--color-2);
        border: 2px solid var(--color-3);
    }

    .tile-base-info {
        display: grid;
        gap: 5px;
        grid-template-areas: "id type preview" "name name preview";
    }

    .tile-id {
        grid-area: id;
    }
    .tile-type {
        grid-area: type;
        text-align: right;
    }
    .tile-name {
        grid-area: name;
    }
    .tile-preview {
        grid-area: preview;
    }
</style>
