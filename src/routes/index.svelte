<script context="module">
    import { PlanetaryService } from "@Services";

    export function preload({ params, query }) {
        return PlanetaryService.GetApod()
            .then(apod => {
                return { apod };
            })
            .catch(e => console.log(e));
    }
</script>

<script>
    // #region Imports
    import { HelloWorld } from "@Components";
    import {
        imageUrl,
        imageTitle,
        imageType,
        copyright,
        photoOfTheDay,
        searchResults,
        searchTerm,
    } from "@Store";
    // #endregion Imports

    // #region Props
    export let apod;
    // #endregion Props

    const setCurrentImage = image => {
        imageUrl.set(image.url);
        imageTitle.set(image.title);
        imageType.set(image.type);
        copyright.set(image.copyright);
    };

    if (apod && apod.url) {
        apod.type = "apod";
        photoOfTheDay.set(apod);
        setCurrentImage(apod);
    }

    let keyword = "";

    const showApod = () => {
        keyword = "";
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
                        showRandomResult(items);
                        searchResults.set(items);
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

<style>
    .home {
        padding: 100px 0;
        width: 100vw;
        min-height: 100vh;
        background: radial-gradient(
            circle,
            rgba(48, 65, 82, 1) 0%,
            rgba(44, 62, 80, 1) 26%,
            rgba(21, 35, 50, 1) 100%
        );
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        color: white;
    }

    .logo {
        margin-bottom: 100px;
    }

    .planetary {
        margin-top: 100px;
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
    }

    .copyright {
        font-style: italic;
        font-size: 14px;
    }

    .form {
        width: 100%;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
    }
</style>

<svelte:head>
    <title>Pankod Sapper Boilerplate</title>
</svelte:head>

<div class="home">
    <div class="logo">
        <img alt="logo" src="images/pankod-logo.png" data-cy="PankodLogo" />
    </div>
    <HelloWorld />
    <div class="planetary">
        <div class="form">
            <input type="text" bind:value={keyword} data-cy="SearchInput" />
            <button on:click={makeSearch} data-cy="SearchButton">Search</button>
            <button on:click={showApod} data-cy="ApodButton">Photo of the Day</button>
        </div>
        {#if $imageUrl}
            <img
                alt={$imageTitle}
                src={$imageUrl}
                data-cy="PlanetaryImage"
                data-type={$imageType} />
            <div class="description">
                {$imageTitle}
                <span class="copyright">{$copyright}</span>
            </div>
        {/if}
    </div>
</div>
