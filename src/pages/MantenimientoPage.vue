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
                  <q-tab name="destinations" icon="beach_access" label="Destinos" />
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
                      <q-table
                        :rows="airports"
                        :columns="airportcolums"
                        row-key="id"
                        flat
                        bordered
                        :pagination="{ rowsPerPage: 10 }"
                      >
                        <template v-slot:body-cell-actions="props">
                          <q-td :props="props" class="text-center">
                            <div class="q-gutter-xs">
                              <q-btn
                                icon="delete"
                                color="red-10"
                                size="sm"
                                round
                                dense
                                title="Eliminar"
                                @click="deleteAirport(props.row)"
                              />
                              <q-btn
                                icon="edit"
                                color="grey"
                                size="sm"
                                round
                                dense
                                title="Editar"
                                @click="editAirport(props.row)"
                              />
                            </div>
                          </q-td>
                        </template>
                      </q-table>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="ships">
                    <div class="text-h4 q-mb-md">Barcos, lanchas y pescas</div>
                    <q-list bordered class="rounded-borders">
                      <q-expansion-item
                        expand-separator
                        icon="perm_identity"
                        label="Guias"
                        v-model="exGuias"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Guias</div>
                            <q-btn
                              to="/guia"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getGuias()"
                                    filled
                                    v-model="guias_search"
                                    label="Guias"
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
                                  @click="getGuias()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn @click="clearGuias()" color="grey" label="Limpiar" outline />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="guias"
                                :columns="guiascolums"
                                row-key="id"
                                flat
                                bordered
                                :pagination="{ rowsPerPage: 10 }"
                              >
                                <template v-slot:body-cell-actions="props">
                                  <q-td :props="props" class="text-center">
                                    <div class="q-gutter-xs">
                                      <q-btn
                                        icon="delete"
                                        color="red-10"
                                        size="sm"
                                        round
                                        dense
                                        title="Eliminar"
                                        @click="deleteGuias(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editGuias(props.row)"
                                      />
                                    </div>
                                  </q-td>
                                </template>
                              </q-table>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>

                      <q-expansion-item
                        expand-separator
                        icon="sailing"
                        v-model="exDestPesca"
                        label="Asignacion de lanchas a los polos de pescas"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">
                              Asignacion de lanchas a los polos de pesca
                            </div>
                            <q-btn
                              to="/destpesca"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getDestPesca()"
                                    filled
                                    v-model="destpesca_search"
                                    label="Destinos"
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
                                  @click="getDestPesca()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearDestPesca()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="destpesca"
                                :columns="destpescacolums"
                                row-key="id"
                                flat
                                bordered
                                :pagination="{ rowsPerPage: 10 }"
                              >
                                <template v-slot:body-cell-actions="props">
                                  <q-td :props="props" class="text-center">
                                    <div class="q-gutter-xs">
                                      <q-btn
                                        icon="delete"
                                        color="red-10"
                                        size="sm"
                                        round
                                        dense
                                        title="Eliminar"
                                        @click="deleteDestPesca(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editDestPesca(props.row)"
                                      />
                                    </div>
                                  </q-td>
                                </template>
                              </q-table>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>

                      <q-expansion-item
                        expand-separator
                        icon="drafts"
                        v-model="exTipoPesca"
                        label="Posibles Actividades en el polo"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Posibles Actividades en el polo</div>
                            <q-btn
                              to="/tipopesca"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getTipoPesca()"
                                    filled
                                    v-model="tipopesca_search"
                                    label="Tipos de pescas"
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
                                  @click="getTipoPesca()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearTipoPesca()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="tipopesca"
                                :columns="tipopescacolums"
                                row-key="id"
                                flat
                                bordered
                                :pagination="{ rowsPerPage: 10 }"
                              >
                                <template v-slot:body-cell-actions="props">
                                  <q-td :props="props" class="text-center">
                                    <div class="q-gutter-xs">
                                      <q-btn
                                        icon="delete"
                                        color="red-10"
                                        size="sm"
                                        round
                                        dense
                                        title="Eliminar"
                                        @click="deleteTipoPesca(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editTipoPesca(props.row)"
                                      />
                                    </div>
                                  </q-td>
                                </template>
                              </q-table>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>

                      <q-expansion-item icon="assessment" label="Lanchas por Region">
                        <q-card>
                          <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
                            reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
                            officiis modi facere maiores architecto suscipit iste eveniet doloribus
                            ullam aliquid.
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h4 q-mb-md">Destinos</div>
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
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const tabName = ref(route.params.tabName)
const exItem = ref(route.params.exItem)

