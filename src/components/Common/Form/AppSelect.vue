<script setup lang="ts">
import { ref } from 'vue';
import ArrowDownIcon from '../../icons/ArrowDown.vue';

type OptionsSelected = {
  id: number,
  label: string
}

const props = defineProps<{
  options: Array<OptionsSelected>
}>();

const emit = defineEmits<{
  getOptionSelected: [OptionsSelected]
}>()

const optionSelected = ref<OptionsSelected>(props.options[0]);
const divOptions = ref<HTMLDivElement>();

function handleChooseOption(d: OptionsSelected) {
  optionSelected.value = d;
  divOptions.value?.classList.remove('show');
  emit('getOptionSelected', optionSelected.value);
};

function handleShowSelectOptions() {
  divOptions.value?.classList.toggle('show');
};


</script>
<template>
  <div class="select">
    <div class="select-wrapper" @click="handleShowSelectOptions">
      <input type="text" v-model="optionSelected.label" readonly />
      <ArrowDownIcon />
    </div>
    <div class="select-options" ref="divOptions">
      <div v-for="(i, index) in options" :key="`i-${index}`"
        :class="`select-options__option ${index === optionSelected.id ? `active` : ''}`" @click="handleChooseOption(i)">
        {{ i.label }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.select {
  color: #515151;

  &-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c2c2c2;
    height: 34px;
    border-radius: 4px;
    padding-right: 5px;
    padding-left: 3px;
    cursor: pointer;

    input {
      cursor: pointer;
      border: none;
      border-radius: 6px;
      height: 95%;
      width: 98%;
      font-size: 16px;
      color: #515151;
      text-transform: capitalize;
      outline: none;
    }

    svg {
      color: #c3c5c7;
      width: 24px;
      height: 22px;
      cursor: pointer;

    }
  }

  &-options {
    margin-top: 4px;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    height: 140px;
    overflow: auto;
    text-transform: capitalize;
    display: none;
    position: absolute;
    min-width: 250px;

    &.show {
      display: block;
    }

    &::-webkit-scrollbar {
      width: 4px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c2c2c2;
      border-radius: 10px;
    }

    &__option {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      padding: 8px 4px;
      border-bottom: 1px solid #efefef;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        background-color: #f0f0f0;
      }

      &:nth-child(1) {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom: 1px solid transparent;

      }
    }
  }
}
</style>