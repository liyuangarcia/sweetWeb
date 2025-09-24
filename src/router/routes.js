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
        props: {
          isEditing: false,
        },
      },
      {
        path: '/maintenance/:tabName/:exItem',
        component: () => import('src/pages/MantenimientoPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/airport',
        component: () => import('src/pages/AeropuertoPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editairport/:slug',
        component: () => import('src/pages/AeropuertoPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/guia',
        component: () => import('src/pages/GuiaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editguia/:slug',
        component: () => import('src/pages/GuiaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/destpesca',
        component: () => import('src/pages/DestPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editdestpesca/:slug',
        component: () => import('src/pages/DestPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/tipopesca',
        component: () => import('src/pages/TipoPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/edittipopesca/:slug',
        component: () => import('src/pages/TipoPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/regionespesca',
        component: () => import('src/pages/RegionesPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editregionespesca/:slug',
        component: () => import('src/pages/RegionesPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/destinos',
        component: () => import('src/pages/DestinoPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editdestino/:slug',
        component: () => import('src/pages/DestinoPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/marinas',
        component: () => import('src/pages/MarinaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editmarina/:slug',
        component: () => import('src/pages/MarinaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/lanchasregion',
        component: () => import('src/pages/LanchaRegionPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editlancharegion/:slug',
        component: () => import('src/pages/LanchaRegionPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/polospesca',
        component: () => import('src/pages/PoloPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editpolopesca/:slug',
        component: () => import('src/pages/PoloPescaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/lugareshoteles',
        component: () => import('src/pages/LugarHotelPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editlugarhotel/:slug',
        component: () => import('src/pages/LugarHotelPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/tiposhabitaciones',
        component: () => import('src/pages/TipoHabitacionPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/edittipohabitacion/:slug',
        component: () => import('src/pages/TipoHabitacionPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/regimenes',
        component: () => import('src/pages/RegimenPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editregimen/:slug',
        component: () => import('src/pages/RegimenPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/rentroom',
        component: () => import('src/pages/RentRoomPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editrentroom/:slug',
        component: () => import('src/pages/RentRoomPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/nacionalidades',
        component: () => import('src/pages/NacionalidadPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editnacionalidad/:slug',
        component: () => import('src/pages/NacionalidadPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/origenreservas',
        component: () => import('src/pages/OrigenReservaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editorigenreserva/:slug',
        component: () => import('src/pages/OrigenReservaPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/tiposcarros',
        component: () => import('src/pages/TipoCarroPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/edittipocarro/:slug',
        component: () => import('src/pages/TipoCarroPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
      },
      {
        path: '/vuelosdomesticos',
        component: () => import('src/pages/VueloDomesticoPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: false,
        },
      },
      {
        path: '/editvuelodomestico/:slug',
        component: () => import('src/pages/VueloDomesticoPage.vue'),
        meta: { requiresAuth: true },
        props: {
          isEditing: true,
        },
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
