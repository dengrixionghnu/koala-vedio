<template>
  <image :src="src" 
         :width="width+'px'" 
         :height="height || width + 'rpx'" 
         :class="classValue"  
         :style="{width:width+'rpx', height:height || width + 'rpx'}" 
         @click="handleClick"> </image>
</template>

<script>
export default {
    props: {
      src: {
        type: String,
        required: true
      },
      width: {
        type: [String, Number],
        required: true
      },
      classValue: {
        type: String,
        default: ''
      },
      height: {
        type: [String, Number],
        default: ''
      }
    },
    methods: {
      handleClick() {
        // 点击事件处理逻辑
        console.log('Image clicked.');
      }
  }
}
</script>

<style>

</style>