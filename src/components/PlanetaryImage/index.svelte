<script>
    // #region Imports
    import {
        imageUrl,
        imageTitle,
        imageType,
        copyright,
        photoOfTheDay,
        searchTerm,
        searchResults,
    } from "@Store";
    import { PlanetaryService } from "@Services";
    // #endregion Imports

    // #region Props
    export let setCurrentImage;
    // #endregion Props

    let keyword = "";
    let notFound = false;

    const showApod = () => {
        keyword = "";
        notFound = false;
        setCurrentImage($photoOfTheDay);
    };

    const makeSearch = async () => {
        if (keyword) {
            if (keyword === $searchTerm && $searchResults.length) {
                showRandomResult($searchResults);
            } else {
                searchTerm.set(keyword);
                PlanetaryService.Search(keyword)
                    .then(result => {
                        const items = result.collection.items.filter(
                            i => i.data[0].media_type === "image",
                        );

                        if (items.length) {
                            notFound = false;
                            showRandomResult(items);
                            searchResults.set(items);
                        } else {
                            notFound = true;
                        }
                    })
                    .catch(e => console.log("err: ", e));
            }
        } else {
            showApod();
        }
    };

    const showRandomResult = items => {
        const randomIndex = Math.round(Math.random() * items.length);
        const randomItem = items[randomIndex];
        const { photographer, secondary_creator, title } = randomItem.data[0];
        const image = {
            url: randomItem.links[0].href,
            title,
            copyright: photographer || secondary_creator || "",
            type: "search",
        };

        setCurrentImage(image);
    };
</script>

<style src="./style.scss">

</style>

<div class="planetary">
    <div class="planetary__form">
        <div>
            <input type="text" bind:value={keyword} data-cy="SearchInput" />
            <button on:click={makeSearch} data-cy="SearchButton">Search</button>
        </div>
        <div>
            <button on:click={showApod} data-cy="ApodButton">Photo of the Day</button>
        </div>
    </div>
    {#if notFound}
        <div data-cy="StatusMessage">No results found for "{keyword}"</div>
    {:else if $imageUrl}
        <img alt={$imageTitle} src={$imageUrl} data-cy="PlanetaryImage" data-type={$imageType} />
        <div class="planetary__description">
            {$imageTitle}
            <span class="planetary__description__copyright">{$copyright}</span>
        </div>
    {/if}
</div>
