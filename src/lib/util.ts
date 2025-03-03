import type { Vector2 } from "./tiles";

interface DrawGridOverlayOptions {
    tileSize: Vector2,
    tileAmount: Vector2,
    tileGap: Vector2,
    style: string,
    lineWidth: number,
}
export function drawGridOverlay(ctx: CanvasRenderingContext2D, options?: Partial<DrawGridOverlayOptions>) {
    const opt: DrawGridOverlayOptions = { ...{ lineWidth: 1, style: "rgba(0, 0, 0, 1)", tileAmount: { x: 0, y: 0 }, tileGap: { x: 0, y: 0 }, tileSize: { x: 0, y: 0 } }, ...options }
    ctx.strokeStyle = opt.style;
    ctx.lineWidth = opt.lineWidth;
    const path = new Path2D();
    for (let y: number = 0; y < opt.tileAmount.y; y++) {
        for (let x: number = 0; x < opt.tileAmount.x; x++) {
            path.moveTo(x * opt.tileSize.x, y * opt.tileSize.y + opt.tileSize.y);
            path.lineTo(x * opt.tileSize.x, y * opt.tileSize.y);
            path.lineTo(x * opt.tileSize.x + opt.tileSize.x, y * opt.tileSize.y);
        }
    }
    path.moveTo(0, opt.tileAmount.y * opt.tileSize.y);
    path.lineTo(opt.tileAmount.x * opt.tileSize.x, opt.tileAmount.y * opt.tileSize.y);
    path.lineTo(opt.tileAmount.x * opt.tileSize.x, 0);
    ctx.stroke(path);
}

export function setCanvasSize(canvas: HTMLCanvasElement, wrapper: HTMLElement) {
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
}