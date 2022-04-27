import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

const nodeName = 'ce-image';

export default Node.create({
  name: nodeName,

  group: 'block',

  addAttributes() {
    return {
      'data-id': {
        default: null,
      },
      id: {
        default: null,
      },
      model_id: {
        default: null,
      },
      src: {
        default: '/images/no-photo.svg',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: nodeName,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [nodeName, mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})