<template>
  <node-view-wrapper draggable="true" class="tiptap-image">
    <node-toolbar @delete="deleteNode"></node-toolbar>
    <img :src="node.attrs.src" :data-id="node.attrs.dataId" alt="" style="display: block">
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../NodeToolbar';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
  },

  props: nodeViewProps,
}
</script>