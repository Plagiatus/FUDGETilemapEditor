import { TILE_NEIGHBOR_RULE, TileRenderer, type TileBasic, type TileRule, type TileRuleRule, type TileSheet, type Vector2 } from "./tiles";
import { selectedTilesAtlas } from "$lib/stores";
import { get } from "svelte/store";

const UNSET = TILE_NEIGHBOR_RULE.UNSET;
const SAME = TILE_NEIGHBOR_RULE.SAME;
const DIFF = TILE_NEIGHBOR_RULE.DIFFERENT;

export function tryToCreateRuleTile(): TileRule | undefined {
    const tiles = get(selectedTilesAtlas);
    if (checkPresetTileset(20)) {
        // 4x4 + 4 tileset
        let rule = TileRenderer.newTile("rule") as TileRule;
        rule.default = tiles[1][1];
        let rules = $state(get20Rules(tiles));
        rule.rules = rules;
        return rule;
    }
    else if (checkPresetTileset(16)) {
        // 4x4 tileset
        let rule = TileRenderer.newTile("rule") as TileRule;
        rule.default = tiles[1][1];
        let rules = $state(get16Rules(tiles));
        rule.rules = rules;
        return rule;
    } else if (checkPresetTileset(9)) {
        // 3x3 tileset
        let rule = TileRenderer.newTile("rule") as TileRule;
        rule.default = tiles[1][1];
        let rules = $state(get9Rules(tiles));
        rule.rules = rules;
        return rule;
    }
    return;
}

function checkPresetTileset(type: 9 | 16 | 20 | 48): boolean {
    const tiles = get(selectedTilesAtlas);
    switch (type) {
        case 9: {
            if (tiles.length !== 3 || tiles[0].length !== 3) return false;
            return checkExistanceOfTiles(tiles, { start: { x: 0, y: 0 }, size: { x: 3, y: 3 } });
        }
        case 16: {
            if (tiles.length !== 4 || tiles[0].length !== 4) return false;
            return checkExistanceOfTiles(tiles, { start: { x: 0, y: 0 }, size: { x: 4, y: 4 } });
        }
        case 20: {
            if (tiles.length !== 4 || tiles[0].length !== 6) return false;
            return checkExistanceOfTiles(tiles,
                { start: { x: 0, y: 0 }, size: { x: 4, y: 4 } },
                { start: { x: 4, y: 0 }, size: { x: 2, y: 2 } });
        }
        case 48:
    }
    return false;
}

function checkExistanceOfTiles(tiles: TileBasic[][], ...areas: { start: Vector2, size: Vector2 }[]): boolean {
    for (let area of areas) {
        for (let y: number = area.start.y; y < area.start.y + area.size.y; y++) {
            for (let x: number = area.start.x; x < area.start.x + area.size.x; x++) {
                if (!tiles[y] || !tiles[y][x]) return false;
            }
        }
    }
    return true;
}

function get9Rules(tiles: TileBasic[][]): TileRuleRule[] {
    return [
        {
            tile: tiles[0][0],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                DIFF, UNSET, SAME,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[0][1],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                SAME, UNSET, SAME,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[0][2],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                SAME, UNSET, DIFF,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[1][0],
            neighborFilter: [
                UNSET, SAME, UNSET,
                DIFF, UNSET, SAME,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[1][1],
            neighborFilter: [
                UNSET, SAME, UNSET,
                SAME, UNSET, SAME,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[1][2],
            neighborFilter: [
                UNSET, SAME, UNSET,
                SAME, UNSET, DIFF,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[2][0],
            neighborFilter: [
                UNSET, SAME, UNSET,
                DIFF, UNSET, SAME,
                UNSET, DIFF, UNSET
            ],
        },
        {
            tile: tiles[2][1],
            neighborFilter: [
                UNSET, SAME, UNSET,
                SAME, UNSET, SAME,
                UNSET, DIFF, UNSET
            ],
        },
        {
            tile: tiles[2][2],
            neighborFilter: [
                UNSET, SAME, UNSET,
                SAME, UNSET, DIFF,
                UNSET, DIFF, UNSET
            ],
        },
    ]
}


function get16Rules(tiles: TileBasic[][]): TileRuleRule[] {
    return [
        // single tile
        {
            tile: tiles[3][3],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                DIFF, UNSET, DIFF,
                UNSET, DIFF, UNSET
            ],
        },
        // vertical pillar
        {
            tile: tiles[0][3],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                DIFF, UNSET, DIFF,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[1][3],
            neighborFilter: [
                UNSET, SAME, UNSET,
                DIFF, UNSET, DIFF,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[2][3],
            neighborFilter: [
                UNSET, SAME, UNSET,
                DIFF, UNSET, DIFF,
                UNSET, DIFF, UNSET
            ],
        },
        // horizontal pillar
        {
            tile: tiles[3][0],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                DIFF, UNSET, SAME,
                UNSET, DIFF, UNSET
            ],
        },
        {
            tile: tiles[3][1],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                SAME, UNSET, SAME,
                UNSET, DIFF, UNSET
            ],
        },
        {
            tile: tiles[3][2],
            neighborFilter: [
                UNSET, DIFF, UNSET,
                SAME, UNSET, DIFF,
                UNSET, DIFF, UNSET
            ],
        },
        ...get9Rules(tiles),
    ]
}

function get20Rules(tiles: TileBasic[][]): TileRuleRule[] {
    return [
        {
            tile: tiles[0][4],
            neighborFilter: [
                UNSET, SAME, UNSET,
                SAME, UNSET, SAME,
                UNSET, SAME, DIFF
            ],
        },
        {
            tile: tiles[0][5],
            neighborFilter: [
                UNSET, SAME, UNSET,
                SAME, UNSET, SAME,
                DIFF, SAME, UNSET
            ],
        },
        {
            tile: tiles[1][4],
            neighborFilter: [
                UNSET, SAME, DIFF,
                SAME, UNSET, SAME,
                UNSET, SAME, UNSET
            ],
        },
        {
            tile: tiles[1][5],
            neighborFilter: [
                DIFF, SAME, UNSET,
                SAME, UNSET, SAME,
                UNSET, SAME, UNSET
            ],
        },
        ...get16Rules(tiles),
    ]
}