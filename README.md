# select-vue3

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A simple select component for vuejs 3.

Features:

- Search
- Custom Color

## Demo

![select-vue3 Demo](src/assets/video/demo.gif)

## Installation

Install select-vue3 with npm

```bash
npm install select-vue3
```

## Usage/Examples

```vue
<script setup>
import { AppSelect } from "select-vue3";

const options = [
  {
    id: 0,
    label: "Aaren",
  },
  {
    id: 1,
    label: "Abagael",
  },
  {
    id: 2,
    label: "Abbe",
  },
  {
    id: 3,
    label: "Abbi",
  },
  {
    id: 4,
    label: "Abbie",
  },
  {
    id: 5,
    label: "Abigale",
  },
];

const theme = {
  color: "4c7dfc", //code color without '#'
}; // Custom color theme

function handleOptionsSelected(d) {
  console.log(d); // output: option selected from AppSelect
}
</script>

<template>
  <AppSelect
    :options-list="options"
    :theme="theme"
    @get-option-selected="handleOptionsSelected"
  />
</template>
```

## Authors

- [dodaxx](https://www.github.com/dodaxx)

## Contributors

- [hantsaniala](https://www.github.com/hantsaniala)

## TODOS

- Custom design
