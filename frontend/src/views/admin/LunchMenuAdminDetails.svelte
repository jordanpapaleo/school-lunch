<script>
  import { onMount } from 'svelte'
  import { format } from 'date-fns'
  import { refresh } from 'svelte-awesome/icons'
  import Icon from 'svelte-awesome'

  import { seedLunchDays } from '../../utils/lunchWeek.utils'
  import { user } from '../../stores.js'

  export let currentRoute
  const routeLunchWeekId = currentRoute.namedParams.id
  let lunchWeek = {}
  let loading = true
  let saving = false

  onMount(async () => {
    const res = await fetch(`${process.env.API_ROOT}/api/lunch-week/${routeLunchWeekId}`)
      .catch((err) => { console.log(err) })

    if (res.ok) {
      lunchWeek = await res.json()
      lunchWeek.lunchDays = seedLunchDays(lunchWeek)
    }

    loading = false
  })

  async function saveLunchDays() {
    saving = true

    for (let i = 0; i < lunchWeek.lunchDays.length; i++) {
      const lunchDay = lunchWeek.lunchDays[i]
      if (lunchDay.lunchDayId) {
        fetch(`${process.env.API_ROOT}/api/lunch-week/${routeLunchWeekId}/lunch-day/${lunchDay.lunchDayId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ menuDetails: lunchDay.menuDetails }),
        })
      } else {
        const res = await fetch(`${process.env.API_ROOT}/api/lunch-week/${routeLunchWeekId}/lunch-day`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lunchDay),
        })

        const data = await res.json()
        lunchDay.lunchDayId = data.lunchDayId
      }
    }
    saving = false
  }
</script>

<div class="LunchMenuAdminDetails-component">
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
    <section>
      <div class="buttons">
        <button class="button is-link is-small" on:click="{() => saveLunchDays()}">
          Save
        </button>
      </div>
    </section>
    <section>
      <div class="columns">
        {#each lunchWeek.lunchDays as lunchDay}
          <div class="column" data-id="id-{lunchDay.lunchDayId}">
            <div class="field">
              <label class="label">
                {format(new Date(lunchDay.day), 'EEE MM/dd/yyy')}
                <textarea class="textarea" rows="10" bind:value="{lunchDay.menuDetails}"></textarea>
              </label>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style></style>
