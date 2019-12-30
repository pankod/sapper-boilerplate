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

<style lang="scss">
    .planetary {
        margin-top: 70px;
        width: 315px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .description {
        width: 100%;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .copyright {
        font-style: italic;
        font-size: 14px;
    }

    .form {
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;

        input {
            width: 100%;
            padding-left: 5px;
            margin-right: 10px;
            border-radius: 5px;
        }

        div {
            width: 100%;
            display: flex;
        }
        div:first-child {
            justify-content: space-between;
            margin-bottom: 10px;
        }

        div:nth-child(2) {
            button {
                width: 100%;
            }
        }

        button {
            height: 23px;
            background-color: #f9da2e;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            padding: 3px 6px;
            font-weight: 700;
            color: #2c3e50;
        }
    }
</style>

<div class="planetary">
    <div class="form">
        <div>
            <input type="text" bind:value={keyword} data-cy="SearchInput" />
            <button on:click={makeSearch} data-cy="SearchButton">Search</button>
        </div>
        <div>
            <button on:click={showApod} data-cy="ApodButton">Photo of the Day</button>
        </div>
    </div>
    {#if notFound}
        <div>No results found for "{keyword}"</div>
    {:else if $imageUrl}
        <img alt={$imageTitle} src={$imageUrl} data-cy="PlanetaryImage" data-type={$imageType} />
        <div class="description">
            {$imageTitle}
            <span class="copyright">{$copyright}</span>
        </div>
    {/if}
</div>
