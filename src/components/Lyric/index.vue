<template>
  <!-- 歌曲详情页，歌词 -->
  <div class="song_info" ref="song_info">
    <div class="song_img">
      <img ref="img_rotate" :src="img_src" alt="无法显示" draggable="false" />
    </div>
    <div class="geci">
      <h2>{{ song_name }}</h2>
      <p>{{ singer }} - {{ song_alia }}</p>
      <div class="content" ref="content">
        <span v-for="i in geci" :data-index="i.index" :style="now_lyric(i.index)" :key="i.index" ref="lyric">
          {{ i.ci }}
          <br />
        </span>
      </div>
    </div>
    <div class="comment"></div>
  </div>
</template>

<script setup>
const props = defineProps(['songinfo', 'geci'])

let img_src = ref(props.songinfo.img_src)
let song_name = ref(props.songinfo.song_name)
let singer = ref(props.songinfo.singer)
let song_alia = ref(props.songinfo.song_alia)

 // 歌词滚动
  function lscroll() {
      for (let i = 0; i < props.geci.length; i++) {
        if (
          this.musicdom.currentTime > this.geci[i].time &&
          this.geci[i].ci !== ""
        ) {
          this.lyricpos = i;
          this.$refs.content.scrollTop = 30 * (i - 5);
        }
      }
    },
</script>

