<template>
  <div class="caja">
    <PanelTable header="Pedidos">
      <MenuBar :model="items" class="MenuBar" />
      <DataTable
        :value="pedidos"
        :paginator="true"
        :rows="10"
        v-model:selection="selectedPedido"
        selectionMode="single"
        dataKey="id"
        responsiveLayout="scroll"
      >
        <ColumnTable field="nombre" header="Nombre"></ColumnTable>
        <ColumnTable field="fecha" header="Fecha"></ColumnTable>
        <ColumnTable field="total" header="Total"></ColumnTable>
        <ColumnTable field="estado" header="Estado"></ColumnTable>
      </DataTable>
    </PanelTable>
  </div>

  <DialogTable :header="titulo" v-model:visible="displayModal" :modal="true">
    <span class="p-float-label space-label">
      <DropDown
        v-model="selectedCliente"
        :options="pedidoClientes"
        optionLabel="nombre"
        optionValue="idCliente"
        placeholder="Seleciona un cliente"
      />
      <label for="cliente">Cliente</label>
    </span>
    <span class="p-float-label space-label">
      <CalendarTable
        v-model="pedido.fecha"
        inputId="pedido.fecha"
        dateFormat="yy-mm-dd"
        :showTime="false"
      />
      <label for="fecha">fecha</label>
    </span>
    <span class="p-float-label space-label">
      <InputNumber id="total" type="text" v-model="pedido.total"  />
      <label for="total">Total</label>
    </span>
    <span class="p-float-label space-label">
      <InputText id="estado" type="text" v-model="pedido.estado" />
      <label for="estado">Estado</label>
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
import dayjs from 'dayjs';
import pedido from "@/helper/Pedido";
import cliente from "@/helper/Cliente";
export default {
  data() {
    return {
      titulo: "",
      displayModal: false,
      pedidos: null,
      selectedCliente: null,
      pedidoClientes: {
        idCliente: null,
        nombre: null,
      },
      pedido: {
        id: null,
        idCliente: null,
        nombre: null,
        fecha: null,
        total: null,
        estado: null,
      },
      selectedPedido: {
        id: null,
        idCliente: null,
        nombre: null,
        fecha: null,
        total: null,
        estado: null,
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
  pedidoService: null,
  clienteService: null,
  created() {
    this.pedidoService = new pedido();
    this.clienteService = new cliente();
  },
  mounted() {
    this.getAll();
    this.clientNames();
  },
  methods: {
    generate() {
      if (this.titulo === "Agregar Pedido") {
        this.save();
      }
      if (this.titulo === "Editar Pedido") {
        this.edit();
      }
    },
    getAll() {
      this.pedidoService.getAll().then((data) => {
        this.pedidos = data.data;
      });
    },
    save() {
      // destructure
      const { fecha, total, estado } = this.pedido;
      // date
      const fDate = dayjs(fecha).format('YYYY-MM-DD')
      // create the object
      this.pedido = {
        idCliente: Number(this.selectedCliente),
        fecha: fDate,
        total: Number(total),
        estado: estado,
      };
      console.log(this.pedido);
      this.pedidoService.save(this.pedido).then((data) => {
        if (data.status === 201) {
          this.showToast(
            `success`,
            `Agregar`,
            `El pedido fue agregado`
          );
          this.reset();
        }
      });
    },
    edit() {
       // destructure
       const { id, fecha, total, estado } = this.pedido;
      // date
      const fDate = dayjs(fecha).format('YYYY-MM-DD')
      // create the object
      this.pedido = {
        id: Number(id),
        idCliente: Number(this.selectedCliente),
        fecha: fDate,
        total: Number(total),
        estado: estado,
      };
      console.log(this.pedido);
      this.pedidoService.edit(this.pedido).then((data) => {
        if (data.status === 200) {
          this.showToast(`warn`, `Editar`, `El pedido fue editado`);
          this.reset();
        }
      });
    },
    delete() {
      this.pedidoService.delete(this.selectedPedido).then((data) => {
        if (data.status === 204) {
          this.showToast(
            `error`,
            `Borrado`,
            `${this.selectedPedido.nombre} fue eliminado`
          );
          this.reset();
        }
      });
    },
    async clientNames() {
      await this.clienteService.getAll().then((response) => {
        this.pedidoClientes = response.data.map((e) => {
          return {
            idCliente: e.id,
            nombre: e.nombre,
          };
        });
      });
    },
    showCreateModal() {
      this.titulo = "Agregar Pedido";
      this.displayModal = true;
    },
    closeCreateModal() {
      this.displayModal = false;
      this.reset();
    },
    showEditModal() {
      this.titulo = "Editar Pedido";
      this.pedido = this.selectedPedido;
      this.selectedCliente = this.selectedPedido.idCliente;
      this.displayModal = true;
    },
    reset() {
      this.displayModal = false;
      this.pedido = {
        id: null,
        idCliente: null,
        nombre: null,
        fecha: null,
        total: null,
        estado: null,
      };
      this.getAll();
      this.clientNames();
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