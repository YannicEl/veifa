
import { drawLine } from './canvas';
import { Renderer } from './renderers';

export interface LineRendererConfig {}

export class LineRenderer implements Renderer {
	constructor(private config: LineRendererConfig = {}) {}

	render(ctx: CanvasRenderingContext2D, data: Float32Array): void {
		const { height } = ctx.canvas;
		ctx.lineWidth = 2;
		data.forEach((e, i) => {
			drawLine(ctx, i, height, i, Math.floor(height - height * e));
		});

		console.log('rendering done');
	}
}
