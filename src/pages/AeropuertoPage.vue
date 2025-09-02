<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar aeropuerto</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="aeropuerto.aaerodescripcion" label="Aeropuerto" dense>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="aeropuerto.alugar" label="Ubicacion" dense> </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="aeropuerto.asiglas"
                    label="Siglas"
                    dense
                    maxlength="3"
                    @update:model-value="convertToUpper"
                    :rules="[
                      (val) => (val && val.length === 3) || 'Debe tener exactamente 3 caracteres',
                      (val) => /^[A-Z]+$/.test(val) || 'Solo letras mayúsculas permitidas',
                    ]"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createAirport()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backairports()"
                  color="grey"
                  icon="arrow_back"
                  label="Regresar"
                  outline
                />
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const aeropuerto = ref({
  id: null,
  aaerodescripcion: '',
  alugar: '',
  asiglas: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()
})

const loadEdit = () => {
  api
    .get(`/airports/${slug.value}`)
    .then((response) => {
      aeropuerto.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backairports = () => {
  router.push('/maintenance')
}

const convertToUpper = (newValue) => {
  aeropuerto.value.asiglas = newValue.toUpperCase().slice(0, 3)
}

const createAirport = async () => {
  if (props.isEditing) {
    try {
      const response = await api.put(`/airports/${slug.value}/`, aeropuerto.value)

      $q.notify({
        type: 'positive',
        message: '¡Aeropuerto actualizado correctamente!',
        caption: 'Aeropuerto',
      })

      backairports()
      return response.data
    } catch (error) {
      console.error('Error actualizando aeropuerto:', error)

      $q.notify({
        type: 'negative',
        message: 'Error al actualizar el aeropuerto',
        caption: error.response?.data?.message || 'Intenta nuevamente',
      })

      throw error // Puedes opcionalmente relanzar el error
    }
  } else {
    api
      .post(`/airports/`, aeropuerto.value)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: '¡Creado el aeropuerto correctamente!',
          caption: 'Aeropuerto',
        })
        backairports()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
<style>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.filter-section {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
.btn-agregar {
  margin-bottom: 20px;
}
</style>
