import { useRef, useEffect, useState } from 'react';
import { loadPlayer } from 'rtsp-relay/browser';

export default function App() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [streamUrl, setStreamUrl] = useState(
		'ws://localhost:2000/api/stream/1'
	);
	let player: Promise<any>;
	useEffect(() => {
		if (!canvas.current) throw new Error('Ref is null');
		console.log(streamUrl, '플레이어 로딩');
		player = loadPlayer({
			url: streamUrl,
			canvas: canvas.current,
			audio: false,
			disableGl: true,
			videoBufferSize: 10 * 1024 * 1024,
			onDisconnect: () => {
				console.log('Connection lost!');
			},
		});
	}, [streamUrl]);

	const handleStreamA = (url: string) => {
		player
			.then(function (result) {
				result.destroy();
			})
			.then(() => {
				setStreamUrl(url);
			});
	};

	return (
		<div>
			<div>
				<button
					onClick={() => handleStreamA('ws://localhost:2000/api/stream/1')}
				>
					Play Stream A
				</button>
				<button
					onClick={() => handleStreamA('ws://localhost:2000/api/stream/2')}
				>
					Play Stream B
				</button>
			</div>
			<canvas ref={canvas} style={{ width: '640px', height: '360px' }}></canvas>
		</div>
	);
}
