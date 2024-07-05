<template>
  <div id="app">
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :is="Component"
            :key="$route.name"
            v-if="$route.meta.keepAlive"
          />
        </keep-alive>
        <component
          :is="Component"
          :key="$route.name"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide, nextTick, ref } from "vue";
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
