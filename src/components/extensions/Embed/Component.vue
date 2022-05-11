<template>
  <node-view-wrapper draggable="true"  class="tiptap-video">
    <node-toolbar @delete="deleteNode"></node-toolbar>
    <iframe width="100%" height="320" :src="`https://www.youtube.com/embed/${node.attrs['data-id']}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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