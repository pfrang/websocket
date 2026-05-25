<script lang="ts">
	import { Socket, type Message } from '$lib';

	let messages: Message[] = $state([]);
	let connection: Socket | null = $state(null);
	let user = $state('');

	let message = $state('');

	function onMessage(msg: Message) {
		console.log('Received message:', msg);
		messages.push(msg);
	}

	function connect() {
		connection = new Socket(onMessage);
	}

	function onSubmit(e: Event) {
		if (message.trim() === '') return;
		e.preventDefault();
		sendMessage();
		message = '';
	}

	function sendMessage() {
		const payload: Message = {
			user,
			data: message
		};
		messages.push(payload);

		if (connection) connection.sendMessage(payload);
	}
</script>

<section class="prose container mx-auto mt-10">
	<h1>Socket test</h1>
	{#if connection}
		<p class="text-green-500">Connected to server</p>
	{:else}
		<p class="text-red-500">Not connected</p>
	{/if}
	<div class="flex flex-col gap-4">
		{#if !connection}
			<form
				onsubmit={(e) => {
					e.preventDefault();
					connect();
				}}
			>
				<input required type="text" id="user" placeholder="Username" bind:value={user} />
				<button type="submit">Connect</button>
			</form>
		{:else}
			<p>Connected as <strong>{user}</strong></p>
			<form onsubmit={onSubmit}>
				<input required type="text" id="message" placeholder="Message" bind:value={message} />
				<button type="submit">Send</button>
			</form>
		{/if}
	</div>
	{#if messages.length > 0}
		<div class="mt-4">
			<h2>Messages:</h2>
			<ul>
				{#each messages as msg, i (i)}
					<li class="flex gap-2">
						<strong>{msg.user}</strong>
						<p>
							{msg.data}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</section>
