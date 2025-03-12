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
    #tiles: TileBasic[] | undefined;

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

    get tileAmount() {
        return structuredClone(this.#tileAmount);
    }

    get settings() {
        return this.#settings;
    }
    set settings(_settings: TileImageSettings) {
        this.#settings = _settings;
    }

    getTile(id: number) {

    }

    getTilePosition(index: number): { x: number, y: number, w: number, h: number };
    getTilePosition(tile: TileBasic): { x: number, y: number, w: number, h: number };
    getTilePosition(indexOrTile: number | TileBasic): { x: number, y: number, w: number, h: number } {
        let index = typeof indexOrTile === "number" ? indexOrTile : indexOrTile.indexInAtlas;
        return {
            x: this.#settings.startOffset.x + (this.#settings.tileSize.x + this.#settings.tileGap.x) * (index % this.#tileAmount.x),
            y: this.#settings.startOffset.y + (this.settings.tileSize.y + this.settings.tileGap.y) * Math.floor(index / this.#tileAmount.x),
            w: this.#settings.tileSize.x,
            h: this.#settings.tileSize.y,
        }
    }

    createTiles(): TileBasic[] {
        if (this.#settings.tileSize.x < 1 || this.#settings.tileSize.y < 1) return [];
        let startId: number = 0;
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
        this.#tiles = [...tiles];
        return tiles;
    }

    getTiles(): TileBasic[] {
        if (!this.#tiles) this.createTiles();
        return this.#tiles!;
    }

    serialize(): any {
        return {
            src: this.#src,
            id: this.#id,
            settings: this.#settings,
        }
    }

    static deserialize(obj: any) {
        return new TileAtlas(obj.src, obj.settings, obj.id);
    }
}

export interface TileImageSettings {
    startOffset: Vector2,
    tileGap: Vector2,
    tileSize: Vector2,
}

export type Tile = TileRule | TileBasic;

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
    tile?: TileBasic,
    random?: TileBasic[]
}

export class TileSheet {
    #tiles: (Tile | undefined)[][] = [];
    #mapSize: Vector2 = { x: 20, y: 20 };
    #tileSize: Vector2 = { x: 64, y: 64 };

    constructor(mapSize: Vector2, tileSize: Vector2) {
        this.mapSize = mapSize;
        this.tileSize = tileSize;
    }

    get mapSize() {
        return this.#mapSize;
    }
    set mapSize(size: Vector2) {
        this.#mapSize = size;
    }
    get tileSize() {
        return this.#tileSize;
    }
    set tileSize(size: Vector2) {
        this.#tileSize = size;
    }

    setTile(tile: Tile | undefined, pos: Vector2) {
        if (!this.#tiles[pos.y]) {
            this.#tiles[pos.y] = [];
        }
        this.#tiles[pos.y][pos.x] = tile;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.imageSmoothingEnabled = false;
        for (let y: number = 0; y < this.#mapSize.y; y++) {
            for (let x: number = 0; x < this.#mapSize.x; x++) {
                const tile = this.getTile({ x, y });
                if (!tile) continue;
                const pos = { x: this.#tileSize.x * x, y: this.#tileSize.y * y };
                if (tile.type === "basic") {
                    TileMap.drawTile(tile, ctx, pos, this.#tileSize);
                }
                else if (tile.type === "rule") {
                    TileMap.drawTile(tile.default, ctx, pos, this.#tileSize);
                    this.drawRuleOverlay(ctx, pos, this.#tileSize);
                }
            }
        }
    }

    getTile(pos: Vector2): Tile | undefined {
        return this.#tiles[pos.y]?.[pos.x];
    }

    private drawRuleOverlay(ctx: CanvasRenderingContext2D, pos: Vector2, size: Vector2) {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.font = `bold ${size.y * 0.8}px sans-serif`;
        ctx.strokeText("⚙", pos.x + 1, pos.y + size.y - 1, size.x);
        ctx.fillText("⚙", pos.x + 1, pos.y + size.y - 1, size.x);
    }
}

type RenderMethod = <T extends TileBase>(ctx: CanvasRenderingContext2D, tile: T, row: number, col: number) => void;

export class TileMap {
    static #atlantes: Map<string, TileAtlas> = new Map();
    static #tileIndex: Map<number, Tile> = new Map();

    #mapSize: Vector2;
    #tileSize: Vector2;
    #tiles: Tile[];
    constructor(mapSize: Vector2, tileSize: Vector2, tilesInMap: (Tile | number)[]) {
        this.#mapSize = mapSize;
        this.#tileSize = tileSize;
        this.#tiles = tilesInMap.map(tim => {
            if (typeof tim === "number") {
                return TileMap.getTile(tim)!;
            }
            return tim;
        });
    }

    protected static recalculateTileIds() {
        let tileNumber = 1;
        const newTileIndex: Map<number, Tile> = new Map();
        for (let atlas of this.#atlantes.values()) {
            const tiles = atlas.getTiles();
            tiles.forEach(t => {
                t.id = tileNumber++;
                newTileIndex.set(t.id, t);
            });
        }
        for (let tile of this.#tileIndex.values()) {
            if (tile.type !== "basic") {
                if (tile.type === "rule") {
                    if (!tile.default && tile.rules.length === 0) continue;
                }
                tile.id = newTileIndex.size + 1;
                newTileIndex.set(tile.id, tile);
            }
        }
        this.#tileIndex = newTileIndex;
    }

    protected static drawBasicTile = (t: TileBasic, ctx: CanvasRenderingContext2D, pos: Vector2, size: Vector2) => {
        const atlas = this.#atlantes.get(t.atlasId);
        if (!atlas) {
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.font = `bold ${size.y * 0.8}px sans-serif`;
            ctx.fillText("!", pos.x + 0.5 * size.x, pos.y + size.y * 0.8, size.x);
            console.error(`Atlas "${t.atlasId}" not found.`);
            return;
        }
        let { x, y, w, h } = atlas.getTilePosition(t.indexInAtlas);

        ctx.drawImage(
            atlas.img!,
            x,
            y,
            w,
            h,
            pos.x,
            pos.y,
            size.x,
            size.y,
        )
    }

    protected static exportSpecialTiles(): Object[] {
        const tiles: Object[] = [];
        for (let tile of this.#tileIndex.values()) {
            if (tile.type === "basic") continue;
            if (tile.type === "rule") {
                tiles.push({
                    type: tile.type,
                    default: tile.default.id,
                    id: tile.id,
                    name: tile.name,
                    rules: tile.rules.map(rule => {
                        return {
                            neighborFilter: rule.neighborFilter,
                            tile: rule.tile?.id,
                            //TODO add randomized tile list
                        }
                    })
                })
            }
        }
        return tiles;
    }


    public static addAtlas(atlas: TileAtlas) {
        this.#atlantes.set(atlas.id, atlas);
        this.recalculateTileIds();
    }

    public static setAtlantes(atlantes: TileAtlas[]) {
        this.#atlantes.clear();
        for (const atlas of atlantes) {
            this.#atlantes.set(atlas.id, atlas);
        }
        this.recalculateTileIds();
    }

    public static getAtlas(id: string): TileAtlas | undefined {
        return this.#atlantes.get(id);
    }

    public static getTile(id: number): Tile | undefined {
        return this.#tileIndex.get(id);
    }

    public static drawTile = (t: TileBasic, ctx: CanvasRenderingContext2D, pos: Vector2, size: Vector2) => {
        if (!t) return;
        this.drawBasicTile(t, ctx, pos, size);
    }


    public static addTile(tile: Tile) {
        this.#tileIndex.set(tile.id, tile);
    }

    public static createTile(type: "rule", name: string = ""): Tile {
        // this.recalculateTileIds();
        let id: number = this.#tileIndex.size || 1;
        while (this.#tileIndex.has(id)) {
            id++;
        }

        let tile: Tile = {
            type,
            default: undefined!,
            id,
            name,
            rules: [],
        }
        this.addTile(tile);
        return tile;
    }

    set tileSize(tileSize: Vector2) {
        this.#tileSize = tileSize;
    }
    set mapSize(mapSize: Vector2) {
        this.#mapSize = mapSize;
    }

    protected getTileToDrawFromRuleTile(t: TileRule, pos: Vector2): TileBasic {
        outer: for (let rule of t.rules) {
            const ruleLength = Math.sqrt(rule.neighborFilter.length);
            const ruleLengthHalf = Math.floor(ruleLength / 2);
            for (let y: number = 0; y < ruleLength; y++) {
                for (let x: number = 0; x < ruleLength; x++) {
                    let ruleCompliant = this.checkRule(rule.neighborFilter[y * ruleLength + x], { x: pos.x + x - ruleLengthHalf, y: pos.y + y - ruleLengthHalf }, t.id);
                    if (!ruleCompliant) continue outer;
                }
            }
            return rule.tile!;
        }

        return t.default;

    }
    protected checkRule(rule: TILE_NEIGHBOR_RULE, pos: Vector2, id: number): boolean {
        if (rule === TILE_NEIGHBOR_RULE.UNSET) return true;
        const neighbor = this.getTileAt(pos.x, pos.y);
        if (rule === TILE_NEIGHBOR_RULE.SAME && neighbor && neighbor.id === id) return true;
        if (rule === TILE_NEIGHBOR_RULE.DIFFERENT && (!neighbor || neighbor.id !== id)) return true;
        return false;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.imageSmoothingEnabled = false;
        for (let col: number = 0; col < this.#mapSize.x; col++) {
            for (let row: number = 0; row < this.#mapSize.y; row++) {
                let tile = this.getTileAt(col, row);
                if (!tile) continue;
                if (tile.type === "rule") {
                    tile = this.getTileToDrawFromRuleTile(tile, { x: col, y: row })
                }
                TileMap.drawTile(tile, ctx, { x: this.#tileSize.x * col, y: this.#tileSize.y * row }, this.#tileSize);
            }

        }
    }

    public getTileAt(column: number, row: number): Tile | undefined {
        return this.#tiles[row * this.#mapSize.x + column];
    }

    public setTileAt(column: number, row: number, tile: Tile) {
        this.#tiles[row * this.#mapSize.x + column] = tile;
    }

    public reset() {
        this.#tiles = [];
    }

    public serialize(): any {
        TileMap.recalculateTileIds();
        const obj: any = {};
        obj.map = {
            mapSize: this.#mapSize,
            tileSize: this.#tileSize,
            tiles: this.#tiles.map(t => t?.id),
        }
        obj.atlantes = [];
        TileMap.#atlantes.values().forEach(a => {
            obj.atlantes.push(a.serialize());
        });
        obj.tiles = TileMap.exportSpecialTiles();

        return obj;
    }

    public static async deserialize(obj: any): Promise<TileMap> {
        const atlantes: TileAtlas[] = obj.atlantes.map((a: any) => TileAtlas.deserialize(a));
        await Promise.all(atlantes.map(a => a.loadImg()));
        TileMap.setAtlantes(atlantes);
        obj.tiles.forEach((tile: any) => {
            if(tile.type === "rule") {
                const importedTile: TileRule = {
                    type: "rule",
                    default: TileMap.getTile(tile.default) as TileBasic,
                    id: tile.id,
                    name: tile.name,
                    rules: tile.rules.map((r: any) => {
                        let rule: TileRuleRule = {
                            neighborFilter: r.neighborFilter,
                            tile: TileMap.getTile(r.tile) as TileBasic,
                        }
                        return rule;
                    })
                }
                TileMap.addTile(importedTile);
            }
        });
        return new TileMap(obj.map.mapSize, obj.map.tileSize, obj.map.tiles);
    }


}