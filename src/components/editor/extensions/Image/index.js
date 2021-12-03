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
      model_id: {
        default: null,
      },
      src: {
        default: 'https://sun9-2.userapi.com/impg/0mm6xgySP_9hgMqYZjrloxolWTryJH7BVXMLvA/FoeI8j6VURs.jpg?size=998x998&quality=96&sign=5e0acc253b6fac7a98c2a2cae968f350&type=album',
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