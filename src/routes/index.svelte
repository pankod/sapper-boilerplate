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
    import { HelloWorld } from "@Components";
    import { imageUrl, imageTitle, copyright, photoOfTheDay } from "@Store";

    // #region props
    export let apod;
    // #endregion props

    const setCurrentImage = image => {
        imageUrl.set(image.url);
        imageTitle.set(image.title);
        copyright.set(image.copyright);
    };

    if (apod) {
        setCurrentImage(apod);
        photoOfTheDay.set(apod);
    }

    let searchTerm = "";

    const makeSearch = async () => {
        if (searchTerm) {
            PlanetaryService.Search(searchTerm)
                .then(result => {
                    //const images = result.collection.items;
                    console.log("result: ", result);
                })
                .catch(e => console.log("err: ", e));
        }
    };

    const showApod = () => {};
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

    .copyright {
        font-style: italic;
        font-size: 14px;
    }
</style>

<svelte:head>
    <title>Pankod Sapper Boilerplate</title>
</svelte:head>

<div class="home">
    <div class="logo" data-cy="PankodLogo">
        <img alt="logo" src="images/pankod-logo.png" />
    </div>
    <HelloWorld />
    <div class="planetary">

        <input type="text" bind:value={searchTerm} />
        <button on:click={makeSearch}>Search</button>
        <button on:click={showApod}>Photo of the Day</button>

        {#if $imageUrl}
            <img alt={$imageTitle} src={$imageUrl} data-cy="PlanetaryImage" />
            <p>
                {$imageTitle}
                <span class="copyright">{$copyright}</span>
            </p>
        {/if}
    </div>
</div>
