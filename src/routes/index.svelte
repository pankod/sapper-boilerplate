<script context="module">
    import { Http } from "@Services";

    export function preload({ params, query }) {
        return Http.Request("GET", "/api/planetary/apod", { api_key: true }, undefined)
            .then(apod => {
                return { apod };
            })
            .catch(e => console.log(e));
    }
</script>

<script>
    import { HelloWorld } from "@Components";

    export let apod;
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
    <div class="logo">
        <img alt="logo" src="images/pankod-logo.png" />
    </div>
    <HelloWorld />
    <div class="apod">
        <img alt={apod.copyright} src={apod.url} />
        <p>
            {apod.title}
            <span class="copyright">{apod.copyright}</span>
        </p>
    </div>
</div>
