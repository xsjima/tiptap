import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'ce-image',

  addAttributes() {
    return {
      'data-id': {
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
        tag: 'ce-image',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },
})