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
    import { HelloWorld, PlanetaryImage } from "@Components";
    import { imageUrl, imageTitle, imageType, copyright, photoOfTheDay } from "@Store";
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
</script>

<style lang="scss">
    .home {
        padding: 60px 0;
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
        align-items: center;
        color: white;
        font-family: Arial;
    }

    .logo {
        margin-bottom: 50px;
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
    <PlanetaryImage {setCurrentImage} />
</div>