const tab = ref('airports')
const exGuias = ref(false)
const exDestPesca = ref(false)
const exTipoPesca = ref(false)

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

const guias_search = ref('')
const guias = ref([])
const guiascolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'GNOMBREDELGUIA',
    align: 'left',
    label: 'Nombre del Guia',
    field: 'GNOMBREDELGUIA',
    sortable: true,
  },
])

const destpesca_search = ref('')
const destpesca = ref([])
const destpescacolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'DESTINO',
    align: 'left',
    label: 'Destinos',
    field: 'DESTINO',
    sortable: true,
  },
  {
    name: 'LANCHAS',
    align: 'left',
    label: 'Lanchas',
    field: 'LANCHAS',
    sortable: true,
  },
])

const tipopesca_search = ref('')
const tipopesca = ref([])
const tipopescacolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'MPESCA',
    align: 'left',
    label: 'Tipo',
    field: 'MPESCA',
    sortable: true,
  },
])

onMounted(() => {
  if (tabName.value) tab.value = tabName.value
  expItem()
  getAirports()
  getGuias()
  getDestPesca()
  getTipoPesca()
})

const expItem = () => {
  exGuias.value = exItem.value == 'guias' ? true : false
  exDestPesca.value = exItem.value == 'destpesca' ? true : false
  exTipoPesca.value = exItem.value == 'tipopesca' ? true : false
}

const editAirport = (row) => {
  router.push(`/editairport/${row.slug}`)
}
const editGuias = (row) => {
  router.push(`/editguia/${row.slug}`)
}
const editDestPesca = (row) => {
  router.push(`/editdestpesca/${row.slug}`)
}
const editTipoPesca = (row) => {
  router.push(`/edittipopesca/${row.slug}`)
}

const deleteAirport = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.aaerodescripcion}?`,
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
const deleteGuias = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.GNOMBREDELGUIA}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    guias.value = guias.value.filter((guia) => guia.id !== row.id)
    api
      .delete(`/guiaspesca/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Guia eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
const deleteDestPesca = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.DESTINO}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    destpesca.value = destpesca.value.filter((destino) => destino.id !== row.id)
    api
      .delete(`/destpesca/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Destino eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
const deleteTipoPesca = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.MPESCA}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    tipopesca.value = tipopesca.value.filter((tipo) => tipo.id !== row.id)
    api
      .delete(`/tipopesca/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Tipo de pesca eliminado correctamente',
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
const clearGuias = () => {
  if (guias_search.value) {
    guias_search.value = ''
    getGuias()
  }
}
const clearDestPesca = () => {
  if (destpesca_search.value) {
    destpesca_search.value = ''
    getDestPesca()
  }
}
const clearTipoPesca = () => {
  if (tipopesca_search.value) {
    tipopesca_search.value = ''
    getTipoPesca()
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
const getGuias = async () => {
  api
    .get(`/guiaspesca/?search=${guias_search.value}`)
    .then((response) => {
      guias.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getDestPesca = async () => {
  api
    .get(`/destpesca/?search=${destpesca_search.value}`)
    .then((response) => {
      destpesca.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getTipoPesca = async () => {
  api
    .get(`/tipopesca/?search=${tipopesca_search.value}`)
    .then((response) => {
      tipopesca.value = response.data
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
