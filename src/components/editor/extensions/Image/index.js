import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './Component.vue'

export default Node.create({
  name: 'Image',

  group: 'block',

  draggable: true,

  addAttributes() {
    return {
      dataId: {
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
        tag: 't-image',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['t-image', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})