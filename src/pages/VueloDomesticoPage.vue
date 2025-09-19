<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Vuelo Domestico</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="vuelodomestico.vdnvuelo"
                    label="Vuelo"
                    dense
                    maxlength="50"
                    ref="refvdnvuelo"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="vuelodomestico.vddiasemana"
                    :options="opcionesSemana"
                    label="Dia"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="value"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="vuelodomestico.vdfvueloi"
                    label="Fecha"
                    dense
                    type="date"
                    ref="refvdfvueloi"
                    :rules="[(val) => (val !== null && val !== '') || 'La fecha es requerida']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="vuelodomestico.vdcapacasignadai"
                    label="Capa."
                    dense
                    type="number"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="vuelodomestico.vdpnrasignadoi"
                    label="PNR"
                    dense
                    maxlength="10"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="vuelodomestico.vdlugardesalida"
                    :options="opcionesDestinos"
                    label="Polo Origen"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="DESTINO"
                    ref="refvdlugardesalida"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="vuelodomestico.vdterminal"
                    :options="opcionesAeropuertos"
                    label="Aeropuerto Origen"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="aaerodescripcion"
                    ref="refvdterminal"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="vuelodomestico.vdhsalida"
                    label="Hora Origen"
                    dense
                    type="time"
                    ref="refvdhsalida"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="vuelodomestico.vdpolo"
                    :options="opcionesDestinos"
                    label="Polo Destino"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="DESTINO"
                    ref="refvdpolo"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="vuelodomestico.vddestino"
                    :options="opcionesAeropuertos"
                    label="Aeropuerto Destino"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="aaerodescripcion"
                    ref="refvddestino"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="vuelodomestico.vdhllegada"
                    label="Hora Llegada"
                    dense
                    type="time"
                    ref="refvdhllegada"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createVueloDomestico()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backvuelodosmesticos()"
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
const refvdnvuelo = ref(null)
const refvdfvueloi = ref(null)
const refvdlugardesalida = ref(null)
const refvdterminal = ref(null)
const refvdhsalida = ref(null)
const refvdpolo = ref(null)
const refvddestino = ref(null)
const refvdhllegada = ref(null)

const slug = ref(route.params.slug)

const opcionesDestinos = ref([])
const opcionesAeropuertos = ref([])

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})
const opcionesSemana = ref([
  { id: 1, value: 'Domingo' },
  { id: 2, value: 'Lunes' },
  { id: 3, value: 'Martes' },
  { id: 4, value: 'Miercoles' },
  { id: 4, value: 'Jueves' },
  { id: 5, value: 'Viernes' },
  { id: 6, value: 'Sábado' },
])

const vuelodomestico = ref({
  id: null,
  vdnvuelo: '',
  vdfvueloi: null,
  vdfvuelor: null,
  vddiasemana: null,
  vdpolo: null,
  vddestino: null,
  vdterminal: null,
  vdlugardesalida: null,
  vdhsalida: null,
  vdhllegada: null,
  vdcapacasignadai: 0,
  vdpnrasignadoi: null,
  vdcapacasignadar: 0,
  vdpnrasignador: null,
  slug: '',
})

onMounted(() => {
  getDestinos()
  getAirports()
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refvdnvuelo.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/vuelosdomesticos/${slug.value}`)
    .then((response) => {
      vuelodomestico.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backvuelodosmesticos = () => {
  router.push('/maintenance/vuelos/vuelosdomesticos')
}

const validateInput = () => {
  refvdnvuelo.value.validate()
  refvdfvueloi.value.validate()
  refvdlugardesalida.value.validate()
  refvdterminal.value.validate()
  refvdhsalida.value.validate()
  refvdpolo.value.validate()
  refvddestino.value.validate()
  refvdhllegada.value.validate()
  return (
    vuelodomestico.value.vdnvuelo &&
    vuelodomestico.value.vdfvueloi &&
    vuelodomestico.value.vdlugardesalida &&
    vuelodomestico.value.vdterminal &&
    vuelodomestico.value.vdhsalida &&
    vuelodomestico.value.vdpolo &&
    vuelodomestico.value.vddestino &&
    vuelodomestico.value.vdhllegada
  )
}

const createVueloDomestico = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/vuelosdomesticos/${slug.value}/`, vuelodomestico.value)

        $q.notify({
          type: 'positive',
          message: '¡Vuelo Domestico actualizada correctamente!',
          caption: 'Vuelo Domestico',
        })

        backvuelodosmesticos()
        return response.data
      } catch (error) {
        console.error('Error actualizando Vuelo Domestico:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar Vuelo Domestico',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/vuelosdomesticos/`, vuelodomestico.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado Vuelo Domestico correctamente!',
            caption: 'Vuelo Domestico',
          })
          backvuelodosmesticos()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
const getDestinos = async () => {
  api
    .get(`/destinos/`)
    .then((response) => {
      opcionesDestinos.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getAirports = async () => {
  api
    .get(`/airports/`)
    .then((response) => {
      opcionesAeropuertos.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
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
