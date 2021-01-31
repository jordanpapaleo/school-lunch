import AdminLayout from 'views/admin/AdminLayout.svelte'
import Home from 'views/public/Home.svelte'
import LunchMenuAdmin from 'views/admin/LunchMenuAdmin.svelte'
import LunchMenuAdminDetails from 'views/admin/LunchMenuAdminDetails.svelte'
import LunchMenuView from 'views/public/LunchMenuView.svelte'

const routes = [
  { name: '/', component: Home },
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
]

export { routes }
