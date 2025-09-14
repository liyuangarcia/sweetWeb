<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Origen de la Reserva</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.ONOMBRE"
                    label="Nombre"
                    dense
                    ref="refONOMBRE"
                    maxlength="50"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.OCORREO"
                    label="Correo electronico"
                    dense
                    maxlength="80"
                    type="email"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.Onreservai"
                    label="Onreservai"
                    dense
                    maxlength="2"
                    ref="refOnreservai"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.onreservaf"
                    label="onreservaf"
                    dense
                    maxlength="2"
                    ref="refonreservaf"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.ONINICIOCOD"
                    label="ONINICIOCOD"
                    dense
                    type="number"
                    ref="refONINICIOCOD"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.temporada"
                    label="Temporada"
                    dense
                    maxlength="50"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.codini"
                    label="codini"
                    dense
                    maxlength="50"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="origenreserva.codfin"
                    label="codfin"
                    dense
                    maxlength="50"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-checkbox v-model="origenreserva.sweetin" label="sweetin" />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-checkbox
                    v-model="origenreserva.automaticfilemaker"
                    label="automaticfilemaker"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-checkbox v-model="origenreserva.automaticexcel" label="automaticexcel" />
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createOrigenReserva()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backorigenesreservas()"
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
const refONOMBRE = ref(null)
const refOnreservai = ref(null)
const refonreservaf = ref(null)
const refONINICIOCOD = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const origenreserva = ref({
  id: null,
  ONOMBRE: '',
  OCORREO: '',
  Onreservai: '',
  onreservaf: '',
  ONINICIOCOD: 0,
  temporada: '',
  codini: '',
  codfin: '',
  sweetin: false,
  automaticfilemaker: false,
  automaticexcel: false,
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refONOMBRE.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/origenreservas/${slug.value}`)
    .then((response) => {
      origenreserva.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backorigenesreservas = () => {
  router.push('/maintenance/origenes/origenes')
}

const validateInput = () => {
  refONOMBRE.value.validate()
  refOnreservai.value.validate()
  refonreservaf.value.validate()
  refONINICIOCOD.value.validate()
  return (
    origenreserva.value.ONOMBRE &&
    origenreserva.value.Onreservai &&
    origenreserva.value.onreservaf &&
    origenreserva.value.ONINICIOCOD
  )
}

const createOrigenReserva = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/origenreservas/${slug.value}/`, origenreserva.value)

        $q.notify({
          type: 'positive',
          message: '¡Origen de la reserva actualizada correctamente!',
          caption: 'Origen de la Reserva',
        })

        backorigenesreservas()
        return response.data
      } catch (error) {
        console.error('Error actualizando Origen de la reserva:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Origen de la reserva',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/origenreservas/`, origenreserva.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado el Origen de la Reserva correctamente!',
            caption: 'Origen de la Reserva',
          })
          backorigenesreservas()
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
