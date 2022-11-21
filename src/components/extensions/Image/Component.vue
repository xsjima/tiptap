<template>
  <node-view-wrapper draggable="true" class="tiptap-image">
    <node-toolbar @delete="deleteNode">
      <template #prepend>
        <node-toolbar-item
          icon="check"
          :class="{'bg-green hover:bg-green': parseInt(editor.contentComponent.$parent.coverId) === parseInt(node.attrs['data-id'])}"
          @click="editor.contentComponent.$emit('cover', node.attrs['data-id'])"
        >
          <div class="node-toolbar-tool">Обложка</div>
        </node-toolbar-item>
      </template>
    </node-toolbar>

    <img
      :src="node.attrs.src"
      :data-id="node.attrs['data-id']"
      :data-src="node.attrs['data-src']"
      alt=""
      :class="{'bg-gray p-1': selected}"
      class="block" />
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