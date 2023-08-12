<template>
  <view>
      <playPage :music="music" :playing="playing" :playtype="playtype"></playPage> 
      <view id="header" class="tab">
        <view class="tab-item" :class="rec.idx === tabidx ? 'tbi-cur' : ''" @tap="switchtab(0)" data-t="0">
          <text class="tbi-text">个性推荐</text>
        </view>
        <view class="tab-item" :class="playlist.idx === tabidx ? 'tbi-cur' : ''" @tap="switchtab(1)" data-t="1">
          <text class="tbi-text">歌单</text>
        </view>
        <view class="tab-item" :class="djlist.idx === tabidx ? 'tbi-cur' : ''" @tap="switchtab(2)" data-t="2">
          <text class="tbi-text">主播电台</text>
        </view>
        <view class="tab-item" :class="sort.idx === tabidx ? 'tbi-cur' : ''" @tap="switchtab(3)" data-t="3">
          <text class="tbi-text">排行榜</text>
        </view>
        <navigator url="../search/index" class="tab-item" id="lastsearch">
          <icon type="search" size="18" color="#666" />
        </navigator>
      </view>
    
      <view id="main" class="page_pp">
        <!-- 个性推荐 -->
        <view class="tab_cnt" :hidden="tabidx !== 0">
           <swiper indicator-dots autoplay circular>
              <swiper-item v-for="(item, index) in banner" :key="item.targetId">
                <image :src="item.pic" class="slide-image" width="750" height="290" />
              </swiper-item>
            </swiper>
            
            <view v-if="!rec.loading" id="album_loading">
              <image src="../../static/image/cm2_discover_icn_start_big@2x.png"></image>
              正在为您生成个性化推荐...
            </view>
            <view v-else>
              <view id="rec_nav">
                <view>
                  <navigator url="../fm/index">
                    <view class="recn_ico">
                      <image src="../../static/image/cm2_discover_icn_fm-ip6@2x.png"></image>
                    </view>
                    私人FM
                  </navigator>
                </view>
                <view>
                  <navigator url="../recsongs/index">
                    <view class="recn_ico">{{ thisday }}</view>
                    每日歌曲推荐
                  </navigator>
                </view>
                <view>
                  <navigator url="../playlist/index?pid=3778678">
                    <view class="recn_ico">
                      <image src="../../static/image/cm2_discover_icn_upbill-ip6@2x.png"></image>
                    </view>
                    云音乐热歌榜
                  </navigator>
                </view>
              </view>
    
              <!-- playlist -->
              <view class="st_title">
                <image width="30" mode="widthFix" src="../../static/image/cm2_discover_icn_recmd@2x.png" />推荐歌单
                <view class="rbtn" @tap="switchtab(1)" data-t="1">更多&gt;</view>
              </view>
              <view class="flex-boxlist">
                <view class="tl_cnt" v-for="(item, index) in rec.re[0]" :key="item.id">
                  <navigator :url="'../playlist/index?pid=' + item.id + '&from=toplist'">
                    <view class="cover">
                      <image :src="item.picUrl + '?param=200y200'" class="music_cover" />
                      <view class="img_playcount">
                        <image src="../../../image/p0.png" />{{ item.playCount }}</view>
                    </view>
                    <text class="name">{{ item.name }}</text>
                  </navigator>
                </view>
              </view>
    
              <!-- newsongs -->
              <view class="st_title">
                <image width="30" mode="widthFix" src="../../static/image/cm2_discover_icn_newest@2x.png" />最新音乐
                <navigator class="rbtn" url="../new/index">更多&gt;</navigator>
              </view>
              <view class="flex-boxlist">
                <view class="tl_cnt" v-for="(re, idx) in rec.re[1]" :key="re.id" v-if="idx < 6">
                  <navigator :url="'../playing/index?id=' + re.id + '&br=' + re.song.privilege.maxbr">
                    <view class="cover">
                      <image :src="re.song.album.picUrl + '?param=200y200'" class="music_cover" />
                      <text>{{ re.playcount }}</text>
                    </view>
                    <view class="tl_info">
                      <view>{{ re.name }}</view>
                      <view class="tli_des">{{ re.song.artists[0].name }}</view>
                    </view>
                  </navigator>
                </view>
              </view>
              <!--mv-->
              <view class="st_title">
                <image width="30" mode="widthFix" src="../../static/image/cm2_discover_icn_mv@2x.png" />推荐Mv
                <view class="rbtn">更多&gt;</view>
              </view>
              <view class="flex-boxlist mvs flex-two">
                <view v-for="(re, index) in rec.re[2]" :key="re" class="tl_cnt">
                    <navigator :url="'../mv/index?id=' + re.id">
                        <view class="cover">
                            <view class="img_playcount">
                            <imagePage :classValue="video-icon" 
                                       :src="'../../static/image/video.png'" 
                                       :width=28 
                                       :height=20> </imagePage>
                            {{ re.playCount }}
                            </view>
                            <image :src="re.picUrl + '?param=320y180'" class="mv_cover" />
                        </view>
                        <view class="tl_info">
                            <view>{{ re.name }}</view>
                            <view class="tli_des">{{ re.artistName }}</view>
                        </view>

                    </navigator>
                </view>
              </view>
                           <!-- dj -->
              <view class="st_title">
                  <image width="30" mode="widthFix" src="../../static/image/cm2_discover_icn_radio@2x.png" />主播电台
                  <view class="rbtn" @tap="switchtab(2)" data-t="2">更多&gt;</view>
              </view>
              <view class="flex-boxlist">
                  <view class="tl_cnt" v-for="(item, index) in rec.re[3]" :key="item.id">
                      <navigator :url="'../program/index?pid=' + item.id">
                      <view class="cover">
                          <image :src="item.picUrl + '?param=200y200'" class="music_cover" />
                      </view>
                      <text class="name">{{ item.name }}</text>
                      </navigator>
                  </view>
              </view>
            </view>      
        </view>
            <!-- end -->
         <!--歌单 -->
        <view class="tab_cnt" :hidden="tabidx!==1">
            <view class="listheader" id="plc_header">{{catelist.checked.name}}
                <text @tap="togglePtype" id="catselectbtn">选择分类</text>
            </view>
            <view v-if="playlist.loading" class="flex-boxlist flex-two">
                <view class="tl_cnt cateplaylist" v-for="(item, index) in playlist.list.playlists" :key="item.id">
                    <navigator :url="'../playlist/index?pid=' + item.id + '&from=toplist'">
                        <view class="cover">
                        <image :src="item.coverImgUrl + '?param=200y200'" class="music_cover" />
                        <view class="img_creator">
                            <imagePage :src="'../../static/image/cm2_icn_userhead@2x.png'" :width=24> </imagePage> {{item.creator.nickname}}
                        </view>
                        <view class="img_playcount">
                            <image src="../../static/image/p0.png" />{{item.playCount}}
                        </view>
                        </view>
                        <text class="name">{{item.name}}</text>
                    </navigator>
                </view>
            </view>
            <loading v-if="!playlist.loading || playlist.list.more"/>
        </view>
          <!-- 主播电台-->
        <view class="tab_cnt" v-show="tabidx !== 2">
            <template v-if="djcate.loading">
                <swiper indicator-dots="true" circular="true">
                    <swiper-item v-for="(item, idx) in [1,2,3]" class="djcatewrap">
                    <view @tap="djradiotype" v-if="idx < item * 8 && idx >= (item - 1) * 8"
                            class="djcatelist" :data-djtype="re.id" v-for="(re, idx) in djcate.categories"
                            :key="re.id">
                        <image :src="re.pic56x56Url" class="slide-image" width="56" height="56" />
                        <view>{{re.name}}</view>
                    </view>
                    </swiper-item>
                </swiper>
                <view class="listheader">{{djrecs.rec_p.name}}</view>
                <view v-for="re in djrecs.rec_p.programs" class="playlist" :key="re">
                    <navigator :url="'../program/index?id=' + re.mainSong.id + '&pid=' + re.id">
                    <view class="flexlist  flex-image">
                        <view class="flexleft fl-image">
                        <image :src="re.coverUrl + '?param=100y100'" class="album_cover" />
                        </view>
                        <view class="flexlist">
                        <view class="flexmain">
                            <view>{{re.name}}</view>
                            <view class="relistdes">{{re.reason}}</view>
                        </view>
                        </view>
                    </view>
                    </navigator>
                </view>
                <view class="listheader">{{djrecs.rec_d.name}}</view>
                <view class='flex-boxlist'>
                    <view class="tl_cnt cateplaylist" v-for="(item, idx) in djrecs.rec_d.djRadios"
                        v-if="idx < 6" :key="item.id">
                    <navigator :url="'../djradio/index?id=' + item.id">
                        <view class="cover">
                        <image :src="item.picUrl + '?param=200y200'" class="music_cover" />
                        </view>
                        <text class="name">{{item.copywriter}}</text>
                    </navigator>
                    </view>
                </view>
                <view class="listheader">热门电台</view>
                <view class='flex-boxlist flex-two'>
                    <view class="tl_cnt cateplaylist" v-for="item in djlist.list.djRadios" :key="item.id">
                    <navigator :url="'../djradio/index?id=' + item.id">
                        <view class="cover">
                        <image :src="item.picUrl + '?param=200y200'" class="music_cover" />
                        <text>{{item.creator.nickname}}</text>
                        <view class="img_playcount">
                            <imagePage :src="'../../static/image/cm2_list_icn_subscribe@2x.png'" :width=24> </imagePage> {{item.subCount}}订阅</view>
                        </view>
                        <text class="name">{{item.name}}</text>
                    </navigator>
                    </view>
                </view>
                <loading v-if="djlist.loading&&djlist.list.hasMore"></loading>
            </template>
            <template v-else>
                <loading></loading>
            </template>    
        </view>
       <!--排行榜 -->
        <view class="tab_cnt" v-show="tabidx !== 3">
          <template v-if="sort.loading">
            <view class="listheader">云音乐官方榜</view>
            <view class="flex-boxlist flex sortlist">
                <navigator :url="'../playlist/index?pid={{item.id}}&from=toplist'" v-for="(item, index) in sort.list" :key="item.id" v-if="item.ToplistType">
                        <view class="flexlist">
                            <view class="cover flexleft fl-image">
                            <image class="album_cover" :src="item.coverImgUrl + '?param=200y200'" />
                            <text>{{item.updateFrequency}}</text>
                            </view>
                            <view class="flexlist tl_info">
                            <view class="sort_fl_list" v-for="(r, idx) in item.tracks" :key="idx">
                                {{idx+1}}．{{r.first}} - {{r.second}}
                            </view>
                            </view>
                        </view>
                  </navigator>
                  <navigator :url="'../artists/top/index'">
                      <view class="flexlist">
                          <view class="cover flexleft">
                          <image class="album_cover" :src="sort.artistToplist.coverUrl" />
                          </view>
                          <view class="flexlist tl_info">
                          <view class="sort_fl_list" v-for="(item, idx) in sort.artistToplist.artists" :key="idx">
                              {{idx+1}}．{{item.first}} -
                              <text>{{item.third}}</text>
                          </view>
                          </view>
                      </view>
                  </navigator>
            </view>
            <view class="listheader">全球榜</view>
            <view class="flex-boxlist">
                <view class="tl_cnt" v-for="(item, index) in sort.list" :key="item.id" v-if="!item.ToplistType">
                <navigator :url="'../playlist/index?pid={{item.id}}&from=toplist'">
                    <view class="cover flexleft">
                    <image :src="item.coverImgUrl + '?param=200y200'" class="album_cover" />
                    <text>{{item.updateFrequency}}</text>
                    </view>
                    <text>{{item.name}}</text>
                </navigator>
                </view>
            </view>
          </template>
          <template v-else>
            <loading></loading>
           </template>  
        </view>  
      </view>    
      <scroll-view style="height:100%" :scroll-into-view="'c2'" scroll-y="true" v-show="!cateisShow">
          <view class="close" @tap="togglePtype" id="closecatelist"></view>
          <view id="cateall" :data-catype="catelist.res.all" @tap="cateselect" :class="{'checked': catelist.checked.name === catelist.res.all.name}">
              <text class="cl_ico_checked cl_ico" v-if="catelist.checked.name === catelist.res.all.name"></text>
              {{catelist.res.all.name}}
          </view>
          <view class="catelist" :id="'c' + idx" :key="item" v-for="(item, idx) in catelist.res.categories">
              <view class="cl_list cl_ico">
                  <image :src="'../../../image/cm2_discover_icn_' + idx + '@2x.png'"></image>
                  <text>{{item}}</text>
              </view>
              <view class="cl_list" :class="{'checked': catelist.checked.name === re.name}" v-if="re.category === idx" @tap="cateselect" :data-catype="re" :data-catname="re.name" :key="item.name" v-for="(re, index) in catelist.res.sub">
                  <text class="cl_ico_hot cl_ico" v-if="re.hot"></text>
                  <text class="cl_ico_checked cl_ico" v-if="catelist.checked.name === re.name"></text>
                  {{re.name}}
              </view>
          </view>
      </scroll-view>

  </view>  
