<script>
  import { Navigate } from 'svelte-router-spa'

  let emailAddress
  let schoolName

  function register(e) {
    e.preventDefault()
    console.log(e)
    console.log(`${emailAddress} ${schoolName}`)
  }
</script>

<div class="notification">
  <div class="columns">
    <div class="column">
      <div class="content">
        <h1>Easily Publish Your School Lunch Menus</h1>
        <p>
          We make it easy to publish weekly school lunch menus on the web and
          provide them to students and parents in a mobile friendly format.
        </p>
        <p>
          Just set the details and hit publish! Register and get started today.
        </p>
      </div>
    </div>

    <div class="column">
      <div class="content">
        <h3>Register Now</h3>

        <form on:submit="{register}">
          <label class="label">
            Email Address
            <input
              bind:value="{emailAddress}"
              class="input"
              placeholder="Enter your email address"
              type="text"
            />
          </label>

          <label class="label">
            School Name
            <input
              bind:value="{schoolName}"
              class="input"
              placeholder="Enter your school's name"
              type="text"
            />
          </label>

          <button type="submit" class="button is-link is-outlined">Go</button>
        </form>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="content" style="line-height: 30px;">
    <center>
      <span>Already registered?</span>
      <Navigate.default to="/admin/manage-menus">
        <button class="button is-small is-text">Log in</button>
      </Navigate.default>
    </center>
  </div>
</div>

<style>
  .label {
    display: block;
    margin-bottom: 1rem;
    line-height: 1.75;
  }
</style>
