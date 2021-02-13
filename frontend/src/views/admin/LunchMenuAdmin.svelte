<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Icon from 'svelte-awesome'
  import { refresh, times } from 'svelte-awesome/icons'
  import { user } from '../../stores.js'

  const myDate = new Date().getTime()
  let lunchWeeks = []
  let loading = true
  let weekToDelete = null

  onMount(async () => {
    const res = await fetch(`${process.env.API_ROOT}/api/lunch-week`)
      .catch((err) => { console.log(err) })

    if (res.ok) {
      const data = await res.json()
      console.log('data', data)

      setTimeout(() => {
        loading = false
        if (res.ok) {
          lunchWeeks = data
        }
      }, 1500)
    }
  })

  const openLunchWeekDetails = (lunchWeekId) => {
    const route = `/admin/manage-menus/week-details/${lunchWeekId}`
    navigateTo(route)
  }

  const deleteLunchWeek = async (lunchWeekId) => {
    weekToDelete = null
    loading = true
    const res = await fetch(`${process.env.API_ROOT}/api/lunch-week/${lunchWeekId}`, {
      method: 'DELETE',
    })
      .catch((err) => { console.log(err) })

    if (res.ok) {
      lunchWeeks = lunchWeeks.filter((lunchWeek) => lunchWeek.lunchWeekId !== lunchWeekId)
    }

    loading = false
  }

  const verifyLunchWeekDelete = (lunchWeekId) => {
    weekToDelete = lunchWeekId
  }

  const cancelDeleteLunchWeek = () => (weekToDelete = null)
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
          <th></th>
          <th>Week Of</th>
          <th>Published</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each lunchWeeks as lunchWeek}
          <tr>
            <td>{lunchWeek.lunchWeekId}</td>
            <td class="clickable has-text-link" on:click="{openLunchWeekDetails(lunchWeek.lunchWeekId)}">
              {lunchWeek.weekOf}
            </td>
            <td>{lunchWeek.isPublished}</td>
            <td class="clickable has-text-grey-light" on:click="{verifyLunchWeekDelete(lunchWeek.lunchWeekId)}">
              <Icon data="{times}" />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <div class="{weekToDelete ? 'modal is-active' : 'modal'}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Warning</p>
        <button class="delete" on:click="{cancelDeleteLunchWeek}" aria-label="close"></button>
      </header>
      <section class="modal-card-body">Delete lunch week {weekToDelete}?</section>
      <footer class="modal-card-foot">
        <button class="button is-success" on:click="{deleteLunchWeek(weekToDelete)}">Continue</button>
        <button class="button" on:click="{cancelDeleteLunchWeek}">Cancel</button>
      </footer>
    </div>
  </div>
</div>

<style>
  .clickable {
    cursor: pointer;
  }
</style>
