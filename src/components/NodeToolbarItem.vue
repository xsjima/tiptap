<template>
  <button type="button" :title="title" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    }
  }
}
</script>

<style lang="scss">

.node-toolbar-tool {
  color: #fcfcfc;
  min-width: 28px;
  height: 28px;
  padding: 4px;
}
</style>