</template>
  
  <script>
  import loading from "../compoment/loading.vue"
  import imagePage from "../compoment/imagePage.vue"
  import playPage from "../compoment/playPage.vue"

  export default {
    components: {
    'loading': loading,
    'imagePage': imagePage,
    'playPage': playPage
},
    data() {
      return {
        music: {},
        playing: '',
        playtype: '',
        rec: {
          idx: '',
          loading: false,
          re: []
        },
        banner: [],
        tabidx: '',
        playlist: {
          idx: ''
        },
        djlist: {
          idx: ''
        },
        sort: {
          idx: ''
        },
        thisday: ''
      };
    },
    onLoad() {
      this.rec={};
      this.rec.loading=true;
      this.rec.idx = 1;

      this.music={};
      this.music.name="天黑黑";
      this.music.id=1;
      this.music.al={};
      this.music.al.picUrl = "../../static/image/syz.png"
      this.music.al.name="天黑黑"
      this.playing='天黑黑';
      this.playtype = 1;
      this.music.ar=[];
      this.music.ar.push({name:"孙燕姿"});
      this.tabidx=0;
      this.playlist = {};
      this.playlist.loading = true;
      this.cateisShow = false;

     },

    methods: {
      switchtab(t) {
        // Switch tab logic here
      }
    }
  };
  </script>

