<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ArrowDownIcon from '../../icons/ArrowDownIcon.vue';
import CheckIcon from '../../icons/CheckIcon.vue';

type OptionsSelected = {
  id: number,
  label: string
};

//TODO: ADD ANOTHER STYLE
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

const optionSelected = ref<OptionsSelected>({ ...optionsList[0] });
const divOptions = ref<HTMLDivElement>();
const divOverflow = ref<HTMLElement>();
const isActive = ref<boolean>(false);

const styles = ref({
  border: `1px solid ${stylesOptions?.borderColor}`,
  fontSize: stylesOptions?.fontSize ? stylesOptions?.fontSize : '14px'
});

function handleChooseOption(d: OptionsSelected) {
  const f = { ...d };
  optionSelected.value = f;
  emit('getOptionSelected', optionSelected.value);
  isActive.value = false

};

function handleShowSelectOptions() {
  isActive.value = !isActive.value;

};

onMounted(() => {
  document.addEventListener('click', event => {
    const selOp = document.getElementById('select-options');
    const eTarg = event.target as Element;
    const isOutside = selOp?.contains(eTarg);
    if (!isOutside) {
      divOptions.value?.classList.remove('show');
      isActive.value = false
    }
  })
});

watch(() => optionSelected.value.label,
  (n) => {
    for (let i = 0; i < optionsList.length; i++) {
      const regex = new RegExp(n, "i");
      // console.log(optionsList[i].label.match(regex));
      if (optionsList[i].label.match(regex)) {
        const positionParent = divOptions.value!.getBoundingClientRect().y;
        const positionChildren = divOptions.value!.children[i].getBoundingClientRect().y;
        divOverflow.value!.scrollTo(0, positionChildren - positionParent + divOptions.value!.scrollTop);
        break
      }
    }
  }
);

</script>
<template>
  <div class="select" id="select-options">
    <div :class="`select-wrapper ${isActive ? 'active' : ''}`" @click="handleShowSelectOptions" :style="styles">
      <div :class="`select-wrapper__border ${isActive ? 'active' : ''}`">
        <input type="text" v-model="optionSelected.label" :readonly="!isActive" />
        <div :class="`icon-arrow ${isActive ? 'active' : ''}`">
          <ArrowDownIcon />
        </div>
      </div>
    </div>
    <div :class="`select-options ${isActive ? 'show' : ''}`" :style="styles">
      <div class="select-options__overflow" ref="divOverflow">
        <div class="select-options__wrapper" ref="divOptions">
          <div v-for="(i, index) in  optionsList " :key="`i-${index}`"
            :class="`select-options__option ${index === optionSelected.id ? `active` : ''}`"
            @click="handleChooseOption(i)">
            {{ i.label }}
            <CheckIcon :class="`${index === optionSelected.id ? `active` : ''}`" />
          </div>
        </div>
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
    height: 40px;
    border-radius: 14px;
    cursor: pointer;
    padding: 1px 0;
    border: 1px solid #dfdfdf;

    &.active {
      border: 3px solid #4c7efc4b;

    }

    &__border {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;
      padding-right: 8px;
      padding-left: 10px;
      border-radius: 12px;

      &.active {
        border: 1px solid #4c7dfc;

      }
    }

    input {
      cursor: pointer;
      border: none;
      border-radius: 12px;
      height: 95%;
      width: 98%;
      font-size: 14px;
      font-weight: 500;
      color: #3f3f3f;
      text-transform: capitalize;
      outline: none;
    }

    .icon-arrow {
      background-color: #7096f825;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rem;
      width: 26px;
      height: 24px;

      svg {
        color: #4c7dfc;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      &.active {
        background-color: transparent;
        transform: rotate(180deg);

        svg {
          color: #c3c5c7;
        }
      }

    }
  }

  &-options {
    margin-top: 4px;
    border: 1px solid #dfdfdf;
    border-radius: 12px;
    height: 160px;
    text-transform: capitalize;
    display: none;
    position: absolute;
    min-width: 250px;
    width: 100%;
    padding-right: 5px;

    &__overflow {
      overflow: auto;
      height: 100%;

      &::-webkit-scrollbar {
        width: 4px;
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #c2c2c2;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }

    &__wrapper {
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &.show {
      display: block;
    }



    &__option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      padding: 12px;
      cursor: pointer;
      border-radius: 8px;
      color: #3f3f3f;

      svg {
        display: none;
        width: 18px;
        height: 18px;

        &.active {
          display: block;
        }
      }

      &:hover {
        background-color: #7096f825;
      }

      &.active {
        background-color: #7096f825;
        color: #4c7dfc;
        font-weight: 700;
      }
    }
  }
}
</style>