import { Node, mergeAttributes, markInputRule } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state';
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Component from './Component.vue';

const youtubeRegExp =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
const youtubeExtractId = url => {
  const match = youtubeRegExp.exec(url.trim());
  return match ? match[1] : false;
};

export default Node.create({
  name: 'provider',

  group: 'block',

  addAttributes() {
    return {
      'data-id': {
        default: null,
      },
      'data-name': {
        default: 'youtube',
      },
    };
  },

  inputRules ({ type }) {
    return [
      markInputRule({
        find: youtubeRegExp,
        type,
      })
    ]
  },

  parseHTML() {
    return [
      {
        tag: this.name,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(HTMLAttributes, this.options.HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },

  addCommands() {
    return {
      insertVideoPlayer:
        (options) =>
          ({ chain, editor }) => {
            const { url } = options;
            const videoId = youtubeExtractId(url);
            if (videoId) {
              const { selection } = editor.state;

              return chain()
                .insertContentAt(selection.$head.before(), [
                  {
                    type: this.name,
                    attrs: { 'data-id': videoId, 'data-name': "youtube" },
                  },
                ])
                .run();
            }
            return false;
          },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("handlePasteVideoURL"),
        props: {
          handlePaste: (view, _event, slice) => {
            // Only look at one-line paste content
            if (slice.content.childCount !== 1) return false;

            const { state } = view;
            const { selection } = state;
            const { empty } = selection;

            // Pass through if something is selected
            if (!empty) return false;

            const pos = selection.$head;
            const node = pos.node();

            // Only continue if pasting on empty line
            if (node.content.size > 0) return false;

            let textContent = "";

            slice.content.forEach((node) => {
              textContent += node.textContent;
            });

            const videoId = youtubeExtractId(textContent);

            if (!videoId) return false;

            this.editor
                .chain()
                .insertContentAt(pos.before(), [
                  {
                    type: this.name,
                    attrs: { 'data-id': videoId, 'data-name': "youtube" },
                  },
                ])
                .run();

            return true;
          },
        },
      }),
    ];
  },

})