<script>
  import { user } from '../../stores.js'
  const myDate = new Date().getTime()
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
</div>
