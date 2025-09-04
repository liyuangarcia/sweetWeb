<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Tipo de Pesca</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="tipopesca.MPESCA"
                    label="Tipo de pesca"
                    dense
                    maxlength="10"
                    ref="refMPESCA"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn
                    @click="createTipoPesca()"
                    color="red-10"
                    :label="btnLabel"
                    icon="add"
                    class="q-mr-md"
                  />
                  <q-btn
                    @click="backtipopesca()"
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
const refMPESCA = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const tipopesca = ref({
  id: null,
  MPESCA: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refMPESCA.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/tipopesca/${slug.value}`)
    .then((response) => {
      tipopesca.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backtipopesca = () => {
  router.push('/maintenance/ships/tipopesca')
}

const validateInput = () => {
  refMPESCA.value.validate()
  return tipopesca.value.MPESCA
}

const createTipoPesca = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/tipopesca/${slug.value}/`, tipopesca.value)

        $q.notify({
          type: 'positive',
          message: 'Tipo de pesca actualizado correctamente!',
          caption: 'Tipo de pesca',
        })

        backtipopesca()
        return response.data
      } catch (error) {
        console.error('Error actualizando Tipo de pesca:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Tipo de pesca',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/tipopesca/`, tipopesca.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado el Tipo de pesca correctamente!',
            caption: 'Tipo de pesca',
          })
          backtipopesca()
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
