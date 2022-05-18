<template>
  <div class="node-toolbar">
    <div class="node-toolbar-tools">
      <slot name="prepend"></slot>
      <node-toolbar-item title="Удалить" @click="$emit('delete')">
        <v-icon name="x" class="node-toolbar-tool"></v-icon>
      </node-toolbar-item>
    </div>
  </div>
</template>

<script>
import NodeToolbarItem from './NodeToolbarItem';

export default {
  components: {
    NodeToolbarItem
  },
}
</script>

<style lang="scss">
.node-toolbar {
  display: flex;
}
.node-toolbar-tools {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: rgba(0,0,0,.72);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  overflow: hidden;
}
.node-toolbar-tool {
  color: #fcfcfc;
  min-width: 28px;
  height: 28px;
  padding: 4px;
}
</style>