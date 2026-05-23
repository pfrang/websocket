// place files you want to import through the `$lib` alias in this folder.
//

export interface Message {
	user: string;
	data: string;
}

export class Socket {
	private socket: WebSocket;

	constructor(onMessage: (message: Message) => void) {
		this.socket = new WebSocket('ws://localhost:3000');
		this.socket.addEventListener('open', () => {
			console.log('WebSocket connection opened');
		});
		this.socket.addEventListener('close', () => {
			console.log('WebSocket connection closed');
		});
		this.socket.addEventListener('message', (event) => {
			onMessage(JSON.parse(event.data));
		});
	}

	sendMessage(message: Message) {
		this.socket.send(JSON.stringify(message));
	}
}
