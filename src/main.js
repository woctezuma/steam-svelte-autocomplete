import LocalApp from './LocalApp.svelte';
import RemoteApp from './RemoteApp.svelte';

const app = new RemoteApp({
	target: document.body,
});

export default app;