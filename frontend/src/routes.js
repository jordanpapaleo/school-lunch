import AdminLayout from 'views/admin/AdminLayout.svelte'
import Callback from 'views/admin/Callback.svelte'
import Home from 'views/public/Home.svelte'
import LunchMenuAdmin from 'views/admin/LunchMenuAdmin.svelte'
import LunchMenuAdminDetails from 'views/admin/LunchMenuAdminDetails.svelte'
import LunchMenuView from 'views/public/LunchMenuView.svelte'
import PageNotFound from 'views/public/PageNotFound.svelte'

const routes = [
  { name: '/', component: Home },
  { name: '/callback', component: Callback },
  { name: '/lunch-menu', component: LunchMenuView },
  {
    name: '/admin/manage-menus',
    component: AdminLayout,
    nestedRoutes: [
      {
        name: 'index',
        component: LunchMenuAdmin,
      },
      {
        name: 'week-details/:id',
        component: LunchMenuAdminDetails,
      },
    ],
  },
  { name: '404', path: '404', component: PageNotFound },
]

export { routes }
