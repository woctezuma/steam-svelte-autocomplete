<script>
	import AutoComplete from "./SimpleAutocomplete.svelte";

	let proxy_url = "http://cors-anywhere.herokuapp.com/"
    let api_url = "https://damp-brushlands-51855.herokuapp.com"
    let gameID = "";
	let num_neighbors = "12";

	  async function searchSimilarAppsByID() {
		const url = `${proxy_url}${api_url}/similar_apps_from_id?id=${gameID}&n=${num_neighbors}`;
		const response = await fetch(url,
		{
			method: 'get',
			headers: { 'Origin': 'null' },
		});
		return await response.json();
	}

	let result;

    function submitHandler(e) {
        result = searchSimilarAppsByID();
    }

	let search_api_url = "https://arcane-springs-42307.herokuapp.com/find/"
	let n_search = 10;

    async function searchGameName(keyword) {
		const url = `${proxy_url}${search_api_url}?name=` + encodeURIComponent(keyword) + `&n=${n_search}`;
		const response = await fetch(url,
			{
				method: 'get',
				headers: { 'Origin': 'null' },
			});
		return await response.json();
	  }

    let gameName;

	let disabled = false;
	let showPlacehoder = true

	let image_ratio = 1.5
	let width = 292;
	let height = width*image_ratio;
</script>

<style>

</style>

<section class="section">
	<div class="container content">

        <AutoComplete
        searchFunction={searchGameName}
        bind:selectedItem={gameName}
        bind:value={gameID}
        labelFieldName="name"
		valueFieldName="id"
		maxItemsToShowInList="{n_search}"
		{disabled}
		showClear={false}
		hideArrow={true}
		placeholder={showPlacehoder ? 'Please select a game' : ''}		
		/>

        <button on:click|preventDefault={submitHandler}>Submit</button>

    </div>
    <div class="container content">

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

    </div>
</section>
