<template>
  <div id="app" :class="{ inicial: isModulos }">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const isModulos = computed(() => route.path === '/' || route.name === 'modulos')
</script>

<style>
#app {
  font-family: OpenSans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--cor-fonte, #2c3e50);
  min-height: 100vh;
}
</style>
