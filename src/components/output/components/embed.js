import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
  name: 'ce-embed',

  addAttributes() {
    return {
      'video-id': {
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
      src: `https://www.youtube.com/embed/${HTMLAttributes['video-id']}`,
      frameborder: 0,
      allowfullscreen: true,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      width: '100%',
      height: '320px'
    }, HTMLAttributes)]
  },
})