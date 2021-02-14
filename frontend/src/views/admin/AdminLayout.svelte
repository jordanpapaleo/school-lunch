<script>
  import { Route } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import { user } from '../../stores.js'

  export let currentRoute

  let initialized = false

  // The onMount lifecycle function
  onMount(() => {
    // Svelte stores are written to by calling set
    user.set({
      name: 'Test User',
      schoolName: 'Test School',
    })

    initialized = true
  })
</script>

<div class="AdminLayout-component">
  <h4>Admin Layout</h4>

  {#if initialized}
    <Route.default {currentRoute} />
  {/if}
</div>
