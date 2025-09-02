<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar aeropuerto</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="aeropuerto.aaerodescripcion" label="Aeropuerto" dense>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="aeropuerto.alugar" label="Ubicacion" dense> </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input filled v-model="aeropuerto.asiglas" label="Siglas" dense> </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn color="red-10" label="Agregar" icon="add" class="q-mr-md" />
                <q-btn
                  @click="backairports()"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const aeropuerto = ref({
  id: null,
  anumero: '',
  aaerodescripcion: '',
  alugar: '',
  asiglas: '',
  slug: '',
})

const backairports = () => {
  router.push('/maintenance')
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
