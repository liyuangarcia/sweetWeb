<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Lancha</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="lancharegion.REGIONES"
                    :options="opcionesRegiones"
                    label="Region"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="REGIONES"
                    ref="refREGIONES"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="lancharegion.SumaDeLANCHAS"
                    label="Suma de lanchas"
                    dense
                    type="number"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createLanchaRegion()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backlanchasregiones()"
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
const refREGIONES = ref(null)
const opcionesRegiones = ref([])

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const lancharegion = ref({
  id: null,
  REGIONES: '',
  SumaDeLANCHAS: 0,
  slug: '',
})

onMounted(() => {
  getRegionesPesca()
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refREGIONES.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/lanchasregion/${slug.value}`)
    .then((response) => {
      lancharegion.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backlanchasregiones = () => {
  router.push('/maintenance/ships/lanchasregion')
}

const validateInput = () => {
  refREGIONES.value.validate()
  return lancharegion.value.REGIONES
}

const createLanchaRegion = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/lanchasregion/${slug.value}/`, lancharegion.value)

        $q.notify({
          type: 'positive',
          message: '¡Lanchas actualizado correctamente!',
          caption: 'Lanchas por region',
        })

        backlanchasregiones()
        return response.data
      } catch (error) {
        console.error('Error actualizando Lancha:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Lancha',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/lanchasregion/`, lancharegion.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado la lancha por region correctamente!',
            caption: 'Lanchas por region',
          })
          backlanchasregiones()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
const getRegionesPesca = async () => {
  api
    .get(`/regionespesca/`)
    .then((response) => {
      opcionesRegiones.value = response.data
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
