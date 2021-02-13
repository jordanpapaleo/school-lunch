<script>
  export let value
  export let options
  export let label
  export let placeholder
</script>

<label class="Select-component">
  {#if label}
    <div>{label}</div>
  {/if}

  <!-- svelte-ignore a11y-no-onchange -->
  <select bind:value on:change placeholder={placeholder || 'Select Option'}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</label>

<style>
  select {
    border-radius: 0.375rem;
    border: 1px solid var(--border-color);
    font-size: 1rem;
    height: 2.5rem;
    line-height: normal;
    min-width: 0px;
    outline: 0px;
    padding-bottom: 1px;
    padding-left: 1rem;
    padding-right: 2rem;
    position: relative;
    transition: all 0.2s ease 0s;
    width: 100%;
  }
</style>