<style>
#header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  -webkit-backdrop-filter: blur(15px); /* Safari for macOS & iOS */
  backdrop-filter: blur(15px); /* Google Chrome */
}

#lastsearch {
  line-height: 1;
  padding-top: 20rpx;
  flex: 0 0 80rpx;
}

swiper,
swiper image {
  width: 750rpx;
  height: 290rpx;
}

#main {
  min-height: 1200rpx;
  padding-top: 80rpx;
}

#rec_nav {
  display: flex;
  text-align: center;
  width: 100%;
  border-bottom: 1rpx solid #eee;
}

#rec_nav view {
  flex: 1;
  position: relative;
}

#rec_nav navigator {
  padding: 25rpx 0;
  font-size: 26rpx;
}

.recn_ico {
  width: 110rpx;
  height: 110rpx;
  line-height: 110rpx;
  font-size: 56rpx;
  color: #BB2C08;
  border: 1rpx solid #BB2C08;
  border-radius: 50%;
  margin: 0 auto 20rpx;
  font-weight: 300;
}

.recn_ico image {
  width: 110rpx;
  height: 110rpx;
}

.homepl .tl_cnt {
  width: 168.75rpx;
}

#album_loading {
  text-align: center;
  margin: 120rpx auto 0;
  color: #999;
  font-size: 28rpx;
}

