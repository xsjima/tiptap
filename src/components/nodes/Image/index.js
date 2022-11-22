import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'tiptap-image',

  group: 'block',

  addAttributes() {
    return {
      'data-id': {
        default: null,
      },
      'data-src': {
        default: null,
      },
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'tiptap-image',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['tiptap-image', mergeAttributes(HTMLAttributes, this.options.HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})