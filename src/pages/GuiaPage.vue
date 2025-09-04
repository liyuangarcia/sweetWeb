<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Guia</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="guia.GNOMBREDELGUIA"
                    label="Nombre del Guia"
                    dense
                    ref="refGNOMBREDELGUIA"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createGuia()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backguia()"
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
const refGNOMBREDELGUIA = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const guia = ref({
  id: null,
  GNOMBREDELGUIA: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refGNOMBREDELGUIA.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/guiaspesca/${slug.value}`)
    .then((response) => {
      guia.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backguia = () => {
  router.push('/maintenance/ships/guias')
}

const validateInput = () => {
  refGNOMBREDELGUIA.value.validate()
  return guia.value.GNOMBREDELGUIA
}

const createGuia = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/guiaspesca/${slug.value}/`, guia.value)

        $q.notify({
          type: 'positive',
          message: '¡Guia actualizado correctamente!',
          caption: 'Aeropuerto',
        })

        backguia()
        return response.data
      } catch (error) {
        console.error('Error actualizando Guia:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Guia',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/guiaspesca/`, guia.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado el Guia correctamente!',
            caption: 'Guia',
          })
          backguia()
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
