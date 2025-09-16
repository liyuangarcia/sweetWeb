<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Tipo de carro</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="tipocarro.desctipocarro"
                    label="Tipo de carro"
                    dense
                    ref="refdesctipocarro"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createTipoCarro()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backtiposcarros()"
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
const refdesctipocarro = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const tipocarro = ref({
  id: null,
  desctipocarro: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refdesctipocarro.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/tiposcarros/${slug.value}`)
    .then((response) => {
      tipocarro.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backtiposcarros = () => {
  router.push('/maintenance/rentcar/tiposcarros')
}

const validateInput = () => {
  refdesctipocarro.value.validate()
  return tipocarro.value.desctipocarro
}

const createTipoCarro = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/tiposcarros/${slug.value}/`, tipocarro.value)

        $q.notify({
          type: 'positive',
          message: '¡Tipo Carro actualizada correctamente!',
          caption: 'Tipo Carro',
        })

        backtiposcarros()
        return response.data
      } catch (error) {
        console.error('Error actualizando Tipo carro:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar Tipo carro',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/tiposcarros/`, tipocarro.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado Tipo carro correctamente!',
            caption: 'Tipo carro',
          })
          backtiposcarros()
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
