<script >
import { defineComponent,defineAsyncComponent,version, customRef } from "vue";
import { useStore } from 'vuex';
const Header = defineAsyncComponent(()=>import("../common/Header.vue"))
const Footer = defineAsyncComponent(()=>import("../common/Footer.vue"))
console.log("version", version)
export default defineComponent({
  name: 'Hello',
  setup() {
    const store = useStore();
    const addAcountVuex = () => {
      console.log("store", store.state.appStore)
      store.commit('ADD_ACOUNTVUEX', store.state.appStore.countVuex + 1);
    }
    function myRef(value) {
      let timer
      return customRef((track, trigger) => {
          return {
            get(){
              track()
              return value
            },
            set(newValue){
              value = newValue
              clearTimeout(timer)
              timer = setTimeout(()=>{
                value = newValue
                trigger()
              }, 500)
            }
          }
      })
    }
    let keyWord = myRef("hello")
    return {
      addAcountVuex,
      $store: store,
      keyWord
    };
  },
  components:{Header,Footer}

});


</script>
<template>
  <div class="hello-wrap">
    <Suspense>
      <template  v-slot:default>
        <Header />
      </template>
      <template  v-slot:fallback>
        <p>请稍后...</p>
      </template>
    </Suspense>
    <p>home</p>
    <input type="text" v-model="keyWord">
    <p>{{keyWord}}</p>
   
    <button type="button" @click="addAcountVuex">count is: {{ $store.state.appStore.countVuex }}</button>
  </div>
</template>