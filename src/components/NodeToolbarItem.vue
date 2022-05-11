<template>
  <button type="button" :title="title" @click="$emit('click')">
    <v-icon :name="icon" class="node-toolbar-tool"></v-icon>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss">
.node-toolbar-tool {
  color: #fcfcfc;
  width: 28px;
  height: 28px;
  padding: 4px;
}
</style>