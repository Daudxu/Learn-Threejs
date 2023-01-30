<script setup>
import { ref, onMounted, onUpdated  } from 'vue'

const el = ref()
const count = ref(0)
let intervalId

onMounted(() => {
  console.log("onMounted")
  intervalId = setInterval(() => {
     console.log(111)
  })
})

onUpdated(() => {
//   console.log(document.getElementById('count').textContent)
  console.log(count.value)
})

onUnmounted(() => clearInterval(intervalId))


</script>

<template>
  <div ref="el"></div>
  <button id="count" @click="count++">{{ count }}</button>
</template>
