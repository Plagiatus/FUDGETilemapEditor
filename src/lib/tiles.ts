export enum TILE_NEIGHBOR_RULE {
    UNSET,
    SAME,
    DIFFERENT,
}

export interface Vector2 {
    x: number, y: number,
}

export class TileAtlas {
    static existingIDs: Set<string> = new Set();
    #settings: TileImageSettings;
    #id: string;
    #src: string;
    #img?: HTMLImageElement;
    #imgLoading?: Promise<void>;
    #dimensions: Vector2 = { x: 0, y: 0 };
    #tileAmount: Vector2 = { x: 0, y: 0 };

    constructor(src: string, settings: Partial<TileImageSettings> = {}, id: string = src) {
        if (TileAtlas.existingIDs.has(id)) { throw Error("A Tile Atlas with this ID already exists.") }

        this.#src = src;
        this.#settings = { startOffset: { x: 0, y: 0 }, tileGap: { x: 0, y: 0 }, tileSize: { x: 16, y: 16 }, ...settings } as TileImageSettings;
        this.#id = id;
        this.loadImg();
    }

    async loadImg() {
        if (this.#imgLoading) return this.#imgLoading;
        const img = document.createElement("img");
        this.#imgLoading = new Promise<void>((resolve) => {
            img.addEventListener("load", () => {
                this.#dimensions = { x: img.naturalWidth, y: img.naturalHeight };
                resolve();
            })
        });
        img.src = this.#src;
        this.#img = img;
        return this.#imgLoading
    }

    get img() {
        return this.#img;
    }

    get src() {
        return this.#src;
    }
    get id() {
        return this.#id;
    }

    get dimensions() {
        return structuredClone(this.#dimensions);
    }

    get settings() {
        return this.#settings;
    }
    set settings(_settings: TileImageSettings) {
        this.#settings = _settings;
    }

    getTile(id: number) {

    }

    getTilePosition(index: number): { x: number, y: number, dx: number, dy: number };
    getTilePosition(tile: TileBasic): { x: number, y: number, dx: number, dy: number };
    getTilePosition(indexOrTile: number | TileBasic): { x: number, y: number, dx: number, dy: number } {
        let index = typeof indexOrTile === "number" ? indexOrTile : indexOrTile.indexInAtlas;
        return {
            x: this.#settings.startOffset.x + (this.#settings.tileSize.x + this.#settings.tileGap.x) * (index % this.#tileAmount.x),
            y: this.#settings.startOffset.y + (this.settings.tileSize.y + this.settings.tileGap.y) * Math.floor(index / this.#tileAmount.x),
            dx: this.#settings.tileSize.x,
            dy: this.#settings.tileSize.y,
        }
    }

    createTiles(startId: number): TileBasic[] {
        let atlasId: number = 0;
        const tiles: TileBasic[] = [];
        let countX = 0, countY = 0;
        for (let y: number = this.#settings.startOffset.y; y < this.#dimensions.y && y + this.#settings.tileSize.y <= this.#dimensions.y; y += this.#settings.tileSize.y + this.#settings.tileGap.y) {
            countX = 0;
            for (let x: number = this.#settings.startOffset.x; x < this.#dimensions.x && x + this.#settings.tileSize.x <= this.#dimensions.x; x += this.#settings.tileSize.x + this.#settings.tileGap.x) {
                tiles.push({
                    type: "basic",
                    id: startId++,
                    atlasId: this.#id,
                    indexInAtlas: atlasId++,
                    name: `${this.#id}_${atlasId}`,
                })
                countX++;
            }
            countY++;
        }
        this.#tileAmount.x = countX;
        this.#tileAmount.y = countY;
        return tiles;
    }
}

export interface TileImageSettings {
    startOffset: Vector2,
    tileGap: Vector2,
    tileSize: Vector2,
}

type Tile = TileRule | TileBasic;

export interface TileBase {
    type: string,
    id: number,
    name: string,
}

export interface TileBasic extends TileBase {
    type: "basic",
    atlasId: string,
    indexInAtlas: number,
}

export interface TileRule extends TileBase {
    type: "rule",
    default: TileBasic,
    rules: TileRuleRule[],
}

export interface TileRuleRule {
    neighborFilter: TILE_NEIGHBOR_RULE[],
    random?: TileBasic[]
}

type RenderMethod = <T extends TileBase>(ctx: CanvasRenderingContext2D, tile: T, row: number, col: number) => void;

export class TileMap {
    #mapSize: Vector2;
    #tileSize: Vector2;
    #tiles: number[];
    #tileIndex: Map<number, Tile> = new Map();
    #atlantes: Map<string, TileAtlas> = new Map();
    #renderMethods: Map<string, RenderMethod> = new Map();
    constructor(mapSize: Vector2, tileSize: Vector2, tiles: Tile[], atlates: TileAtlas[], tilesInMap: number[]) {
        this.#mapSize = mapSize;
        this.#tileSize = tileSize;
        this.#tiles = tilesInMap;

        tiles.forEach(t => {
            this.#tileIndex.set(t.id, t);
        });
        atlates.forEach(a => this.#atlantes.set(a.id, a));

        this.#renderMethods.set("basic", this.drawBasicTile)
    }

    async loadAtlantes() {
        const promises: Promise<void>[] = [];
        for (let atlas of this.#atlantes.values()) {
            promises.push(atlas.loadImg());
        }
        await Promise.all(promises);
    }

    public render(ctx: CanvasRenderingContext2D) {
        for (let col: number = 0; col < this.#mapSize.x; col++) {
            for (let row: number = 0; row < this.#mapSize.x; row++) {
                const tile = this.getTile(col, row);
                if (!tile) continue;
                if (tile.type == "basic") {
                    this.drawBasicTile(ctx, tile, row, col);
                }
                else if (tile.type === "rule") {

                }
            }

        }
    }

    getTile(column: number, row: number): Tile | undefined {
        return this.#tileIndex.get(this.#tiles[row * this.#mapSize.x + column]);
    }

    setTile(column: number, row: number, tile: Tile | number) {
        let index = typeof tile === "number" ? tile : tile.id;
        this.#tiles[row * this.#mapSize.x + column] = index;
    }


    private drawBasicTile(ctx: CanvasRenderingContext2D, tile: TileBasic, row: number, col: number) {
        const atlas = this.#atlantes.get(tile.atlasId)!;

        ctx.drawImage(
            atlas.img!,
            atlas.settings.startOffset.x + (atlas.settings.tileSize.x + atlas.settings.tileGap.x) * tile.indexInAtlas,
            atlas.settings.startOffset.y, // + atlas.settings.tileSize.y * atlas.settings.tileGap.y * Math.floor(tile.indexInAtlas / atlas),
            atlas.settings.tileSize.x,
            atlas.settings.tileSize.y,
            this.#tileSize.x * col,
            this.#tileSize.y * row,
            this.#tileSize.x,
            this.#tileSize.y,
        )
    }
}