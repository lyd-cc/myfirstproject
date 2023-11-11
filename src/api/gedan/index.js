import request from "@/uitls/request"

// 获取推荐歌单
function gedan_data(offset) {
  return request({
    url: `/top/playlist?offset=${ offset }`,
    method: "get",
  })
}

// 获取排行榜歌单
function gedan_paihangbang() {
  return request({
    url: `/toplist`,
    method: "get"
  })
}

const gedan_api = {
  gedan_data: gedan_data,
  gedan_paihangbang: gedan_paihangbang
}

export {
  gedan_api
}