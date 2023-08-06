<script setup lang="ts">
import AppSelect from './components/Common/Form/AppSelect.vue';

type OptionsSelected = {
  id: number,
  label: string
}

const options = [
  {
    id: 0,
    label: 'test'
  },
  {
    id: 1,
    label: 'test_1'
  },
  {
    id: 2,
    label: 'test_2'
  },
  {
    id: 3,
    label: 'test_4'
  },
  {
    id: 4,
    label: 'test_5'
  },
  {
    id: 5,
    label: 'test_6'
  },
] as Array<OptionsSelected>;

function handleOptionsSelected(d: OptionsSelected) {
  // console.log(d);
}
</script>

<template>
  <div class="test">
    <AppSelect :options="options" @get-option-selected="handleOptionsSelected" />
  </div>
</template>

<style scoped></style>
