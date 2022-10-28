<template>
  <div class="embed-dialog-container">
    <div class="flex space-x-2 w-full" style="max-width: 640px;">
      <div class="embed-dialog">
        <input ref="url" type="url" placeholder="Ссылка на youtube видео" class="input" />
        <div class="flex items-center space-x-2 mt-2">
          <button type="button" @click="$emit('submit', $refs.url.value)" class="button button--primary">Вставить</button>
        </div>
      </div>
      <button type="button" @click="$emit('close')" class="w-6 h-6 p-1 rounded-full flex items-center justify-center bg-white">
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="24px" height="24px"><path d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z"/></svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('keydown', this.onClose)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onClose)
  },

  methods: {
    onClose({ key }) {
      if (key === 'Escape') {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
.embed-dialog-container {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.4);
  padding: 16px;
}
.embed-dialog {
  background-color: #fff;
  max-width: 480px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
}
</style>