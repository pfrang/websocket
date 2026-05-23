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
		<form>
			<input type="text" id="user" placeholder="Username" bind:value={user} />
			<button type="submit" onclick={() => connect()}>Connect</button>
		</form>
		<form>
			<input type="text" id="message" placeholder="Message" bind:value={message} />
			<button type="submit" onclick={sendMessage}>Send</button>
		</form>
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
