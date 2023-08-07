<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ArrowDownIcon from '../../icons/ArrowDown.vue';

type OptionsSelected = {
  id: number,
  label: string
};

type Styles = {
  borderColor?: string,
  fontSize?: string
}

const { optionsList, stylesOptions } = defineProps<{
  optionsList: Array<OptionsSelected>,
  stylesOptions?: Styles
}>();

const emit = defineEmits<{
  getOptionSelected: [OptionsSelected]
}>();

const optionSelected = ref<OptionsSelected>(optionsList[0]);
const divOptions = ref<HTMLDivElement>();

const styles = ref({
  border: `1px solid ${stylesOptions?.borderColor}`,
  fontSize: stylesOptions?.fontSize ? stylesOptions?.fontSize : '14px'
});

function handleChooseOption(d: OptionsSelected) {
  optionSelected.value = d;
  divOptions.value?.classList.remove('show');
  emit('getOptionSelected', optionSelected.value);
};

function handleShowSelectOptions() {
  divOptions.value?.classList.toggle('show');
};

onMounted(() => {
  document.addEventListener('click', event => {
    const selOp = document.getElementById('select-options');
    const eTarg = event.target as Element;
    const isOutside = selOp?.contains(eTarg);
    if (!isOutside) {
      divOptions.value?.classList.remove('show');
    }
  })
});

</script>
<template>
  <div class="select" id="select-options">
    <div class="select-wrapper" @click="handleShowSelectOptions" :style="styles">
      <input type="text" v-model="optionSelected.label" readonly />
      <ArrowDownIcon />
    </div>
    <div class="select-options" ref="divOptions" :style="styles">
      <div v-for="(i, index) in  optionsList " :key="`i-${index}`"
        :class="`select-options__option ${index === optionSelected.id ? `active` : ''}`" @click="handleChooseOption(i)">
        {{ i.label }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.select {
  position: relative;
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
      font-size: 14px;
      font-weight: 600;
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
    width: 100%;

    &.show {
      display: block;
    }

    &::-webkit-scrollbar {
      width: 3px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c2c2c2;
      border-radius: 10px;
    }

    &__option {
      font-family: 'Roboto', sans-serif;
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