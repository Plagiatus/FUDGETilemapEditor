import type { Vector2 } from "./tiles";

export interface CanvasControllerEvent {
    pos: Vector2;
}
export interface CanvasControllerPointerEvent extends CanvasControllerEvent {
    event: PointerEvent;
}

export class CanvasController extends EventTarget {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    translation: Vector2 = { x: 0, y: 0 };
    scale: number = 1;
    scaleSettings = {
        factor: 2,
        min: 1 / 16,
        max: 16,
    }
    syncedCtx: Set<CanvasRenderingContext2D> = new Set();

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.installListeners();
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        this.syncedCtx.add(this.ctx);
    }

    private installListeners() {
        this.canvas.addEventListener("pointerdown", this.pointerdown);
        this.canvas.addEventListener("pointermove", this.pointermove);
        this.canvas.addEventListener("pointerup", this.pointerup);
        // this.canvas.addEventListener("pointerleave", this.pointerleave);
        this.canvas.addEventListener("wheel", this.zoom);
        this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    private pointerdown = (ev: PointerEvent) => {
        switch (ev.button) {
            case 0: { // left button
                
                break;
            }
            case 1: { // wheel button
                
                break;
            }
            case 2: { // right button
                
                break;
            }
        }
        this.dispatchEventFromEvent(ev);
        ev.preventDefault();
    }
    private pointermove = (ev: PointerEvent) => {
        ev.preventDefault();
        const buttons = this.getButtonsFromEvent(ev);
        if (buttons.includes(0)) {
            // left button
        }
        if (buttons.includes(1)) {
            // right button
        }
        if (buttons.includes(2)) {
            // middle button
            this.translation.x += ev.movementX;
            this.translation.y += ev.movementY;
            this.draw();
        }
        this.dispatchEventFromEvent(ev);
    }
    private pointerup = (ev: PointerEvent) => {
        this.dispatchEventFromEvent(ev);
        switch (ev.button) {
            case 0: { // left button
                break;
            }
            case 1: { // wheel button

                break;
            }
            case 2: { // right button

                break;
            }
        }
        ev.preventDefault();
    }
    private zoom = (ev: WheelEvent) => {
        ev.preventDefault();
        const pos = this.canvasPosFromMousePos({ x: ev.clientX, y: ev.clientY }, false);
        const direction = -Math.sign(ev.deltaY);
        const currentScale = this.scale;
        const newScale = Math.min(this.scaleSettings.max, Math.max(this.scaleSettings.min, this.scale * Math.pow(this.scaleSettings.factor, direction)));
        const scaleChange = newScale / currentScale;

        this.translation.x = pos.x + (this.translation.x - pos.x) * scaleChange;
        this.translation.y = pos.y + (this.translation.y - pos.y) * scaleChange;
        this.scale = newScale;

        this.draw();
    }

    private getButtonsFromEvent(ev: PointerEvent): number[] {
        const buttons: number[] = [];
        for (let i = 0; i < 5; i++) {
            if (Boolean(ev.buttons & (1 << i)))
                buttons.push(i);
        }
        return buttons;
    }

    private dispatchEventFromEvent(ev: PointerEvent) {
        const pos = this.canvasPosFromMousePos({x: ev.clientX, y: ev.clientY}, true);
        this.dispatchEvent(new CustomEvent<CanvasControllerPointerEvent>(ev.type, {detail: {pos, event: ev}}));
    }

    public canvasPosFromMousePos(pos: Vector2, includeTransform: boolean): Vector2 {
        const rect = this.canvas.getBoundingClientRect();
        const cPos: Vector2 = {
            x: pos.x - rect.left,
            y: pos.y - rect.top,
        };
        if (includeTransform) {
            cPos.x = (cPos.x - this.translation.x) / this.scale;
            cPos.y = (cPos.y - this.translation.y) / this.scale;
        }
        return cPos;
    }

    public draw() {
        for(let ctx of this.syncedCtx.values()){
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.reset();
            ctx.translate(this.translation.x, this.translation.y);
            ctx.scale(this.scale, this.scale);
        }
        this.dispatchEvent(new CustomEvent("draw"));
    }

    public reset() {
        this.scale = 1;
        this.translation.x = 0;
        this.translation.y = 0;
        this.draw();
    }

    public addCtxToSync(ctx: CanvasRenderingContext2D){
        this.syncedCtx.add(ctx);
    }
}