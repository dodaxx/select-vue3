<script setup lang="ts">
import AppSelect from './components/Common/Form/AppSelect.vue';

type OptionsSelected = {
  id: number,
  label: string
}

const options = [
  {
    id: 0,
    label: 'Aaron'
  },
  {
    id: 1,
    label: 'Baron'
  },
  {
    id: 2,
    label: 'Cynthia'
  },
  {
    id: 3,
    label: 'David'
  },
  {
    id: 4,
    label: 'Elia'
  },
  {
    id: 5,
    label: 'Fako'
  },
  {
    id: 6,
    label: 'Game'
  },
  {
    id: 7,
    label: 'GameGame'
  },
  {
    id: 8,
    label: 'IA'
  },
  {
    id: 9,
    label: 'Jeux'
  },
  {
    id: 10,
    label: 'Kaoli'
  },
  {
    id: 11,
    label: 'Mere'
  },

] as Array<OptionsSelected>;

function handleOptionsSelected(d: OptionsSelected) {
  console.log(d);
}


</script>

<template>
  <div class="test">
    <AppSelect :options-list="options" @get-option-selected="handleOptionsSelected" />
  </div>
</template>

<style scoped>
.test {
  width: 270px;
}
</style>
