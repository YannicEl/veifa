import './style.css';

import { Veifa, LineRenderer, BarRenderer } from '../dist';

window.onload = async () => {
	const cavnas = document.getElementById('canvas');
	const veifa = new Veifa(cavnas);

	const src = 'https://publicshitbucket.s3.eu-central-1.amazonaws.com/115.mp3';
	await veifa.loadSrc(src);

	// veifa.renderer = new LineRenderer();
	const barRenderer = new BarRenderer({ bars: 10 });
	veifa.renderer = barRenderer;
	veifa.render();

	const toggleButton = document.getElementById('toggle');
	toggleButton.onclick = () => veifa.toggle();

	const playButton = document.getElementById('play');
	playButton.onclick = () => veifa.play();

	const pauseButton = document.getElementById('pause');
	pauseButton.onclick = () => veifa.pause();

	const slider = document.getElementById('slider');
	slider.oninput = (event) => {
		const value = event.target.value;
		barRenderer.config.bars = value;
		veifa.render();
	};
};
