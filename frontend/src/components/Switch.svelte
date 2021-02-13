<script>
  export let checked = false
</script>

<label class="Switch-component">
  <input type="checkbox" bind:checked on:change />
  <span class="slider round"></span>
</label>

<style>
  .Switch-component {
    --switch-radius: 34px;
    --slider-radius: 26px;
    --radius-fill: calc((var(--switch-radius) - var(--slider-radius)) / 2);

    display: inline-block;
    height: var(--switch-radius);
    position: relative;
    width: calc(var(--switch-radius) + var(--slider-radius));
  }

  .Switch-component input {
    height: 0;
    opacity: 0;
    width: 0;
  }

  .slider {
    background-color:var(--border-light);
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transition: var(--transition-duration);
    transition: var(--transition-duration);
  }

  .slider:before {
    background-color: var(--white);
    bottom: var(--radius-fill);
    content: "";
    height: var(--slider-radius);
    left: var(--radius-fill);
    position: absolute;
    width: var(--slider-radius);
    -webkit-transition: var(--transition-duration);
    transition: var(--transition-duration);
  }

  input:checked + .slider {
    background-color: var(--primary);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--primary);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(var(--slider-radius));
    transform: translateX(var(--slider-radius));
  }

  .slider.round {
    border-radius: var(--switch-radius);
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
