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
                  <q-tab name="hospedaje" icon="hotel" label="Hospedaje" />
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

                      <q-expansion-item
                        icon="assessment"
                        label="Lanchas por Region"
                        v-model="exLanchasRegion"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Lanchas por Region</div>
                            <q-btn
                              to="/lanchasregion"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getLanchasRegion()"
                                    filled
                                    v-model="lanchasregion_search"
                                    label="Lanchas por region"
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
                                  @click="getLanchasRegion()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearLanchasRegion()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="lanchasregion"
                                :columns="lanchasregioncolums"
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
                                        @click="deleteLanchasRegion(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editLanchasRegion(props.row)"
                                      />
                                    </div>
                                  </q-td>
                                </template>
                              </q-table>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="destinations">
                    <div class="text-h4 q-mb-md">Destinos</div>
                    <q-list bordered class="rounded-borders">
                      <q-expansion-item
                        expand-separator
                        icon="perm_identity"
                        label="Regiones de Pesca"
                        v-model="exRegionesPesca"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Regiones de Pesca</div>
                            <q-btn
                              to="/regionespesca"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getRegionesPesca()"
                                    filled
                                    v-model="regionespesca_search"
                                    label="Regiones de Pesca"
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
                                  @click="getRegionesPesca()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearRegionesPesca()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="regionespesca"
                                :columns="regionespescacolums"
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
                                        @click="deleteRegionesPesca(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editRegionesPesca(props.row)"
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
                        v-model="exDestinos"
                        label="Destinos o polos turisticos"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Destinos o polos turisticos</div>
                            <q-btn
                              to="/destinos"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getDestinos()"
                                    filled
                                    v-model="destinos_search"
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
                                  @click="getDestinos()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearDestinos()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="destinos"
                                :columns="destinoscolums"
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
                                        @click="deleteDestinos(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editDestinos(props.row)"
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
                        v-model="exPolosPesca"
                        label="Polos de pesca para los transfers"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Polos de pesca para los transfers</div>
                            <q-btn
                              to="/polospesca"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getPolosPesca()"
                                    filled
                                    v-model="polospesca_search"
                                    label="Polos"
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
                                  @click="getPolosPesca()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearPolosPesca()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="polospesca"
                                :columns="polospescacolums"
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
                                        @click="deletePoloPesca(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editPoloPesca(props.row)"
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
                        v-model="exMarinas"
                        icon="assessment"
                        label="Marinas"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Marinas</div>
                            <q-btn
                              to="/marinas"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getMarinas()"
                                    filled
                                    v-model="marinas_search"
                                    label="Marinas"
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
                                  @click="getMarinas()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearMarinas()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="marinas"
                                :columns="marinascolums"
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
                                        @click="deleteMarinas(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editMarinas(props.row)"
                                      />
                                    </div>
                                  </q-td>
                                </template>
                              </q-table>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </q-tab-panel>
                  <q-tab-panel name="hospedaje">
                    <div class="text-h4 q-mb-md">Hospedaje</div>
                    <q-list bordered class="rounded-borders">
                      <q-expansion-item
                        expand-separator
                        v-model="exHoteles"
                        icon="assessment"
                        label="Hoteles"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Hoteles</div>
                            <q-btn
                              to="/lugareshoteles"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getLugaresHoteles()"
                                    filled
                                    v-model="lugareshoteles_search"
                                    label="Lugares Hoteles"
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
                                  @click="getLugaresHoteles()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearLugaresHoteles()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="lugareshoteles"
                                :columns="lugareshotelescolums"
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
                                        @click="deleteLugarHotel(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editLugarHotel(props.row)"
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
                        v-model="exCasasRenta"
                        icon="assessment"
                        label="Casas con rentas de habitaciones"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Casas con rentas de habitaciones</div>
                            <q-btn
                              to="/marinas"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getMarinas()"
                                    filled
                                    v-model="marinas_search"
                                    label="Marinas"
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
                                  @click="getMarinas()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearMarinas()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="marinas"
                                :columns="marinascolums"
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
                                        @click="deleteMarinas(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editMarinas(props.row)"
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
                        v-model="exTiposHabitaciones"
                        icon="assessment"
                        label="Tipos de habitaciones"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Tipos de habitaciones</div>
                            <q-btn
                              to="/marinas"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getMarinas()"
                                    filled
                                    v-model="marinas_search"
                                    label="Marinas"
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
                                  @click="getMarinas()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearMarinas()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="marinas"
                                :columns="marinascolums"
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
                                        @click="deleteMarinas(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editMarinas(props.row)"
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
                        v-model="exRegimenes"
                        icon="assessment"
                        label="Regimenes"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="text-h4 q-mb-md">Regimenes</div>
                            <q-btn
                              to="/marinas"
                              color="red-10"
                              icon="add"
                              label="Agregar"
                              class="btn-agregar"
                            />
                            <div class="filter-section">
                              <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-12 col-md-12">
                                  <q-input
                                    @keyup.enter="getMarinas()"
                                    filled
                                    v-model="marinas_search"
                                    label="Marinas"
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
                                  @click="getMarinas()"
                                  color="red-10"
                                  label="Buscar"
                                  icon="search"
                                  class="q-mr-md"
                                />
                                <q-btn
                                  @click="clearMarinas()"
                                  color="grey"
                                  label="Limpiar"
                                  outline
                                />
                              </div>
                            </div>
                            <div class="reserva-table">
                              <q-table
                                :rows="marinas"
                                :columns="marinascolums"
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
                                        @click="deleteMarinas(props.row)"
                                      />
                                      <q-btn
                                        icon="edit"
                                        color="grey"
                                        size="sm"
                                        round
                                        dense
                                        title="Editar"
                                        @click="editMarinas(props.row)"
                                      />
                                    </div>
                                  </q-td>
                                </template>
                              </q-table>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
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
const exRegionesPesca = ref(false)
const exDestinos = ref(false)
const exMarinas = ref(false)
const exLanchasRegion = ref(false)
const exPolosPesca = ref(false)
const exHoteles = ref(false)

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

