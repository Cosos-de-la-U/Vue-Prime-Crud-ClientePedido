<template>
  <MenuBar :model="items" class="menubar">
    <template #start>
      <span class="p-menuitem-text">Menu</span>
    </template>
  </MenuBar>
  <router-view/>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [
        {
          label: "Clientes",
          icon: "pi pi-fw pi-user",
          to: "/clientes"
        },
        {
          label: "Pedidos",
          icon: "pi pi-fw pi-shopping-cart",
          to: "/pedidos"
        },
      ],
    };
  },
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.menubar {
  margin: 0 0 30px 0;
}

.logo {
  width: 3.5rem;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
