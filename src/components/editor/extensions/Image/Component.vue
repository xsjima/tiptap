<template>
  <node-view-wrapper draggable="true" class="tiptap-image">
    <node-toolbar @delete="deleteNode">
      <template #prepend>
        <node-toolbar-item
          title="Установить на обложку"
          icon="check"
          :class="{'bg-green hover:bg-green': parseInt(editor.contentComponent.$parent.coverId) === parseInt(node.attrs['data-id'])}"
          @click="editor.contentComponent.$emit('cover', node.attrs['data-id'])"
        >
        </node-toolbar-item>
      </template>
    </node-toolbar>

    <img :src="node.attrs.src" :data-id="node.attrs['data-id']" alt="" style="display: block">
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../NodeToolbar';
import NodeToolbarItem from '../../NodeToolbarItem';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
    NodeToolbarItem,
  },

  props: nodeViewProps,
}
</script>