<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-9 text-white">
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-separator v-if="!isLoginPage" dark vertical inset />
        <q-btn v-if="!isLoginPage" stretch flat label="Inicio" to="/main" />
        <q-btn v-if="!isLoginPage" stretch flat label="Reservas" to="/reservas" />
        <q-separator v-if="!isLoginPage" dark vertical inset />
        <q-btn
          v-if="!isLoginPage"
          stretch
          flat
          label="Mantenimiento"
          to="/maintenance"
          icon="handyman"
        />

        <q-space />

        <q-btn-dropdown v-if="!isLoginPage" stretch flat :label="getUser()">
          <q-list>
            <q-item-label header>Perfil</q-item-label>
            <q-item clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-avatar icon="person" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Datos del usuario</q-item-label>
                <q-item-label caption>Perfil del usuario</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset spaced />
            <q-item clickable v-close-popup tabindex="0" @click="logout()">
              <q-item-section avatar>
                <q-avatar icon="logout" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Salir</q-item-label>
                <q-item-label caption>Cerrar sesion</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'
import { api } from 'boot/axios'

//import { ref } from 'vue'
const route = useRoute()
const router = useRouter()

const API_URL = 'http://localhost:8000/api/auth'

const isLoginPage = computed(() => {
  return route.name === 'login' || route.path === '/login'
})

const getUser = () => {
  const userStr = LocalStorage.getItem('user')
  return userStr ? JSON.parse(userStr).username : null
}

const logout = async () => {
  try {
    await api.post(`${API_URL}/logout/`)
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Limpiar localStorage
    LocalStorage.remove('access_token')
    LocalStorage.remove('refresh_token')
    LocalStorage.remove('user')
    delete api.defaults.headers.common['Authorization']
  }
}
</script>
