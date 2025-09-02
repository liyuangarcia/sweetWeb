<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <q-splitter v-model="splitterModel">
              <template v-slot:before>
                <q-tabs v-model="tab" vertical class="text-teal">
                  <q-tab name="airports" icon="connecting_airports" label="Aeropuertos" />
                  <q-tab name="ships" icon="sailing" label="Barcos" />
                  <q-tab name="movies" icon="movie" label="Movies" />
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="airports">
                    <div class="text-h4 q-mb-md">Aeropuertos</div>
                    <q-btn
                      to="/airport"
                      color="red-10"
                      icon="add"
                      label="Agregar"
                      class="btn-agregar"
                    />
                    <div class="filter-section">
                      <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-12 col-md-12">
                          <q-input
                            @keyup.enter="getAirports()"
                            filled
                            v-model="airport_search"
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
                          @click="getAirports()"
                          color="red-10"
                          label="Buscar"
                          icon="search"
                          class="q-mr-md"
                        />
                        <q-btn @click="clearAirports()" color="grey" label="Limpiar" outline />
                      </div>
                    </div>
                    <div class="reserva-table">
                      <q-table :rows="airports" :columns="airportcolums" row-key="id" flat bordered>
                        <template v-slot:body-cell-actions="props">
                          <q-td :props="props" class="text-center">
                            <q-btn
                              icon="delete"
                              color="red-10"
                              size="sm"
                              round
                              dense
                              @click="deleteRow(props.row)"
                            />
                          </q-td>
                        </template>
                      </q-table>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="ships">
                    <div class="text-h4 q-mb-md">Barcos, lanchas y pescas</div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
                      cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
                      cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h4 q-mb-md">Movies</div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
                      cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
                      cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium
                      cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
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
import { useQuasar } from 'quasar'

const $q = useQuasar()

const tab = ref('airports')
const splitterModel = ref(20)
const airport_search = ref('')
const airports = ref([])
const airportcolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'aeropuerto',
    align: 'left',
    label: 'Aeropuerto',
    field: 'aaerodescripcion',
    sortable: true,
  },
  { name: 'alugar', align: 'left', label: 'Ubicacion', field: 'alugar', sortable: true },
  { name: 'asiglas', align: 'left', label: 'Siglas', field: 'asiglas', sortable: true },
])

onMounted(() => {
  getAirports()
})

const deleteRow = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.aaerodescripcion})?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    airports.value = airports.value.filter((airport) => airport.id !== row.id)
    api
      .delete(`/airports/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Aeropuerto eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

const clearAirports = () => {
  if (airport_search.value) {
    airport_search.value = ''
    getAirports()
  }
}

const getAirports = async () => {
  api
    .get(`/airports/?search=${airport_search.value}`)
    .then((response) => {
      airports.value = response.data
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
.reserva-table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
.status-badge {
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 0.8em;
  font-weight: 500;
}
.btn-agregar {
  margin-bottom: 20px;
}
.table-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
