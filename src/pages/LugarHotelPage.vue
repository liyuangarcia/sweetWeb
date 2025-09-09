<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Hotel o Lugar</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="lugarhotel.Polo"
                    :options="opcionesPolo"
                    label="Polo"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="DESTINO"
                    ref="refPolo"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="lugarhotel.LugarHotel" label="Lugar Hotel" dense>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="lugarhotel.Direccion" label="Direccion" dense> </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="lugarhotel.Telefono" label="Telefono" dense> </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createLugarHotel()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backlugareshoteles()"
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
const refPolo = ref(null)
const opcionesPolo = ref([])

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const lugarhotel = ref({
  id: null,
  Polo: '',
  LugarHotel: '',
  Direccion: '',
  Telefono: '',
  slug: '',
})

onMounted(() => {
  getDestinos()
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refPolo.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/lugareshoteles/${slug.value}`)
    .then((response) => {
      lugarhotel.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backlugareshoteles = () => {
  router.push('/maintenance/hospedaje/hoteles')
}

const validateInput = () => {
  refPolo.value.validate()
  return lugarhotel.value.Polo
}

const createLugarHotel = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/lugareshoteles/${slug.value}/`, lugarhotel.value)

        $q.notify({
          type: 'positive',
          message: 'Lugar hotel actualizado correctamente!',
          caption: 'Lugar hotel',
        })

        backlugareshoteles()
        return response.data
      } catch (error) {
        console.error('Error actualizando Lugar hotel:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Lugar hotel',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/lugareshoteles/`, lugarhotel.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado el lugar hotel correctamente!',
            caption: 'Lugar hotel',
          })
          backlugareshoteles()
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
      opcionesPolo.value = response.data
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
