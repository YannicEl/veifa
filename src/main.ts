import { Renderer } from './renderers';

export class Veifa {
	// audio stuff
	private audioContext: AudioContext;
	private audioBuffer: AudioBuffer;

	// player stuff
	private bufferSource: AudioBufferSourceNode;
	private playing = false;

	// canvas stuff
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private normalizedData: Float32Array;
	public renderer: Renderer;

	constructor(canvas: HTMLCanvasElement) {
		// This line is needed because safari has implemeted AudioContext as webkitAudioContext
		const AudioContext =
			window.AudioContext || (window as any).webkitAudioContext;

		if (AudioContext) {
			this.audioContext = new AudioContext();
		} else {
			throw new Error('AudioContext not supported in this browser');
		}

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		// set y to be in the middle of the canvas
		this.ctx.translate(0, this.canvas.offsetHeight / 2);
	}

	public loadSrc = async (src: string): Promise<void> => {
		try {
			// fetch and decode audio data
			const res = await fetch(src);
			const arrayBuffer = await res.arrayBuffer();
			this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

			// filter and normalize audio data
			const rawData = this.audioBuffer.getChannelData(0);
			this.normalizedData = this.filterAndNormalize(rawData);

			// TODO fire loaded event
			console.log('loading done');
		} catch (err) {
			console.error(err);
			throw new Error('Error during fetching or decoding');
		}
	};

	/**
	 * reduces dataset for performance reasons
	 * takes absolute value of all datapoints
	 *
	 * @param data Float32Array representing the audio data
	 * @returns Float32Array representing the filtered and normalized audio data
	 */
	public filterAndNormalize = (data: Float32Array): Float32Array => {
		const { width } = this.canvas;
		const compare = Math.floor(data.length / width);

		let filtered = data
			// redcue datasat to one datapoint per pixel
			.filter((e, i) => i % compare === 0)
			// cut the ending data points that are casued by roundign errors
			.slice(0, width)
			// take the absolute value of every datapoint
			.map((e) => Math.abs(e));

		return this.normalizeData(filtered);
	};

	/**
	 * normalied audio data
	 *
	 * @param data Float32Array representing the audio data
	 * @returns Float32Array representing the normalized audio data
	 */
	private normalizeData = (arr: Float32Array): Float32Array => {
		const multiplier = Math.pow(Math.max(...arr), -1);
		return arr.map((n) => n * multiplier);
	};

	/**
	 * takes the currently set renderer and renders the waveform
	 */
	public render = (): void => {
		this.renderer.render(this.ctx, this.normalizedData);
	};

	public play(): void {
		if (!this.playing) {
			this.bufferSource = this.audioContext.createBufferSource();
			this.bufferSource.buffer = this.audioBuffer;
			this.bufferSource.connect(this.audioContext.destination);
			this.bufferSource.start();
			this.playing = true;
		}
	}

	public pause(): void {
		if (this.playing) {
			this.bufferSource.stop();
			this.playing = false;
		}
	}

	public toggle(): void {
		if (this.playing) {
			this.pause();
		} else {
			this.play();
		}
	}
}
