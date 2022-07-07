<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { VTipTap } from '../src/components';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VTipTap,
  }
});
</script>

<template>
  <div id="app">
    <v-tip-tap />
  </div>
</template>
