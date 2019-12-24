<script context="module">
    import { Http } from "@Services";

    export function preload({ params, query }) {
        return Http.Request("GET", "/planetary/apod", undefined, undefined)
            .then(response => {
                console.log("preload response: ", response);
            })
            .catch(e => console.log(e));
    }
</script>

<script>

</script>

<style>

</style>

<svelte:head>
    <title>Blog</title>
</svelte:head>
