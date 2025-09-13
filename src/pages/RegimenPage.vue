<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Regimen</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    ref="refTPLANALIM"
                    filled
                    v-model="regimen.TPLANALIM"
                    label="Regimen"
                    dense
                    maxlength="3"
                    @update:model-value="convertToUpper"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createRegimen()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backregimenes()"
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
const refTPLANALIM = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const regimen = ref({
  id: null,
  TPLANALIM: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refTPLANALIM.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/regimenes/${slug.value}`)
    .then((response) => {
      regimen.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const convertToUpper = (newValue) => {
  regimen.value.TPLANALIM = newValue.toUpperCase().slice(0, 3)
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backregimenes = () => {
  router.push('/maintenance/hospedaje/regimenes')
}

const validateInput = () => {
  refTPLANALIM.value.validate()
  return regimen.value.TPLANALIM
}

const createRegimen = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/regimenes/${slug.value}/`, regimen.value)

        $q.notify({
          type: 'positive',
          message: 'Regimen actualizado correctamente!',
          caption: 'Regimen',
        })

        backregimenes()
        return response.data
      } catch (error) {
        console.error('Error actualizando Regimenes:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar Regimenes',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/regimenes/`, regimen.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado Regimen correctamente!',
            caption: 'Regimen',
          })
          backregimenes()
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
