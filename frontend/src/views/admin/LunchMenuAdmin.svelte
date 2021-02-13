<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Icon from 'svelte-awesome'
  import { refresh, times } from 'svelte-awesome/icons'
  import { user } from '../../stores.js'
  import Input from '../../components/Input.svelte'
  import Checkbox from '../../components/Checkbox.svelte'
  import { format } from 'date-fns'

  const myDate = new Date().getTime()
  let lunchWeeks = []
  let loading = true
  let weekToDelete = null
  let weekToCreate = ''
  let showCreate = false

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

  const createLunchWeek = async (date) => {
    const res = await fetch(`${process.env.API_ROOT}/api/lunch-week`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        weekOf: weekToCreate,
        isPublished: false,
      }),
    })
      .catch((err) => { console.log(err) })

    if (res.ok) {
      const data = await res.json()
      weekToCreate = ''
      showCreate = false
      lunchWeeks = lunchWeeks.concat(data)
    }
  }

  const handleChange = (e) => {
    weekToCreate = e.currentTarget.value
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

  const publishLunchWeek = (lunchWeekId) => async (e) => {
    const res = await fetch(`${process.env.API_ROOT}/api/lunch-week/${lunchWeekId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isPublished: e.currentTarget.checked,
      }),
    })
      .catch((err) => { console.log(err) })

    if (res.ok) {
      // lunchWeeks = lunchWeeks.filter((lunchWeek) => lunchWeek.lunchWeekId !== lunchWeekId)
    }
  }

  const cancelDeleteLunchWeek = () => (weekToDelete = null)
</script>

<div class="LunchMenuAdmin-component">
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
    <table class="table" style="width: 50%">
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
              {format(new Date(lunchWeek.weekOf), 'MMM dd,yyyy')}
            </td>
            <td>
              <Checkbox checked={lunchWeek.isPublished} on:change="{publishLunchWeek(lunchWeek.lunchWeekId)}" />
            </td>
            <td class="clickable has-text-grey-light" on:click="{verifyLunchWeekDelete(lunchWeek.lunchWeekId)}">
              <Icon data="{times}" />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <div style="width: 50%">
    {#if showCreate}
      <Input bind:weekToCreate on:change={handleChange} placeholder="mm/dd/yyyy" />
      <button class="button" on:click="{createLunchWeek}">Save</button>
      <button class="button" on:click="{() => {
        showCreate = false
        weekToCreate = ''
      }}">Cancel</button>
    {:else}
      <button class="button" on:click="{() => (showCreate = true)}" disabled={loading}>Create New</button>
    {/if}
  </div>

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

  :global(.LunchMenuAdmin-component .Input-component input) {
    margin-bottom: 1rem;
  }
</style>
