<script context="module">
    import { Http } from "@Services";
    import { apod } from "@Store";

    export function preload({ params, query }) {
        return Http.Request("GET", "/api/planetary/apod", { api_key: true }, undefined)
            .then(result => {
                return { apodResult: result };
            })
            .catch(e => console.log(e));
    }
</script>

<script>
    import { HelloWorld } from "@Components";

    export let apodResult;
    apod.set(apodResult);
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

    .apod {
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
    <div class="apod">
        {#if $apod}
            <img alt={$apod.copyright} src={$apod.url} data-cy="ApodImage" />
            <p>
                {$apod.title}
                <span class="copyright">{$apod.copyright}</span>
            </p>
        {/if}
    </div>
</div>
