<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <q-btn
              to="/crearreserva"
              color="red-10"
              icon="add"
              label="Agregar Reserva"
              class="btn-agregar"
            />

            <div class="filter-section">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-12 col-md-12">
                  <q-input
                    @keyup.enter="getDatosGenerales()"
                    filled
                    v-model="origenreservas_search"
                    label="Aeropuertos"
                    dense
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="getDatosGenerales()"
                  color="red-10"
                  label="Buscar"
                  icon="search"
                  class="q-mr-md"
                />
                <q-btn @click="clearDatosGenerales()" color="grey" label="Limpiar" outline />
              </div>
            </div>
            <div class="reserva-table">
              <q-table
                :rows="datosgenerales"
                row-key="name"
                :columns="reservascolums"
                flat
                bordered
              >
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" class="text-center">
                    <div class="q-gutter-xs">
                      <q-btn icon="delete" color="red-10" size="sm" round dense title="Eliminar" />
                      <q-btn icon="edit" color="grey" size="sm" round dense title="Editar" />
                    </div>
                  </q-td>
                </template>
              </q-table>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { onMounted } from 'vue'

const origenreservas_search = ref('')
const datosgenerales = ref([])

const reservascolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'RFSOLICITUD',
    align: 'left',
    label: 'Fecha solicitud',
    field: 'RFSOLICITUD',
    sortable: true,
  },
  {
    name: 'RORIGENDELARESERVA',
    align: 'left',
    label: 'Origen',
    field: 'RORIGENDELARESERVAtext',
    sortable: true,
  },
  {
    name: 'RCORIGENDELARESERVA',
    align: 'left',
    label: 'Nº. Solicitud',
    field: 'RCORIGENDELARESERVA',
    sortable: true,
  },
  {
    name: 'RCARPETA',
    align: 'left',
    label: 'Carpeta',
    field: 'RCARPETA',
    sortable: true,
  },
  {
    name: 'RNOMBRE',
    align: 'left',
    label: 'Nombre del grupo',
    field: 'RNOMBRE',
    sortable: true,
  },
  {
    name: 'RISERVICIO',
    align: 'left',
    label: 'Inicio de los Servicios',
    field: 'RISERVICIO',
    sortable: true,
  },
  {
    name: 'RFSERVICIO',
    align: 'left',
    label: 'Fin de los Servicios',
    field: 'RFSERVICIO',
    sortable: true,
  },
  {
    name: 'RDESTINOtext',
    align: 'left',
    label: 'Polo inicial',
    field: 'RDESTINOtext',
    sortable: true,
  },
])

onMounted(() => {
  getDatosGenerales()
})

const getDatosGenerales = async () => {
  api
    .get(`/datosgenerales/?search=${origenreservas_search.value}`)
    .then((response) => {
      datosgenerales.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}

const clearDatosGenerales = () => {
  if (origenreservas_search.value) {
    origenreservas_search.value = ''
    getDatosGenerales()
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
.reserva-table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
.btn-agregar {
  margin-bottom: 20px;
}
</style>
