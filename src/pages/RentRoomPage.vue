<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Casas con rentas de habitaciones</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    ref="refDireccion"
                    filled
                    v-model="rentroom.Direccioncasa"
                    label="Direccion"
                    dense
                    maxlength="70"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="rentroom.telefonocasa"
                    label="Telefono"
                    dense
                    maxlength="10"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="rentroom.contactocasa"
                    label="Contacto"
                    dense
                    maxlength="30"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="rentroom.descripcion"
                    label="Descripcion"
                    dense
                    maxlength="50"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="rentroom.polocasa"
                    :options="opcionesPolo"
                    label="Polo"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="DESTINO"
                    ref="refPolo"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-select
                    filled
                    v-model="rentroom.municipcasa"
                    :options="opcionesMunicipios"
                    label="Municipios"
                    dense
                    emit-value
                    map-options
                    option-value="id"
                    option-label="municipio"
                    ref="refMunicipio"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  />
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createRentRoom()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backrentroom()"
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
const refDireccion = ref(null)
const refMunicipio = ref(null)

const opcionesPolo = ref([])
const opcionesMunicipios = ref([])

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const rentroom = ref({
  id: null,
  polocasa: '',
  municipcasa: '',
  Direccioncasa: '',
  telefonocasa: '',
  contactocasa: '',
  descripcion: '',
  slug: '',
})

onMounted(() => {
  getDestinos()
  getMunicipios()
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refDireccion.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/rentroom/${slug.value}`)
    .then((response) => {
      rentroom.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backrentroom = () => {
  router.push('/maintenance/hospedaje/rentroom')
}

const validateInput = () => {
  refPolo.value.validate()
  refDireccion.value.validate()
  refMunicipio.value.validate()
  return rentroom.value.polocasa && rentroom.value.Direccioncasa && rentroom.value.municipcasa
}

const createRentRoom = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/rentroom/${slug.value}/`, rentroom.value)

        $q.notify({
          type: 'positive',
          message: 'Rent Room actualizado correctamente!',
          caption: 'Rent Room',
        })

        backrentroom()
        return response.data
      } catch (error) {
        console.error('Error actualizando Rent Room:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar Rent Room',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/rentroom/`, rentroom.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado Rent Room correctamente!',
            caption: 'Rent Room',
          })
          backrentroom()
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
const getMunicipios = async () => {
  api
    .get(`/municipios/`)
    .then((response) => {
      opcionesMunicipios.value = response.data
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