#album_loading image {
  width: 88rpx;
  height: 88rpx;
  animation: circle infinite 1.5s linear;
  display: block;
  margin: 40rpx auto;
  border-radius: 50%;
  border: 1rpx solid #999;
}

#catewrap {
  padding: 0 15rpx;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: #fff;
}

#closecatelist {
  margin: 15rpx auto;
}

.catelist {
  margin-bottom: 20rpx;
  overflow: hidden;
  padding-bottom: 2rpx;
}

.cl_list {
  width: 179rpx;
  border: 1rpx solid #eee;
  text-align: center;
  height: 90rpx;
  font-size: 26rpx;
  line-height: 90rpx;
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin: 0 -1rpx -1rpx 0;
  float: left;
}

.cl_ico {
  height: 182rpx;
  line-height: 1;
}

.cl_ico image {
  width: 80rpx;
  height: 80rpx;
  margin: 35rpx auto 15rpx;
  display: block;
}

#cateall {
  float: none;
  width: auto;
  margin: 20rpx auto;
}

.cl_ico_checked,
.cl_ico_hot {
  content: "";
  position: absolute;
}

.cl_ico_hot {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABTVBMVEXTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjFX1ZKxAAAAbnRSTlMAAQMEBggKCw0ODxATFBUnKSosLi8xP0tNT1JTVFVWV1laW11eX2FiZGVoaWptbnF0dXl6fn+AgYOGh4uMj5CSk5WXnJ2en6ChpKapq6ytr7K3uby9wMHCw8XIy83P0dTj5Obn6err7O7x+fv8/nzHVlgAAAGLSURBVEjH7dVJWxNBEIfxd0YYSEBQFEGWACqKgoIgsig7iixu4EIAFZXNYeb//Y8cmEA4YLrrTJ3q8nu6n6quarg8RnV5vLxyx/OpySUFBk3uHvlti+slv2Vw6SNYs7jHQONffzdA9LGZm3u+/ftMtKGDWzTt+7lE4+uS9pu4fejjnheS02TvBs1H7m4EejL5p5FFZzdKVS29mfw95+zGCNeKtTxMPes5Sbgqfa+hL/VyrwmXJelrRH/q4aYIl06zjYhnqfvcnsMvEU9TV/cp1ivCFUn6FvHE2b0LWmJNEK5Km6XiON3zVwN3Y41x7X0xl7XDcS/9vE77sV5QleNB4rXPtgI6E41At5+LW4HuREOFio6MfJiSFLfR8CbP/USVXQZ3q4NpJR3U/1Axx6wqu9KJC0Ew00XdjqTNztjBlaDmAy5s0UruDGo2YNjDncOyZ+riyuDZRDm5cqhJ7qSu7gLU23/ODr//73/Q0WF1WB1Wh9VhdVgdVofVYXVYHVaH1WF1WB1Wh9VhdScljLevgPOTYwAAAABJRU5ErkJggg==);
  width: 56rpx;
  height: 56rpx;
  left: 0;
  top: 0;
  background-size: 100% 100%;
}

