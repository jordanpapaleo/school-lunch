<script>
  export let value
  export let label
  export let placeholder = 'Type here'
  export let type = 'text'
</script>

<label class="Input-component">
  {#if label}
    <div>{label}</div>
  {/if}
  <input bind:value on:change placeholder={placeholder} />
</label>

<style>
  input {
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
