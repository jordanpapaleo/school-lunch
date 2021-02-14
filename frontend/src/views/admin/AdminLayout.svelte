<script>
  import { Route } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import { user } from '../../stores.js'
  import createAuth0Client from '@auth0/auth0-spa-js'
  import auth0Config from '../../auth0-config'

  export let currentRoute

  let initialized = false
  let auth0

  // The onMount lifecycle function
  onMount(async () => {
    auth0 = await createAuth0Client(auth0Config)
    const authenticated = await auth0.isAuthenticated()

    if (!authenticated) {
      await auth0.loginWithRedirect({
        redirect_uri: `${window.location.origin}/callback`,
        appState: window.location.pathname,
      })
    } else {
    // Svelte stores are written to by calling set
      user.set({
        name: 'Test User',
        schoolName: 'Test School',
      })
      initialized = true
    }
  })

  const logout = () => {
    auth0.logout({
      returnTo: window.location.origin,
    })
  }
</script>

<div class="AdminLayout-component">
  <h4>Admin Layout</h4>

  {#if initialized}
    <button class="button is-light is-small" on:click="{logout}">
      logout
    </button>
    <Route.default {currentRoute} />
  {/if}
</div>
