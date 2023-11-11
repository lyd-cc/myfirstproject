import request from "@/uitls/request"

// 获取歌单详情, 参数: 歌单id
function gedan_detail(id) {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: "get"
  })
}
// 获取歌单所有歌曲(不包含歌曲url), 参数: 歌单id
function gedan_songs(id) {
  return request({
    url: `/playlist/track/all?id=${id}`,
    method: "get"
  })
}
// 获取歌曲mv信息, 参数: mv的id
function mv_info(mv_id) {
  return request({
    url: `/mv/url?id=${mv_id}`,
    method: "get"
  })
}
const gedaninfo_api = {
  gedan_detail: gedan_detail,
  gedan_songs: gedan_songs,
  mv_info: mv_info
}

export {
  gedaninfo_api
}