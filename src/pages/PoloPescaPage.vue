<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Polo</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="polopesca.DESTINO"
                    label="Destino"
                    dense
                    ref="refDESTINO"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="polopesca.REGIONES"
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
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createPoloPesca()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backpolospesca()"
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
const refDESTINO = ref(null)
const refREGIONES = ref(null)
const opcionesRegiones = ref([])

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const polopesca = ref({
  id: null,
  REGIONES: '',
  DESTINO: '',
  LANCHAS: 0,
  slug: '',
})

onMounted(() => {
  getRegionesPesca()
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refDESTINO.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/destpesca/${slug.value}`)
    .then((response) => {
      polopesca.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backpolospesca = () => {
  router.push('/maintenance/destinations/polospesca')
}

const validateInput = () => {
  refDESTINO.value.validate()
  return polopesca.value.DESTINO
}

const createPoloPesca = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/destpesca/${slug.value}/`, polopesca.value)

        $q.notify({
          type: 'positive',
          message: 'Polo actualizado correctamente!',
          caption: 'Polo',
        })

        backpolospesca()
        return response.data
      } catch (error) {
        console.error('Error actualizando Polo:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Polo',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/destpesca/`, polopesca.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado el Polo correctamente!',
            caption: 'Polo',
          })
          backpolospesca()
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
