<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="input-section">
              <div class="text-h6">Datos Generales para la nueva reserva</div>
              <q-separator class="q-my-md" />
              <div class="q-col-gutter-sm">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-select
                      filled
                      v-model="datosgenerales.RORIGENDELARESERVA"
                      :options="opcionesReservas"
                      label="Origen de la Reserva"
                      dense
                      emit-value
                      map-options
                      option-value="id"
                      option-label="ONOMBRE"
                      ref="refRORIGENDELARESERVA"
                      :rules="[(val) => !!val || 'Valor requerido']"
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input v-model="datosgenerales.RCSOLICITUD" filled label="Nº. Ref." dense />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input
                      v-model="datosgenerales.RCORIGENDELARESERVA"
                      filled
                      label="Nº. Solicitud"
                      dense
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input
                      v-model="datosgenerales.RFSOLICITUD"
                      mask="date"
                      filled
                      label="Fecha de Solicitud"
                      type="date"
                      dense
                      ref="refRFSOLICITUD"
                      :rules="[(val) => (val !== null && val !== '') || 'La fecha es requerida']"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-select
                      filled
                      v-model="datosgenerales.RDESTINO"
                      :options="opcionesPolos"
                      label="Polo Inicial"
                      dense
                      emit-value
                      map-options
                      option-value="id"
                      option-label="DESTINO"
                      ref="refRDESTINO"
                      :rules="[(val) => !!val || 'Valor requerido']"
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-select
                      filled
                      v-model="datosgenerales.ROPERADOR"
                      :options="opcionesEstado"
                      label="Operador"
                      dense
                      emit-value
                      map-options
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input
                      v-model="datosgenerales.RCDADOXOPERADOR"
                      filled
                      label="Código Según Operador"
                      dense
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-select
                      filled
                      v-model="datosgenerales.RAGENCIA"
                      :options="opcionesEstado"
                      label="Agencia"
                      dense
                      emit-value
                      map-options
                    />
                  </div>
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input
                      v-model="datosgenerales.RNOMBRE"
                      filled
                      label="Nombre del Grupo"
                      dense
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input v-model="datosgenerales.RCANTPAXPREV" filled label="PAX" dense />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input
                      v-model="datosgenerales.RISERVICIO"
                      mask="date"
                      filled
                      label="Inicio de los Servicios"
                      type="date"
                      dense
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3">
                    <q-input
                      v-model="datosgenerales.RFSERVICIO"
                      mask="date"
                      filled
                      label="Fin de los Servicios"
                      type="date"
                      dense
                    />
                  </div>
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-12 col-md-12">
                    <q-input
                      label="Comentarios"
                      v-model="datosgenerales.RCOMENTARIO"
                      dense
                      filled
                      type="textarea"
                    />
                  </div>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  color="red-10"
                  label="Agregar"
                  icon="add"
                  @click="addReserva()"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backReservas()"
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
import { useRouter } from 'vue-router'

const router = useRouter()

const datosgenerales = ref({
  RORIGENDELARESERVA: '',
  RFSOLICITUD: '',
  RDESTINO: '',
  ROPERADOR: '',
  RCDADOXOPERADOR: '',
  RAGENCIA: '',
  RCSOLICITUD: '',
  RCORIGENDELARESERVA: '',
  RNOMBRE: '',
  RCANTPAXPREV: '',
  RFSERVICIO: '',
})

const refRORIGENDELARESERVA = ref(null)
const refRDESTINO = ref(null)
const refRFSOLICITUD = ref(null)

onMounted(() => {
  getOrigenReservas()
  getPolos()

  nextTick(() => {
    refRORIGENDELARESERVA.value.focus()
  })
})

const opcionesEstado = [
  { label: 'Confirmada', value: 'Confirmada' },
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'Cancelada', value: 'Cancelada' },
]

const opcionesReservas = ref([])
const opcionesPolos = ref([])

const validateInput = () => {
  refRORIGENDELARESERVA.value.validate()
  refRDESTINO.value.validate()
  refRFSOLICITUD.value.validate()
  return (
    datosgenerales.value.RORIGENDELARESERVA &&
    datosgenerales.value.RDESTINO &&
    datosgenerales.value.RFSOLICITUD
  )
}

const backReservas = () => {
  router.push('/reservas/')
}

const getOrigenReservas = async () => {
  api
    .get(`/origenreservas/`)
    .then((response) => {
      opcionesReservas.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}

const getPolos = async () => {
  api
    .get(`/destpesca/`)
    .then((response) => {
      opcionesPolos.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}

const addReserva = () => {
  if (validateInput()) {
    //
  }
}
</script>
<style>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.input-section {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
