<template>
  <div>
    <bubble-menu :editor="editor" v-if="editor" :should-show="bubbleMenuShouldShow">
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        Заголовок
      </button>
      <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        Жирный
      </button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        Наклонный
      </button>
      <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
        Зачеркнутый
      </button>
    </bubble-menu>
    <floating-menu :editor="editor" v-if="editor">
      <button type="button" @click="$refs.images.click()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      </button>
      <button type="button" @click="addVideo">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
      </button>
    </floating-menu>
    <editor-content :editor="editor" @cover="$emit('update:coverId', $event)" class="prose-sm" />
    <input type="file" ref="images" style="display: none;" @change="addImage" multiple>
  </div>
</template>
<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu, isTextSelection, isNodeSelection } from '@tiptap/vue-2'
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Typography from '@tiptap/extension-typography';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor'
import History from '@tiptap/extension-history';
import Bold from '@tiptap/extension-bold';
import Strike from '@tiptap/extension-strike'
import Italic from '@tiptap/extension-italic';
import Image from './extensions/Image';
import Embed from './extensions/Embed';

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default() {
        return [];
      }
    },
    coverId: {
      type: Number
    },
    contentType: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        Document,
        Text,
        Bold,
        Strike,
        Italic,
        Paragraph,
        Typography,
        Dropcursor,
        Gapcursor,
        History,
        Heading,
        Placeholder.configure({
          placeholder: 'Напишите что-нибудь...',
        }),
        Image,
        Embed,
      ],
      onUpdate: ({ editor }) => {
        const getJSON = editor.getJSON();
        const images = [];

        getJSON.content.forEach(el => {
          if (el.type === 'ce-image') {
            images.push({
              id: el.attrs['data-id'],
              model_id: el.attrs.model_id,
            });
          }
        });

        this.$emit('update:images', images);
        this.$emit('input', editor.getHTML());
      },
    })
  },

  methods: {
    bubbleMenuShouldShow({ state, from, to }) {
      const { doc, selection } = state
      const { empty } = selection

      if (isNodeSelection(state.selection)) {
        return false;
      }

      // Sometime check for `empty` is not enough.
      // Doubleclick an empty paragraph returns a node size of 2.
      // So we check also for an empty text size.
      const isEmptyTextBlock = !doc.textBetween(from, to).length
          && isTextSelection(state.selection)

      if (empty || isEmptyTextBlock) {
        return false
      }

      return true
    },

    addVideo() {
      const url = window.prompt('Ссылка на видео');

      if (url) {
        this.editor.chain().focus().insertVideoPlayer({ url }).run()
      }
    },
    addImage(event) {
      const formData = new FormData();
      const images = event.target.files;

      if (images.length) {
        for (let image of images) {
          formData.append('images[]', image);
        }

        this.$axios
            .$post(`/api/images/${this.contentType}`, formData)
            .then(images => {
              const nodes = [];

              images.forEach(image => {
                nodes.push({
                  type: 'ce-image',
                  attrs: {
                    model_id: image.model_id,
                    src: image.url,
                    'data-id': image.id,
                  }
                });
              });

              this.editor.commands.insertContent(nodes);
            });
      }
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.ProseMirror {
  font-size: 12px;
  font-weight: 500;
  display: block;
  width: 100%;
  min-height: 38px;
  background-color: #fff;
  padding: 12px;
  border: 1px solid #cfd8dc;
  border-radius: 4px;
  line-height: 24px;
  box-shadow: inset 0 2px rgb(0 0 0 / 4%);

  > * + * {
    margin-top: 16px;
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }

  .ProseMirror-gapcursor {
    position: static;
    padding: 8px;
    margin: -8px;

    &:after {
      position: relative;
      width: 1px;
      height: 20px;
      border-left: none;
      margin-top: 20px;
      background-color: #000;
    }
  }
}

.tippy-box {
  overflow: hidden;
  border-radius: 99px;
  padding: 0 4px;
  background-color: rgba(0,0,0,.72);

  .tippy-content > div {
    display: flex;
  }

  button {
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    color: white;

    &.is-active {
      background-color: rgba(0,0,0,.8);
      font-weight: 600;
    }

    + button {
      border-left: 1px solid rgba(0,0,0,.2);
    }
  }
}
</style>
