<script lang="ts">
    import type { TileMap, Vector2 } from "$lib/tiles";
    import { onMount } from "svelte";
    import Vector2Input from "./util/Vector2Input.svelte";
    import { CanvasController } from "$lib/CanvasController";

    const { map }: { map: TileMap } = $props();
    let mapSize: Vector2 = $state({ x: 20, y: 20 });
    let tileSize: Vector2 = $state({ x: 16, y: 16 });
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let controller: CanvasController;
    
    onMount(() => {
        controller = new CanvasController(canvas);
        controller.addEventListener("draw", draw);
        
        ctx = canvas.getContext("2d")!;
    });

    function draw(){
        map.render(ctx);
    }

    function updateMap(){
        controller.draw();
    }
</script>

<div id="map-display">
    <div class="map-display-settings">
        <Vector2Input legend="Map Size" bind:vector={mapSize} change={updateMap}/>
        <Vector2Input legend="Tile Size" bind:vector={tileSize} change={updateMap}/>
    </div>
    <canvas bind:this={canvas} width="500" height="500"></canvas>
</div>