.cl_ico_checked {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAApVBMVEXTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHTOjHDeOSDAAAANnRSTlMAfwEDKfnqwQrZS9on3q6psZjw0I1Q/gxeeiAr8Y77QRDbavy7brg+E4CLHlvOM/WnFeOXTse/voMEAAAA7klEQVRIx+2WyU6DQQyDP/9dWQuUfS/Q0o0d8v6P1kMRMFRKZSROkOvYUiaxrRBm8QMCRv0T/ghBJkGmlmSKT6ZaZcpbph9kGkim42RaVKanZYaAzNSQGTMyc0lmkMlMPplRWeBX6vWNJYQCv7MOuzmhwF+vwsFaSij7P4JqM/1Die9Uyxw3f93abkRERLcNe/sZYY5vwWFERPMYTk6zsb730wLOIs4v4LKX7eGj/yuo3UQfaoNscZ//bdzCcASMs01/nU9zAsA0k0Y5z7s2cP+QEL7r7bHi6TkR36I+X17fErXKvARkng76pePEqxkbC7UpRDWM4wAAAABJRU5ErkJggg==);
  width: 38rpx;
  height: 38rpx;
  background-position: right bottom;
  right: 0;
  bottom: 0;
  background-size: 48rpx 48rpx;
}

.checked {
  border-color: #BB2C08;
  z-index: 2;
}

#catselectbtn {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACdQTFRFiIiI+/z9vr6/xcXGnJyd9PX28/T1n5+fnp6ejIyMm5ub7e7v3t/gBUeqYAAAAEBJREFUeNpiYAABZgYI4GZj42LmYmPjBrJZGRlZmFkYGVnR2Bzs7JzMnOzsHAwMTCDAAyZRxHHqRTYfYS9AgAEAaTABl1/qO3QAAAAASUVORK5CYII=);
  border: 1rpx solid #eee;
  color: #999;
  font-size: 24rpx;
  padding: 8rpx 20rpx 8rpx 40rpx;
  background-position: 10rpx center;
  float: right;
  background-repeat: no-repeat;
  border-radius: 3rpx;
}

#plc_header {
  border: none;
}

.djcatewrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.djcatelist {
  text-align: center;
  font-size: 24rpx;
  flex: 0 0 187.5rpx;
  height: 145rpx;
}

.djcatelist image {
  width: 80rpx;
  height: 80rpx;
  margin-top: 20rpx;
}

.flexlist .cover {
  width: 230rpx;
  height: 230rpx;
  padding: 0;
  flex: 0 0 230rpx;
  margin: 10rpx 20rpx 10rpx 10rpx;
}

.sort_fl_list {
  flex: 0 0 100%;
  line-height: 2;
}

.sortlist .flexlist {
  flex-flow: wrap;
  align-content: center;
}

</style>