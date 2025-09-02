import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    // Verificar el estado de autenticación
    const isAuthenticated = !!LocalStorage.getItem('access_token')

    if (to.meta.requiresAuth && !isAuthenticated) {
      // Si la ruta requiere autenticación pero el usuario no está autenticado
      next('/login')
    } else if (to.meta.requiresGuest && isAuthenticated) {
      // Si la ruta requiere ser invitado pero el usuario está autenticado
      next('/main') // o '/dashboard' dependiendo de tu flujo
    } else {
      // Continuar normalmente
      next()
    }
  })

  return Router
})
