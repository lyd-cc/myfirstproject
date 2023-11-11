import request from "@/uitls/request.js"

// 歌曲url
function song_url(id) {
  return request({
    url: `/song/url?id=${id}`,
    method: "get"
  })
}
// 歌曲详情
function song_detail(ids) {
  return request({
    url: `/song/detail?ids=${ids}`,
    method: "get"
  })
}
// 歌词
function song_lyric(id) {
  return request({
    url: `/lyric?id=${id}`,
    method: "get"
  })
}
const song_api = {
  song_url: song_url,
  song_detail: song_detail,
  song_lyric: song_lyric
}

export {
  song_api
}