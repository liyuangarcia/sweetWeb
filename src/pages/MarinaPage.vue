<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar Marina</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="marina.Lmarina"
                    label="Lmarina"
                    dense
                    maxlength="20"
                    ref="refLmarina"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="marina.Nmarina"
                    label="Nmarina"
                    dense
                    maxlength="50"
                    ref="refNmarina"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="marina.NoficialMarina"
                    label="NoficialMarina"
                    dense
                    maxlength="50"
                    ref="refNoficialMarina"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn
                    @click="createMarina()"
                    color="red-10"
                    :label="btnLabel"
                    icon="add"
                    class="q-mr-md"
                  />
                  <q-btn
                    @click="backmarinas()"
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
const refLmarina = ref(null)
const refNmarina = ref(null)
const refNoficialMarina = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const marina = ref({
  id: null,
  Lmarina: '',
  Nmarina: '',
  NoficialMarina: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refLmarina.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/marinas/${slug.value}`)
    .then((response) => {
      marina.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backmarinas = () => {
  router.push('/maintenance/destinations/marinas')
}

const validateInput = () => {
  refLmarina.value.validate()
  refNmarina.value.validate()
  refNoficialMarina.value.validate()
  return marina.value.Lmarina && marina.value.Nmarina && marina.value.NoficialMarina
}

const createMarina = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/marinas/${slug.value}/`, marina.value)

        $q.notify({
          type: 'positive',
          message: 'Marina actualizada correctamente!',
          caption: 'Marina',
        })

        backmarinas()
        return response.data
      } catch (error) {
        console.error('Error actualizando Marina:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar el Marina',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/marinas/`, marina.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado la Marina correctamente!',
            caption: 'Marina',
          })
          backmarinas()
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
