<script lang="ts">
    import type { TileMap } from "$lib/tiles";
    import { onMount } from "svelte";

    const { map }: { map: TileMap } = $props();
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    onMount(() => {
        ctx = canvas.getContext("2d")!;
    });
    $effect(()=>{
        map.render(ctx);
    })
</script>

<canvas bind:this={canvas} width="500" height="500"></canvas>
