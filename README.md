# Steam Svelte Autocomplete

Auto-complete Steam game names with Svelte.

## Usage

```bash
npm install
npm run dev
```

## Deployment

Read the short documentation about [Github Pages][gh-pages].
Namely, you will have to:
-   create a branch `gh-pages`,
-   set it for deployment in the *settings* of your repository via Github's website.

Then:
```bash
npm install gh-pages --save-dev
```

And edit `package.json` to have the following, as in [this example][deployment-example]:
```json
"homepage": "https://woctezuma.github.io/",
"scripts": {
    "predeploy": "npm run build",
    "deploy": "npx gh-pages -d public/"
}
```

Finally:
```
npm run deploy
```

## References

-   data: [`steam-store-snapshots`][steam-data]
-   component: [`simple-svelte-autocomplete`][svelte-component], with [a demo][svelte-demo]

[gh-pages]: <https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
[deployment-example]: <https://github.com/magnobiet/svelte-gh-pages>
[steam-data]: <https://github.com/woctezuma/steam-store-snapshots>
[svelte-component]: <https://github.com/pstanoev/simple-svelte-autocomplete>
[svelte-demo]: <http://simple-svelte-autocomplete.surge.sh/>
