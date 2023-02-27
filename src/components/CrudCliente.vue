<template>
  <div class="caja">
    <PanelTable header="Clientes">
      <MenuBar :model="items" class="MenuBar" />
      <DataTable
        :value="clientes"
        :paginator="true"
        :rows="10"
        v-model:selection="selectedCliente"
        selectionMode="single"
        dataKey="id"
        responsiveLayout="scroll"
      >
        <ColumnTable field="nombre" header="Nombre"></ColumnTable>
        <ColumnTable field="direccion" header="Direccion"></ColumnTable>
        <ColumnTable field="telefono" header="Telefono"></ColumnTable>
        <ColumnTable field="email" header="E-mail"></ColumnTable>
      </DataTable>
    </PanelTable>
  </div>
  <DialogTable :header="titulo" v-model:visible="displayModal" :modal="true">
    <span class="p-float-label space-label">
      <InputText id="nombre" type="text" v-model="cliente.nombre" required />
      <label for="nombre">Nombre</label>
      <span v-if="$v.cliente.nombre.$error">Nombre is required</span>
    </span>
    <span class="p-float-label space-label">
      <InputText
        id="direccion"
        type="text"
        v-model="cliente.direccion"
        required
      />
      <label for="direccion">Direccion</label>
    </span>
    <span class="p-float-label space-label">
      <InputMask
        v-model="cliente.telefono"
        id="telefono"
        mask="99999999"
        :regEx="/^([27]\d{7})$/"
      />
      <label for="telefono">Telefono</label>
    </span>
    <span class="p-float-label space-label">
      <InputText id="email" type="email" v-model="cliente.email" required />
      <label for="email">E-Mail</label>
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
        label="Agregar"
        icon="pi pi-check"
        autofocus
      />
    </template>
  </DialogTable>

  <ToastTable position="top-right" />
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Cliente from "@/helper/Cliente";
export default {
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      titulo: "",
      displayModal: false,
      clientes: null,
      cliente: {
        id: null,
        nombre: null,
        direccion: null,
        telefono: null,
        email: null,
      },
      selectedCliente: {
        id: null,
        nombre: null,
        direccion: null,
        telefono: null,
        email: null,
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
        {
          label: "Actualizar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          },
        },
      ],
    };
  },
  // DI
  clienteService: null,
  validations() {
    return {
      cliente: {
        id: required,
        nombre: required,
        direccion: required,
        telefono: required,
        email: {
          required,
          email
        },
      },
    };
  },
  created() {
    this.clienteService = new Cliente();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    generate() {
      if (this.titulo === "Agregar Cliente") {
        this.save();
      }
      if (this.titulo === "Editar Cliente") {
        this.edit();
      }
    },
    getAll() {
      this.clienteService.getAll().then((data) => {
        console.log(data);
        this.clientes = data.data;
      });
    },
    save() {
      console.log(this.cliente);
      this.clienteService.save(this.cliente).then((data) => {
        if (data.status === 201) {
          this.showToast(
            `success`,
            `Agregar`,
            `${this.cliente.nombre} fue agregado`
          );
          this.reset();
        }
      });
    },
    edit() {
      this.clienteService.edit(this.cliente).then((data) => {
        if (data.status === 200) {
          this.showToast(
            `warn`,
            `Editar`,
            `${this.cliente.nombre} fue editado`
          );
          this.reset();
        }
      });
    },
    delete() {
      this.clienteService.delete(this.selectedCliente).then((data) => {
        if (data.status === 204) {
          this.showToast(
            `error`,
            `Borrado`,
            `${this.selectedCliente.nombre} fue eliminado`
          );
          this.reset();
        }
      });
    },
    showCreateModal() {
      this.titulo = "Agregar Cliente";
      this.displayModal = true;
    },
    closeCreateModal() {
      this.displayModal = false;
    },
    showEditModal() {
      this.titulo = "Editar Cliente";
      this.cliente = this.selectedCliente;
      this.displayModal = true;
    },
    reset() {
      this.displayModal = false;
      this.cliente = {
        nombre: null,
        direccion: null,
        telefono: null,
        email: null,
      };
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
}

.MenuBar {
  margin: 0 0 0.5% 0;
}
</style>