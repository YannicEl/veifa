import { Renderer } from './renderers';

export interface BarRendererConfig {
	bars?: number;
	gap?: number;
}

export class BarRenderer implements Renderer {
	public config: BarRendererConfig = {
		bars: 20,
	};

	constructor(config: BarRendererConfig) {
		// override defaults if present
		this.config = { ...this.config, ...config };
	}

	render(ctx: CanvasRenderingContext2D, data: Float32Array): void {
		const { bars } = this.config;
		const { height, width } = ctx.canvas;

		const barWidth = Math.floor(width / bars);

		ctx.lineWidth = 2;
		ctx.clearRect(0, (height / 2) * -1, width, height);

		data
			.filter((e, i) => i % barWidth === 0)
			.forEach((e, i) => {
				const barHeight = Math.floor(height * e);
				ctx.fillRect(
					i * barWidth,
					Math.floor(barHeight / 2) * -1,
					barWidth,
					barHeight
				);
			});

		console.log('rendering done');
	}
}
