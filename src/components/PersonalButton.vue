<template>
  <button class="personal-button">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<style scoped>
.personal-button {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
</style>