<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Tipo de habitacion</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    ref="refTHABITACION"
                    filled
                    v-model="tipohabitacion.THABITACION"
                    label="Tipo habitacion"
                    dense
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    ref="refTCANTC"
                    filled
                    v-model="tipohabitacion.TCANTC"
                    label="Cantidad habitaciones"
                    dense
                    type="number"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createTipoHabitacion()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backtiposhabitaciones()"
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
import { ref, onMounted, nextTick } from 'vue'
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const refTCANTC = ref(null)
const refTHABITACION = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const tipohabitacion = ref({
  id: null,
  THABITACION: '',
  TCANTC: 0,
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refTHABITACION.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/tiposhabitaciones/${slug.value}`)
    .then((response) => {
      tipohabitacion.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backtiposhabitaciones = () => {
  router.push('/maintenance/hospedaje/tiposhabitaciones')
}

const validateInput = () => {
  refTHABITACION.value.validate()
  return tipohabitacion.value.THABITACION
}

const createTipoHabitacion = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/tiposhabitaciones/${slug.value}/`, tipohabitacion.value)

        $q.notify({
          type: 'positive',
          message: 'Tipo de habitacion actualizado correctamente!',
          caption: 'Tipo de habitacion',
        })

        backtiposhabitaciones()
        return response.data
      } catch (error) {
        console.error('Error actualizando Tipo de habitacion:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar Tipo de habitacion',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/tiposhabitaciones/`, tipohabitacion.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado Tipo de habitacion correctamente!',
            caption: 'Tipo de habitacion',
          })
          backtiposhabitaciones()
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
