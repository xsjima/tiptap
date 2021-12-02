<template>
  <img :src="node.attrs.src" :data-id="node.attrs.dataId" alt="" style="display: block">
</template>

<script>
import { nodeViewProps } from '@tiptap/vue-2';
export default {
  props: nodeViewProps,
}
</script>