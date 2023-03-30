<template>
  <div class="caja">
    <PanelTable header="Personas">
      <MenuBar :model="items" class="MenuBar" />
      <DataTable
        :value="personas"
        :paginator="true"
        :rows="10"
        v-model:selection="selectedPersona"
        selectionMode="single"
        dataKey="id"
        responsiveLayout="scroll"
      >
        <ColumnTable field="nombre" header="Nombre" :sortable="true"></ColumnTable>
        <ColumnTable field="apellido" header="Apellido" :sortable="true"></ColumnTable>
        <ColumnTable field="correo" header="Correo" :sortable="true"></ColumnTable>
        <ColumnTable field="sexo" header="Sexo" :sortable="true"></ColumnTable>
      </DataTable>
    </PanelTable>
  </div>
  <DialogTable :header="titulo" v-model:visible="displayModal" :modal="true">
    <span class="p-float-label space-label">
      <InputText
        id="nombre"
        v-model.trim="v$.persona.nombre.$model"
        :class="{ 'p-invalid': v$.persona.nombre.$error }"
      />
      <label for="nombre">Nombre</label>
      <small class="p-error" v-if="!v$.persona.nombre.required"
        >Nombre es obligatorio</small
      >
    </span>
    <span class="p-float-label space-label">
      <InputText
        id="apellido"
        v-model.trim="v$.persona.apellido.$model"
        :class="{ 'p-invalid': v$.persona.apellido.$error }"
      />
      <label for="apellido">Apellido</label>
      <small class="p-error" v-if="!v$.persona.apellido.required"
        >Apellido es obligatoria</small
      >
    </span>
    <span class="p-float-label space-label">
      <InputText
        id="correo"
        v-model.trim="v$.persona.correo.$model"
        :class="{ 'p-invalid': v$.persona.correo.$error }"
      />
      <label for="correo">Correo</label>
      <small class="p-error" v-if="!v$.persona.correo.required"
        >Correo es obligatorio</small
      >
    </span>
    <span class="p-float-label space-label">
      <InputText
        id="sexo"
        v-model.trim="v$.persona.sexo.$model"
        :class="{ 'p-invalid': v$.persona.sexo.$error }"
      />
      <label for="sexo">Sexo</label>
      <small class="p-error" v-if="!v$.persona.sexo.required"
        >Sexo es obligatorio</small
      >
    </span>
    <template #footer>
      <ButtonTable
        @click="closeCreateModal"
        label="Cancelar"
        icon="pi pi-times"
        class="p-button-text"
      />
      <ButtonTable
        @click="generate"
        @keyup.enter="generate"
        type="submit"
        label="Agregar"
        icon="pi pi-check"
        autofocus
      />
    </template>
  </DialogTable>

  <ToastTable position="top-right" />
</template>

<script>
import { email, required, not } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import Persona from "@/helper/Persona";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      submitted: false,
      showMessage: false,
      titulo: "",
      displayModal: false,
      personas: null,
      persona: {
        id: null,
        nombre: null,
        apellido: null,
        sexo: null,
        correo: null,
      },
      selectedPersona: {
        id: null,
        nombre: null,
        apellido: null,
        sexo: null,
        correo: null,
      },
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showCreateModal();
          },
        },
        {
          label: "Editar",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showEditModal();
          },
        },
        {
          label: "Borrar",
          icon: "pi pi-fw pi-trash",
          command: () => {
            this.delete();
          },
        },
        // {
        //   label: "Actualizar",
        //   icon: "pi pi-fw pi-refresh",
        //   command: () => {
        //     this.getAll();
        //   },
        // },
      ],
    };
  },
  // DI
  personaService: null,
  validations() {
    return {
      persona: {
        id: { required: not },
        nombre: { required },
        apellido: { required },
        sexo: {
          required,
        },
        correo: {
          required,
          email,
        },
      },
    };
  },
  created() {
    this.personaService = new Persona();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    generate() {
      if (!this.v$.$invalid) {
        if (this.titulo === "Agregar Persona") {
          this.save();
        }
        if (this.titulo === "Editar Persona") {
          this.edit();
        }
      }
    },
    getAll() {
      this.personaService.getAll().then((data) => {
        // console.log(data);
        this.personas = data.data;
      });
    },
    save() {
      console.log(this.persona);
      this.personaService.save(this.persona).then((data) => {
        if (data.status === 201) {
          this.showToast(
            `success`,
            `Agregar`,
            `${this.persona.nombre} fue agregado`
          );
          this.reset();
        }
      });
    },
    edit() {
      this.personaService.edit(this.persona).then((data) => {
        if (data.status === 200) {
          this.showToast(
            `warn`,
            `Editar`,
            `${this.persona.nombre} fue editado`
          );
          this.reset();
        }
      });
    },
    delete() {
      this.personaService.delete(this.selectedPersona).then((data) => {
        if (data.status === 204) {
          this.showToast(
            `error`,
            `Borrado`,
            `${this.selectedPersona.nombre} fue eliminado`
          );
          this.reset();
        }
      });
    },
    showCreateModal() {
      this.titulo = "Agregar Persona";
      this.displayModal = true;
    },
    closeCreateModal() {
      this.displayModal = false;
    },
    showEditModal() {
      this.titulo = "Editar Persona";
      this.persona = this.selectedPersona;
      this.displayModal = true;
    },
    reset() {
      this.displayModal = false;
      this.persona = {
        nombre: null,
        apellido: null,
        sexo: null,
        correo: null,
      };
      this.submitted = false;
      this.getAll();
    },
    showToast(severity, summary, detail) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    },
  },
};
</script>

<style scoped>
.caja {
  margin: 0 auto;
  width: 90%;
}

.space-label {
  margin: 2.5rem 1rem 2.5rem 1rem;
  display: flex;
  flex-flow: column wrap;
}

.MenuBar {
  margin: 0 0 0.5% 0;
}

.cajaDentro {
}
</style>