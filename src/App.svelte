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

	let image_ratio = 1.5
	let width = 292;
	let height = width*image_ratio;

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

	let search_api_url = "https://arcane-springs-42307.herokuapp.com/find/"
	let n_search = 10;
	let selectedGameName;
	let gameID = "";

	async function searchGameName(keyword) {
		let search_url = `${proxy_url}${search_api_url}?name=` + encodeURIComponent(keyword) + `&n=${n_search}`;
		let search_response = await fetch(search_url,
			{
				method: 'get',
				headers: { 'Origin': 'null'},
			});
		let search_data = await search_response.json();
		return search_data;
	  }

	  async function searchSimilarAppsByID() {
		let url = `${proxy_url}${api_url}/similar_apps_from_id?id=${gameID}&n=${num_neighbors}`;
		let response = await fetch(url,
		{
			method: 'get',
			headers: { 'Origin': 'null'},
		});
		let data = await response.json();
		return data;
	}

    function submitHandlerByID(e) {
        result = searchSimilarAppsByID();
	}

</script>

<style>

</style>

<section class="section">
	<div class="container content">

	<AutoComplete
	searchFunction={searchGameName}
	bind:selectedItem={selectedGameName}
	bind:value={gameID}
	labelFieldName="name"
	valueFieldName="id"
	maxItemsToShowInList="{n_search}" />

	<button on:click|preventDefault={submitHandlerByID}>Submit</button>

</div>
</section>

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
	{#each value as game, i}
	<a href="{ game.link_url }">
		<img class="illustration" title="Match n°{i+1}: { game.name }"
			 alt = "{ game.name }" width="{width}" height="{height}"
			 src="{ game.steam_illustration_url }">
		</a>
	{/each}
	{:catch error}
	{error.message}
	{/await}
	{/if}

</section>