const regionespesca_search = ref('')
const regionespesca = ref([])
const regionespescacolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'REGIONES',
    align: 'left',
    label: 'Regiones de Pesca',
    field: 'REGIONES',
    sortable: true,
  },
])

const destinos_search = ref('')
const destinos = ref([])
const destinoscolums = ref([
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
])

const marinas_search = ref('')
const marinas = ref([])
const marinascolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'Lmarina',
    align: 'left',
    label: 'Lmarina',
    field: 'Lmarina',
    sortable: true,
  },
  {
    name: 'Nmarina',
    align: 'left',
    label: 'Nmarina',
    field: 'Nmarina',
    sortable: true,
  },
  {
    name: 'NoficialMarina',
    align: 'left',
    label: 'NoficialMarina',
    field: 'NoficialMarina',
    sortable: true,
  },
])

const lanchasregion_search = ref('')
const lanchasregion = ref([])
const lanchasregioncolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'regionestext',
    align: 'left',
    label: 'Region',
    field: 'regionestext',
    sortable: true,
  },
  {
    name: 'SumaDeLANCHAS',
    align: 'left',
    label: 'Suma de Lanchas',
    field: 'SumaDeLANCHAS',
    sortable: true,
  },
])

const polospesca_search = ref('')
const polospesca = ref([])
const polospescacolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'DESTINO',
    align: 'left',
    label: 'Destino',
    field: 'DESTINO',
    sortable: true,
  },
  {
    name: 'regionestext',
    align: 'left',
    label: 'Region',
    field: 'regionestext',
    sortable: true,
  },
])

const lugareshoteles_search = ref('')
const lugareshoteles = ref([])
const lugareshotelescolums = ref([
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
  },
  {
    name: 'polotext',
    align: 'left',
    label: 'Polo',
    field: 'polotext',
    sortable: true,
  },
  {
    name: 'LugarHotel',
    align: 'left',
    label: 'Lugar Hotel',
    field: 'LugarHotel',
    sortable: true,
  },
  {
    name: 'Direccion',
    align: 'left',
    label: 'Direccion',
    field: 'Direccion',
    sortable: true,
  },
  {
    name: 'Telefono',
    align: 'left',
    label: 'Telefono',
    field: 'Telefono',
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
  getRegionesPesca()
  getDestinos()
  getMarinas()
  getLanchasRegion()
  getPolosPesca()
  getLugaresHoteles()
})

