import './style.css';

import { Wavy, LineRenderer } from '../dist';

window.onload = async () => {
	const cavnas = document.getElementById('canvas');
	const wavy = new Wavy(cavnas);

	const src = 'https://publicshitbucket.s3.eu-central-1.amazonaws.com/115.mp3';
	await wavy.loadSrc(src);

	wavy.renderer = new LineRenderer();
	wavy.render();

	const toggleButton = document.getElementById('toggle');
	toggleButton.onclick = () => wavy.toggle();

	const playButton = document.getElementById('play');
	playButton.onclick = () => wavy.play();

	const pauseButton = document.getElementById('pause');
	pauseButton.onclick = () => wavy.pause();
};
