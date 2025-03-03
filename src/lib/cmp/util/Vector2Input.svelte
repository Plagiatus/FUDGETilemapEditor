<script lang="ts">
    import type { Vector2 } from "$lib/tiles";
    import type { ChangeEventHandler } from "svelte/elements";

    let {
        legend,
        vector = $bindable({ x: 0, y: 0 }),
        change,
    }: {
        legend: string;
        vector: Vector2;
        change?: ChangeEventHandler<HTMLInputElement>;
    } = $props();
</script>

<fieldset>
    <legend>{legend}</legend>
    <label>
        width
        <input type="number" bind:value={vector.x} min="0" onchange={change} />
    </label>
    <label>
        height
        <input type="number" bind:value={vector.y} min="0" onchange={change} />
    </label>
</fieldset>

<style>
    input[type="number"] {
        width: 4em;
    }
    fieldset {
        border: 1px solid var(--color-outline);
    }
</style>
