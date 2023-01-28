<script >
import { defineComponent } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Hello',
  setup() {
    const store = useStore();
    const addAcountVuex = () => {
      console.log("store", store.state)
      store.commit('ADD_ACOUNTVUEX', store.state.appStore.countVuex + 1);
    }
    return {
      addAcountVuex,
      $store: store
    };
  },
});
</script>
<template>
  <div class="hello-wrap">
    <!-- <button type="button" @click="addAcountVuex">count is: {{ $store.state.appStore.countVuex }}</button> -->
  </div>
</template>