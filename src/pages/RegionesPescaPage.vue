<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Region de Pesca</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="regionpesca.REGIONES"
                    label="Region de pesca"
                    dense
                    maxlength="10"
                    ref="refREGIONES"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn
                    @click="createRegionPesca()"
                    color="red-10"
                    :label="btnLabel"
                    icon="add"
                    class="q-mr-md"
                  />
                  <q-btn
                    @click="backregionpesca()"
                    color="grey"
                    icon="arrow_back"
                    label="Regresar"
                    outline
                  />
                </div>
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
const refREGIONES = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const regionpesca = ref({
  id: null,
  REGIONES: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refREGIONES.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/regionespesca/${slug.value}`)
    .then((response) => {
      regionpesca.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backregionpesca = () => {
  router.push('/maintenance/destinations/regionespesca')
}

const validateInput = () => {
  refREGIONES.value.validate()
  return regionpesca.value.REGIONES
}

const createRegionPesca = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/regionespesca/${slug.value}/`, regionpesca.value)

        $q.notify({
          type: 'positive',
          message: 'Region de pesca actualizado correctamente!',
          caption: 'Region de pesca',
        })

        backregionpesca()
        return response.data
      } catch (error) {
        console.error('Error actualizando Region de pesca:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Region de pesca',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/regionespesca/`, regionpesca.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado el Region de pesca correctamente!',
            caption: 'Region de pesca',
          })
          backregionpesca()
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
