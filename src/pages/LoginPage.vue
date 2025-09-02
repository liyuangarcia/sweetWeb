<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2" style="width: 400px; max-width: 90vw">
      <q-card-section class="text-center">
        <div class="text-h4 text-red-10 q-mb-md">Iniciar Sesión</div>
        <q-avatar size="120px" class="q-mb-md">
          <img src="~assets/Logo.JPG" alt="Logo" />
        </q-avatar>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="credentials.username"
            label="Usuario"
            type="text"
            :rules="[(val) => !!val || 'Usuario es requerido']"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <!-- Password -->
          <q-input
            filled
            v-model="credentials.password"
            label="Contraseña"
            :type="isPwd ? 'password' : 'text'"
            :rules="[(val) => !!val || 'La contraseña es requerida']"
            lazy-rules
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <!-- Submit Button -->
          <div>
            <q-btn
              label="Iniciar Sesión"
              type="submit"
              color="red-10"
              class="full-width"
              size="lg"
              :loading="loading"
            />
          </div>
        </q-form>

        <!-- Links adicionales -->
        <div class="q-mt-lg text-center">
          <q-btn
            flat
            label="¿Olvidaste tu contraseña?"
            color="red-10"
            size="sm"
            @click="forgotPassword"
          />
          <br />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { api } from 'boot/axios'
import { useQuasar, LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()

//const API_URL = 'http://localhost:8000/api'
const isPwd = ref(true)
const loading = ref(false)
const router = useRouter()

const credentials = reactive({
  username: '',
  password: '',
})

const onSubmit = async () => {
  loading.value = true
  try {
    const response = await api.post(`/login/`, credentials)

    if (response.data) {
      const { user, access, refresh } = response.data

      // Guardar tokens y user en localStorage
      LocalStorage.set('access_token', access)
      LocalStorage.set('refresh_token', refresh)
      LocalStorage.set('user', JSON.stringify(user))

      // Configurar header por defecto para axios
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`
      loading.value = false
      router.push('/main')
      return user
    }
  } catch (error) {
    loading.value = false
    const errorMessage =
      error.response?.data?.non_field_errors?.[0] ||
      error.response?.data?.detail ||
      'Error en el login'
    $q.dialog({
      title: 'Inicio de sesion fallido',
      message: errorMessage,
    })
  }
}

const forgotPassword = () => {
  $q.dialog({
    title: 'Recuperar contraseña',
    message: 'Ingresa tu email para recuperar tu contraseña:',
    prompt: {
      model: '',
      type: 'email',
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    $q.notify({
      type: 'info',
      message: `Instrucciones enviadas a: ${data}`,
      position: 'top',
    })
  })
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
