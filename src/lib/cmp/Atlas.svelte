<script lang="ts">
    import type { TileAtlas } from "$lib/tiles";

    let { atlas = $bindable() }: { atlas: TileAtlas } = $props();

    let canvas: HTMLCanvasElement;

    $effect(() => {
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(atlas.img!, 0, 0);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.textAlign = "right";

        const tiles = atlas.createTiles(1);

        for (let tile of tiles) {
            let { x, y, dx, dy } = atlas.getTilePosition(tile);
            ctx.strokeRect(x, y, dx, dy);
            ctx.fillText(
                tile.id.toString(),
                x + dx - 1,
                y + dy - 1,
                dx,
            );
        }

        // for (
        //     let y: number = atlas.settings.startOffset.y;
        //     y < atlas.dimensions.y;
        //     y += atlas.settings.tileSize.y + atlas.settings.tileGap.y
        // ) {
        //     for (
        //         let x: number = atlas.settings.startOffset.x;
        //         x < atlas.dimensions.x;
        //         x += atlas.settings.tileSize.x + atlas.settings.tileGap.x
        //     ) {
        //         ctx.strokeRect(x, y, atlas.settings.tileSize.x, atlas.settings.tileSize.y);

        //         ctx.fillText(id.toString(), x + atlas.settings.tileSize.x - 1, y + atlas.settings.tileSize.y - 1, atlas.settings.tileSize.x);
        //         id++;
        //     }
        // }
    });
</script>

<div class="atlas-display">
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
            /></label
        >
    </fieldset>
    <canvas
        width={atlas.img!.naturalWidth}
        height={atlas.img!.naturalHeight}
        bind:this={canvas}
    ></canvas>
</div>
