<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ArrowDownIcon from '../../icons/ArrowDownIcon.vue';
import CheckIcon from '../../icons/CheckIcon.vue';
import { addStyle } from '../../../utils/addStyle'

type OptionsSelected = {
  id: number,
  label: string
};

type Theme = {
  color: string
}

const { optionsList, theme } = defineProps<{
  optionsList: Array<OptionsSelected>,
  theme: Theme
}>();

const emit = defineEmits<{
  getOptionSelected: [OptionsSelected]
}>();

const optionSelected = ref<OptionsSelected>({ ...optionsList[0] });
const divOptions = ref<HTMLDivElement>();
const divOverflow = ref<HTMLElement>();
const isActive = ref<boolean>(false);

const themeListParent = {
  border: `3px solid #${theme.color}4b`,
};
const themeListChild = {
  border: `1px solid #${theme.color}`,
};
const themeIconWrapper = {
  backgroundColor: `#${theme.color}4b`,
  color: `#${theme.color}4b`
};
const themeSvg = {
  color: `#${theme.color}4b`
};
const themeOption = {
  backgroundColor: `#${theme.color}4b`
};
const themeOptionActive = {
  backgroundColor: `#${theme.color}4b`,
  color: `#${theme.color}`
};

function handleChooseOption(d: OptionsSelected) {
  const selectWrapper = document.querySelector('.select-wrapper') as HTMLElement;
  const selectWrapperBorder = document.querySelector('.select-wrapper__border') as HTMLElement;
  const iconArrow = document.querySelector('.icon-arrow') as HTMLElement;
  const svg = document.querySelector('.icon-arrow > svg') as HTMLElement;
  const opSelected = document.querySelector('.select-options__option.active') as HTMLElement;
  opSelected.removeAttribute('style');
  const f = { ...d };
  optionSelected.value = f;
  emit('getOptionSelected', optionSelected.value);
  isActive.value = false;
  addStyle(iconArrow, themeIconWrapper);
  addStyle(svg, themeSvg);
  selectWrapper.removeAttribute('style'); //Remove all style in selectWrapper
  selectWrapperBorder.removeAttribute('style');
};

function handleShowSelectOptions() {
  const selectWrapper = document.querySelector('.select-wrapper') as HTMLElement;
  const selectWrapperBorder = document.querySelector('.select-wrapper__border') as HTMLElement;
  const iconArrow = document.querySelector('.icon-arrow') as HTMLElement;
  const svg = document.querySelector('.icon-arrow > svg') as HTMLElement;
  isActive.value = !isActive.value;
  if (isActive.value) {
    setTimeout(() => {
      const selectOptionsOption = document.querySelector('.select-options__option.active') as HTMLElement;
      addStyle(selectWrapperBorder, themeListChild);
      addStyle(selectWrapper, themeListParent);
      addStyle(selectOptionsOption, themeOptionActive);
      iconArrow.removeAttribute('style'); //Remove all style in iconArrow
      svg.removeAttribute('style'); //Remove all style in svg
    }, 10);
  } else {
    selectWrapper.removeAttribute('style');
    selectWrapperBorder.removeAttribute('style');
    addStyle(iconArrow, themeIconWrapper);
    addStyle(svg, themeSvg);
  }
};

const handleMouseEnterOption = (e: MouseEvent) => {
  const t = e.target as HTMLElement;
  if (theme.color) {
    addStyle(t, themeOption);
  }
};

const handleMouseLeaveOption = (e: MouseEvent) => {
  const t = e.target as HTMLElement;
  if (theme.color && !t.classList.contains('active')) {
    t.style.backgroundColor = 'transparent';
  }
};

onMounted(() => {
  const selectWrapper = document.querySelector('.select-wrapper') as HTMLElement;
  const selectWrapperBorder = document.querySelector('.select-wrapper__border') as HTMLElement;
  const iconArrow = document.querySelector('.icon-arrow') as HTMLElement;
  const svg = document.querySelector('.icon-arrow > svg') as HTMLElement;
  const selOp = document.getElementById('select-options');
  addStyle(iconArrow, themeIconWrapper);
  addStyle(svg, themeSvg);
  document.addEventListener('click', event => {
    const eTarg = event.target as Element;
    const isOutside = selOp?.contains(eTarg);
    if (!isOutside) {
      isActive.value = false //hiding options
      selectWrapper.removeAttribute('style'); //Remove all style in selectWrapper
      selectWrapperBorder.removeAttribute('style'); //Remove all style in selectWrapperBorder
      addStyle(iconArrow, themeIconWrapper);
      addStyle(svg, themeSvg);
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
        divOverflow.value!.scrollTo(0, positionChildren - positionParent + divOptions.value!.scrollTop - 5);
        break
      }
    }
  }
);

</script>
<template>
  <div class="select" id="select-options">
    <div :class="`select-wrapper ${isActive ? 'active' : ''}`" @click="handleShowSelectOptions">
      <div :class="`select-wrapper__border ${isActive ? 'active' : ''}`">
        <input type="text" v-model="optionSelected.label" :readonly="!isActive" />
        <div :class="`icon-arrow ${isActive ? 'active' : ''}`">
          <ArrowDownIcon />
        </div>
      </div>
    </div>
    <div :class="`select-options ${isActive ? 'show' : ''}`">
      <div class="select-options__overflow" ref="divOverflow">
        <div class="select-options__wrapper" ref="divOptions">
          <div v-for="(i, index) in  optionsList " :key="`i-${index}`"
            :class="`select-options__option ${index === optionSelected.id ? `active` : ''}`"
            @click="handleChooseOption(i)" @mouseenter="handleMouseEnterOption" @mouseleave="handleMouseLeaveOption">
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
    padding-right: 2px;

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
      padding: 6px 3px 6px 5px;
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
      font-size: 14px;

      /* &:hover {
        background-color: #7096f825;
      } */

      &.active {
        background-color: #7096f825;
        color: #4c7dfc;
        font-weight: 700;
      }

      svg {
        display: none;
        width: 18px;
        height: 18px;

        &.active {
          display: block;
        }
      }
    }
  }
}
</style>