<template>
    <view v-if="music.id" id="pageplay">
      <view id="pp_pic" @tap="toggleplay">
        <image class="music_cover" :src="music.al.picUrl || music.album.picUrl + '?param=60y60'"></image>
        <image id="pa-pause" src="../../static/image/ajf.png" v-if="!playing" />
      </view>
      <view id="pp_name">
        <navigator :url="!music.name ? '' : '../' + (playtype == 1 ? 'playing' : (playtype == 2 ? 'fm' : 'program')) + '/index?id=' + music.id">
          <view>{{ music.name || '暂无播放' }}</view>
          <view id="ppn_des" v-if="music.name">{{ music.ar[0].name || music.artists[0].name }} -《{{ music.al.name || music.album.name }}》</view>
        </navigator>
      </view>
      <view id="pp_action">
        <view class="pa-baction" @tap="playnext" :data-pt="-1" v-if="playtype != 2">
          <image src="../../static/image/ajh.png" id="pp_next" style="width:60rpx;height:60rpx;" />
        </view>
        <view class="pa-baction" v-if="playtype != 3" :hidden="music.st || music.starred" @tap="lovesong" :data-p="playing">
          <image id="pa-playing" src="../../static/image/cm2_play_icn_love@2x.png" style="width:80rpx;height:80rpx;" />
        </view>
        <view class="pa-baction" v-if="playtype != 3" :hidden="!music.st && !music.starred" @tap="lovesong" :data-p="playing">
          <image src="../../static/image/cm2_play_icn_loved@2x.png" style="width:80rpx;height:80rpx;" />
        </view>
        <view class="pa-baction" @tap="playnext" :data-pt="1">
          <image src="../../static/image/ajb.png" id="pp_next" style="width:60rpx;height:60rpx;" />
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
  props: {
    music: {
      type: Object,
      required: true
    },
    playing: {
      type: Boolean,
      required: true
    },
    playtype: {
      type: Number,
      required: true
    }
  },
  methods: {
    toggleplay() {
      // 播放/暂停的逻辑
    },
    playnext() {
      // 播放下一首的逻辑
    },
    lovesong() {
      // 添加/取消喜欢的逻辑
    }
  }
 };
</script>