const expItem = () => {
  exGuias.value = exItem.value == 'guias' ? true : false
  exDestPesca.value = exItem.value == 'destpesca' ? true : false
  exTipoPesca.value = exItem.value == 'tipopesca' ? true : false
  exRegionesPesca.value = exItem.value == 'regionespesca' ? true : false
  exDestinos.value = exItem.value == 'destinos' ? true : false
  exMarinas.value = exItem.value == 'marinas' ? true : false
  exLanchasRegion.value = exItem.value == 'lanchasregion' ? true : false
  exPolosPesca.value = exItem.value == 'polospesca' ? true : false
  exHoteles.value = exItem.value == 'hoteles' ? true : false
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
const editRegionesPesca = (row) => {
  router.push(`/editregionespesca/${row.slug}`)
}
const editDestinos = (row) => {
  router.push(`/editdestino/${row.slug}`)
}
const editMarinas = (row) => {
  router.push(`/editmarina/${row.slug}`)
}
const editLanchasRegion = (row) => {
  router.push(`/editlancharegion/${row.slug}`)
}
const editPoloPesca = (row) => {
  router.push(`/editpolopesca/${row.slug}`)
}
const editLugarHotel = (row) => {
  router.push(`/editlugarhotel/${row.slug}`)
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
const deleteRegionesPesca = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.REGIONES}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    regionespesca.value = regionespesca.value.filter((region) => region.id !== row.id)
    api
      .delete(`/regionespesca/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Region de pesca eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
const deleteDestinos = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.DESTINO}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    destinos.value = destinos.value.filter((destino) => destino.id !== row.id)
    api
      .delete(`/destinos/${row.slug}/`)
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
const deleteMarinas = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.Nmarina}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    marinas.value = marinas.value.filter((marina) => marina.id !== row.id)
    api
      .delete(`/marinas/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Marina eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
const deleteLanchasRegion = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.regionestext}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    lanchasregion.value = lanchasregion.value.filter((lancha) => lancha.id !== row.id)
    api
      .delete(`/lanchasregion/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Lanchas eliminada correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
const deletePoloPesca = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.DESTINO}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    polospesca.value = polospesca.value.filter((polo) => polo.id !== row.id)
    api
      .delete(`/destpesca/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Polo eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
const deleteLugarHotel = (row) => {
  $q.dialog({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de eliminar ${row.LugarHotel}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    lugareshoteles.value = lugareshoteles.value.filter((Lugar) => Lugar.id !== row.id)
    api
      .delete(`/lugareshoteles/${row.slug}/`)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Hotel o Lugar eliminado correctamente',
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
const clearRegionesPesca = () => {
  if (regionespesca_search.value) {
    regionespesca_search.value = ''
    getRegionesPesca()
  }
}
const clearDestinos = () => {
  if (destinos_search.value) {
    destinos_search.value = ''
    getDestinos()
  }
}
const clearMarinas = () => {
  if (marinas_search.value) {
    marinas_search.value = ''
    getMarinas()
  }
}
const clearLanchasRegion = () => {
  if (lanchasregion_search.value) {
    lanchasregion_search.value = ''
    getLanchasRegion()
  }
}
const clearPolosPesca = () => {
  if (polospesca_search.value) {
    polospesca_search.value = ''
    getPolosPesca()
  }
}
const clearLugaresHoteles = () => {
  if (lugareshoteles_search.value) {
    lugareshoteles_search.value = ''
    getLugaresHoteles()
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
const getRegionesPesca = async () => {
  api
    .get(`/regionespesca/?search=${regionespesca_search.value}`)
    .then((response) => {
      regionespesca.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getDestinos = async () => {
  api
    .get(`/destinos/?search=${destinos_search.value}`)
    .then((response) => {
      destinos.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getMarinas = async () => {
  api
    .get(`/marinas/?search=${marinas_search.value}`)
    .then((response) => {
      marinas.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getLanchasRegion = async () => {
  api
    .get(`/lanchasregion/?search=${lanchasregion_search.value}`)
    .then((response) => {
      lanchasregion.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getPolosPesca = async () => {
  api
    .get(`/destpesca/?search=${polospesca_search.value}`)
    .then((response) => {
      polospesca.value = response.data
      //this.totalRows = this.operators.length
    })
    .catch((error) => {
      console.log(error)
    })
}
const getLugaresHoteles = async () => {
  api
    .get(`/lugareshoteles/?search=${lugareshoteles_search.value}`)
    .then((response) => {
      lugareshoteles.value = response.data
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
