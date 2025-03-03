import { TILE_NEIGHBOR_RULE, TileAtlas, TileRenderer, type TileRule, type TileSheet } from "./tiles";
const UNSET = TILE_NEIGHBOR_RULE.UNSET;
const SAME = TILE_NEIGHBOR_RULE.SAME;
const DIFF = TILE_NEIGHBOR_RULE.DIFFERENT;

export function tryToCreateRuleTile(sheet: TileSheet): TileRule | undefined {
    const tiles = TileAtlas.selectedTiles;
    if (checkPresetTileset(9)) {
        // 3x3 tileset
        let rule = TileRenderer.newTile("rule") as TileRule;
        rule.default = tiles[1][1];
        rule.rules = [
            {
                tile: tiles[0][0],
                neighborFilter: [
                    UNSET, DIFF, UNSET,
                    DIFF, SAME,
                    UNSET, SAME, UNSET
                ],
            },
            {
                tile: tiles[0][1],
                neighborFilter: [
                    UNSET, DIFF, UNSET,
                    SAME, SAME,
                    UNSET, SAME, UNSET
                ],
            },
            {
                tile: tiles[0][2],
                neighborFilter: [
                    UNSET, DIFF, UNSET,
                    SAME, SAME,
                    UNSET, SAME, UNSET
                ],
            },
            {
                tile: tiles[1][0],
                neighborFilter: [
                    UNSET, SAME, UNSET,
                    DIFF, SAME,
                    UNSET, SAME, UNSET
                ],
            },
            {
                tile: tiles[1][1],
                neighborFilter: [
                    UNSET, SAME, UNSET,
                    SAME, SAME,
                    UNSET, SAME, UNSET
                ],
            },
            {
                tile: tiles[1][2],
                neighborFilter: [
                    UNSET, SAME, UNSET,
                    SAME, DIFF,
                    UNSET, SAME, UNSET
                ],
            },
            {
                tile: tiles[2][0],
                neighborFilter: [
                    UNSET, SAME, UNSET,
                    DIFF, SAME,
                    UNSET, DIFF, UNSET
                ],
            },
            {
                tile: tiles[2][1],
                neighborFilter: [
                    UNSET, SAME, UNSET,
                    SAME, SAME,
                    UNSET, DIFF, UNSET
                ],
            },
            {
                tile: tiles[2][2],
                neighborFilter: [
                    UNSET, SAME, UNSET,
                    SAME, DIFF,
                    UNSET, DIFF, UNSET
                ],
            },
        ];
        return rule;
    } else if (checkPresetTileset(16)) {
        // 4x4 tileset
    } else if (checkPresetTileset(20)) {
        // 4x4 + 4 tileset
    }
    return;
}

function checkPresetTileset(type: 9 | 16 | 20 | 48): boolean {
    switch (type) {
        case 9: {
            if (
                TileAtlas.selectedTiles.length !== 3 ||
                TileAtlas.selectedTiles[0].length !== 3
            )
                return false;
            for (let y: number = 0; y < 3; y++) {
                for (let x: number = 0; x < 3; x++) {
                    if (
                        !TileAtlas.selectedTiles[y] ||
                        !TileAtlas.selectedTiles[y][x]
                    )
                        return false;
                }
            }
            return true;
        }
        case 16: {
            if (
                TileAtlas.selectedTiles.length !== 4 ||
                TileAtlas.selectedTiles[0].length !== 4
            )
                return false;
            for (let y: number = 0; y < 4; y++) {
                for (let x: number = 0; x < 4; x++) {
                    if (
                        !TileAtlas.selectedTiles[y] ||
                        !TileAtlas.selectedTiles[y][x]
                    )
                        return false;
                }
            }
            return true;
        }
        case 20:
        case 48:
    }
    return false;
}