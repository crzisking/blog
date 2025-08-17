<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from "@/views/Header/HeaderView.vue";
import {type CSSProperties} from "vue";
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
</script>

<template>
  <a-layout>
    <a-layout-header :style="headerStyle" >
      <HeaderView />
    </a-layout-header>
    <a-layout-content >
      111
      <RouterView />
    </a-layout-content>
    <a-layout-footer >Footer</a-layout-footer>
  </a-layout>
</template>

<style scoped>

</style>