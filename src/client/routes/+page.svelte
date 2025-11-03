<script lang="ts">
    let counter = $state(0);
    function increment() {
        counter += 1;
    }
</script>
<main>
    <h1>Hello from Svelte + NestJS</h1>
    <p>Counter: {counter}</p>
    <button onclick={increment}>Increment</button>
</main>
