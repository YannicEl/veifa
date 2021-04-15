import { LineRenderer } from './lineRenderer';
import { BarRenderer } from './barRenderer';

export interface Renderer {
	render(ctx: CanvasRenderingContext2D, data: Float32Array): void;
}

export { LineRenderer, BarRenderer };
