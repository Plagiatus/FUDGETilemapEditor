<script lang="ts">
    import { TileAtlas } from "$lib/tiles";
    import Atlas from "./Atlas.svelte";

    let fileInput: HTMLInputElement;
    let { atlantes = $bindable([]), activeAtlas = $bindable() }: { atlantes: TileAtlas[], activeAtlas: TileAtlas | undefined } = $props();

    async function load(ev: Event) {
        if (!fileInput.files) return;
        for (let file of fileInput.files) {
            let imgData = await getImgData(file);
            let settings = $state({
                startOffset: { x: 0, y: 0 },
                tileGap: { x: 0, y: 0 },
                tileSize: { x: 16, y: 16 },
            });
            const atlas = new TileAtlas(
                imgData,
                settings,
                Math.random().toString(),
            );
            await atlas.loadImg();
            atlantes.push(atlas);
            activeAtlas = atlas;
        }
    }

    async function getImgData(file: File): Promise<string> {
        return new Promise<string>((resolve) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result as string);
            fr.readAsDataURL(file);
        });
    }

    function activate(atlas: TileAtlas) {
        activeAtlas = atlas;
    }
</script>

<input
    type="file"
    name="import"
    id="import"
    accept="image/png"
    onchange={load}
    bind:this={fileInput}
    multiple
/>

<div id="atlantes-wrapper">
    {#each atlantes as atlas}
        <Atlas {atlas} {activate} active={activeAtlas == atlas} />
    {/each}
</div>
