<template>
  <div class="prose prose-sm" v-html="html"></div>
</template>

<script>
import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Image from './components/image';
import Embed from './components/embed';

export default {
  props: {
    json: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    const exts = [
      Document,
      Paragraph,
      Text,
      Bold,
      Heading,
      Image,
      Embed,
      Blockquote,
      Italic,
      Strike
    ];

    this.html = generateHTML(JSON.parse(this.json), exts);
  },
}
</script>