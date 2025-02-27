<script lang="ts">
    import {
        TILE_NEIGHBOR_RULE,
        TileAtlas,
        TileRenderer,
        type Tile,
        type TileBasic,
        type TileRule,
        type TileRuleRule,
        type Vector2,
    } from "$lib/tiles";
    import { onMount } from "svelte";
    import Atlas from "./Atlas.svelte";

    let { tile = $bindable() }: { tile: Tile } = $props();

    let canvasPreview: HTMLCanvasElement;
    let ctxPreview: CanvasRenderingContext2D;

    onMount(() => {
        ctxPreview = canvasPreview.getContext("2d")!;
        ctxPreview.imageSmoothingEnabled = false;
        ctxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    });
    $effect(() => {
        if (tile.type === "basic") drawDefaultTile(TileRenderer.drawTile, tile);
        else if (tile.type === "rule")
            drawDefaultTile(TileRenderer.drawTile, tile.default);
    });

    function drawDefaultTile(drawFunction: Function, tile: Tile) {
        ctxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
        const pos = { x: 0, y: 0 };
        const size = { x: canvasPreview.width, y: canvasPreview.height };
        drawFunction(tile, ctxPreview, pos, size);
    }

    function addRule() {
        const newRule: TileRuleRule = $state({
            neighborFilter: [
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
                TILE_NEIGHBOR_RULE.UNSET,
            ],
        });
        (tile as TileRule).rules.push(newRule);
    }

    function getFilterRuleButtonClass(rule: TILE_NEIGHBOR_RULE): string {
        if (rule === TILE_NEIGHBOR_RULE.SAME) return "same";
        if (rule === TILE_NEIGHBOR_RULE.DIFFERENT) return "different";
        return "none";
    }
    function nextFilterRule(ruleset: TILE_NEIGHBOR_RULE[], index: number) {
        ruleset[index] =
            (ruleset[index] + 1) %
            Object.keys(TILE_NEIGHBOR_RULE).filter((v) => isNaN(Number(v)))
                .length;
    }
    function updateRulesOrder(rule: TileRuleRule, direction: number) {
        if (tile.type !== "rule") return;
        let index = tile.rules.indexOf(rule);
        if (index < 0) return;
        tile.rules.splice(index + direction, 0, ...tile.rules.splice(index, 1));
    }

    function backgroundStyle(tile: TileBasic | undefined): string {
        if (!tile) return "";
        let atlas = TileRenderer.atlantes.get(tile.atlasId);
        if (!atlas) return "";
        let pos = atlas.getTilePosition(tile.indexInAtlas);
        let factor: Vector2 = {
            x: 50 / atlas.settings.tileSize.x,
            y: 50 / atlas.settings.tileSize.y,
        };

        return `background-image: url(${atlas.src}); background-position: -${pos.x * factor.x}px -${pos.y * factor.y}px; background-size: ${atlas.dimensions.x * factor.x}px ${atlas.dimensions.y * factor.y}px`;
    }

    function setRuleTile(rule: TileRuleRule) {
        if (TileAtlas.selectedTiles.length <= 0) return;
        let tile = TileAtlas.selectedTiles[0][0];
        if (!tile) return;
        rule.tile = tile;
    }
    function setRuleTileDefault() {
        if (tile.type !== "rule") return;
        if (TileAtlas.selectedTiles.length <= 0) return;
        let tileB = TileAtlas.selectedTiles[0][0];
        if (!tileB) return;
        tile.default = tileB;
        drawDefaultTile(TileRenderer.drawTile, tile.default);
    }
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
    {#if tile.type === "rule"}
        <button
            onclick={() => {
                setRuleTileDefault();
            }}>set tile</button
        >
        <div class="tile-rules">
            {#each tile.rules as rule, i (rule)}
                <div class="tile-rule">
                    <div class="tile-rule-order">
                        <button
                            disabled={i === 0}
                            onclick={() => {
                                updateRulesOrder(rule, -1);
                            }}>^</button
                        >
                        <button
                            disabled={i === tile.rules.length - 1}
                            onclick={() => {
                                updateRulesOrder(rule, 1);
                            }}>v</button
                        >
                    </div>
                    <div class="tile-rule-data">
                        <div
                            class="tile-rule-image"
                            style={backgroundStyle(rule.tile)}
                        ></div>
                        <button
                            onclick={() => {
                                setRuleTile(rule);
                            }}>set tile</button
                        >
                    </div>
                    <div class="tile-neighbors">
                        {#each rule.neighborFilter as filterRule, i}
                            <button
                                onclick={() =>
                                    nextFilterRule(rule.neighborFilter, i)}
                                style:grid-area={"b" + i}
                                class="tile-rule-button {getFilterRuleButtonClass(
                                    filterRule,
                                )}"
                                aria-label="change neighbor rule {i}"
                            >
                            </button>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
        <button onclick={addRule}>Add Rule</button>
    {/if}
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

    .tile-rule {
        border: 2px solid var(--color-3);
        padding: 5px;
        display: grid;
        grid-template-columns: auto 1fr auto;
    }

    .tile-rule-order {
        display: flex;
        flex-direction: column;
    }

    .tile-rule-image {
        width: 50px;
        height: 50px;
        image-rendering: crisp-edges;
        border: 1px solid var(--color-3);
    }

    .tile-neighbors {
        display: grid;
        grid-template-areas: "b0 b1 b2" "b3 x b4" "b5 b6 b7";
        grid-template-columns: repeat(3, 1em);
        grid-template-rows: repeat(3, 1em);
        gap: 1px;
    }
    .tile-rule-button {
        width: 1em;
        height: 1em;
        border: 1px solid var(--color-3);
        background: none;
    }
    .tile-rule-button.different {
        /* content: ❌; */
        background: red;
    }
    .tile-rule-button.same {
        background: green;
    }
    /* .tile-rule-button.none {
        background: white;
    } */
</style>
