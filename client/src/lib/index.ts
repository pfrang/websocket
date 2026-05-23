// place files you want to import through the `$lib` alias in this folder.

export class WebSocket {
	private socket: WebSocket;

	constructor() {
		this.socket = new WebSocket('ws://localhost:8080');
	}
}
