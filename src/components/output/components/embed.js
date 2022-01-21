import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
  name: 'ce-embed',

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ce-embed',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', mergeAttributes({
      src: HTMLAttributes.src,
      frameborder: 0,
      allowfullscreen: true,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      width: '100%',
      height: '320px'
    }, HTMLAttributes)]
  },
})