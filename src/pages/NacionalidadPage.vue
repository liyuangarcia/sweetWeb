<template>
  <q-page class="flex flex-center">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="q-pa-md">
          <div class="page-container">
            <div class="filter-section">
              <div class="text-h6">Agregar nacionalidad</div>
              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-3">
                  <q-input
                    filled
                    v-model="nacionalidad.descripcion"
                    label="Nacionalidad"
                    dense
                    ref="refdescripcion"
                    :rules="[(val) => !!val || 'Valor requerido']"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row justify-end q-mt-md">
                <q-btn
                  @click="createNacionalidad()"
                  color="red-10"
                  :label="btnLabel"
                  icon="add"
                  class="q-mr-md"
                />
                <q-btn
                  @click="backnacionalidades()"
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
const refdescripcion = ref(null)

const slug = ref(route.params.slug)

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const nacionalidad = ref({
  id: null,
  descripcion: '',
  slug: '',
})

onMounted(() => {
  if (props.isEditing) loadEdit()

  nextTick(() => {
    refdescripcion.value.focus()
  })
})

const loadEdit = () => {
  api
    .get(`/nacionalidades/${slug.value}`)
    .then((response) => {
      nacionalidad.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const btnLabel = props.isEditing ? ref('Modificar') : ref('Agregar')

const backnacionalidades = () => {
  router.push('/maintenance/nacionalidades/nacionalidades')
}

const validateInput = () => {
  refdescripcion.value.validate()
  return nacionalidad.value.descripcion
}

const createNacionalidad = async () => {
  if (validateInput()) {
    if (props.isEditing) {
      try {
        const response = await api.put(`/nacionalidades/${slug.value}/`, nacionalidad.value)

        $q.notify({
          type: 'positive',
          message: '¡Nacionalidad actualizada correctamente!',
          caption: 'Nacionalidad',
        })

        backnacionalidades()
        return response.data
      } catch (error) {
        console.error('Error actualizando Nacionalidad:', error)

        $q.notify({
          type: 'negative',
          message: 'Error al actualizar la Nacionalidad',
          caption: error.response?.data?.message || 'Intenta nuevamente',
        })

        throw error // Puedes opcionalmente relanzar el error
      }
    } else {
      api
        .post(`/nacionalidades/`, nacionalidad.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: '¡Creado la Nacionalidad correctamente!',
            caption: 'Nacionalidad',
          })
          backnacionalidades()
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
