const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/login',
        component: () => import('src/pages/LoginPage.vue'),
        meta: { requiresAuth: false, requiresGuest: true },
      },
      {
        path: '/main',
        component: () => import('src/pages/MainPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/reservas',
        component: () => import('src/pages/ReservasPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/crearreserva',
        component: () => import('src/pages/CrearReservaPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/maintenance',
        component: () => import('src/pages/MantenimientoPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/airport',
        component: () => import('src/pages/AeropuertoPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  //
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
