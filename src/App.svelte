<script>
	import AutoComplete from "./SimpleAutocomplete.svelte";
	import { gameList } from "./game-list-sample.js";

	let gameName;
	let gameIndex = "";
	let result;

	let proxy_url = "http://cors-anywhere.herokuapp.com/"
	let api_url = "https://damp-brushlands-51855.herokuapp.com"
	let num_neighbors = "12";

	let disabled = false;
	let showPlacehoder = true

	async function searchSimilarApps() {
		let url = `${proxy_url}${api_url}/similar_apps?index=${gameIndex}&n=${num_neighbors}`;
		let response = await fetch(url,
		{
			method: 'get',
			headers: { 'Origin': 'null'},
		});
		let data = await response.json();
		return data;
	}

    function submitHandler(e) {
        result = searchSimilarApps();
    }
</script>

<style>

</style>

<section class="section">
	<div class="container content">

        <AutoComplete
          items={gameList}
          bind:selectedItem={gameName}
          bind:value={gameIndex}
          labelFieldName="name"
          valueFieldName="id"
          {disabled}
          showClear={false}
          hideArrow={true}
          placeholder={showPlacehoder ? 'Please select a game' : ''} />


    <button on:click|preventDefault={submitHandler}>Submit</button>

	</div>
	{#if result===undefined}
	<p></p>
	{:else}
	{#await result}
	<p>Loading...</p>
	{:then value}
	{value}
	{:catch error}
	{error.message}
	{/await}
	{/if}

</section>
