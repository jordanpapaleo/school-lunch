<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Icon from 'svelte-awesome'
  import { refresh } from 'svelte-awesome/icons'

  import { user } from '../../stores.js'
  const myDate = new Date().getTime()
  let lunchWeeks = []
  let loading = true

  onMount(async () => {
    const res = await fetch(`${process.env.API_ROOT}/api/lunchweek`)
    const data = await res.json()

    setTimeout(() => {
      loading = false
      if (res.ok) {
        lunchWeeks = data
      }
    }, 1500)
  })

  const openLunchWeekDetails = (lunchWeekId) => {
    const route = `/admin/manage-menus/week-details/${lunchWeekId}`
    console.log('route', route)
    navigateTo(route)
  }
</script>

<div>
  <h1>Lunch Menu Admin: {$user.schoolName}</h1>
  <h2>{myDate}</h2>

  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/admin/manage-menus">Lunch Menu Administration</a>
      </li>
      <li class="is-active">
        <a href="/#">{$user.schoolName}</a>
      </li>
    </ul>
  </nav>

  {#if loading}
    <Icon spin data="{refresh}" scale="3" />
  {:else}
    <table class="table">
      <thead>
        <tr>
          <th>Week Of</th>
          <th>Published</th>
        </tr>
      </thead>
      <tbody>
        {#each lunchWeeks as lunchWeek}
          <tr on:click="{openLunchWeekDetails(lunchWeek.id)}">
            <td>{lunchWeek.weekOf}</td>
            <td>{lunchWeek.isPublished}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  tr {
    cursor: pointer;
  }
</style>
