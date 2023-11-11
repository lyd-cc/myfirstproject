// 歌曲时间转换: 转为 分:秒 格式
export function changeTime(times) {
  times = times / 1000;
  let minute = Math.floor(times / 60);
  let second = Math.floor(times % 60);
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return minute + ":" + second;
}
// 将演唱者数组转为带/的字符串: Furkan Soysal / Hande Yener
export function ar_name(ar) {
  let ars = "";
  for (let i = 0; i < ar.length; i++) {
    ars += ar[i].name;
    if (i < ar.length - 1) ars += " / ";
  }
  return ars;
}
// 歌词格式转换
export function changeGeci(datas) {
  // let datas = res.data.lrc.lyric;
  let arr = datas.split("\n");
  // console.log(datas);
  // console.log(arr);
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split("]");
    // console.log(temp)
    if (temp[0] == "") continue;
    let ci = temp[1];
    if (temp.length == 1) ci = temp[0];
    let a = temp[0].split(".")[1];
    let ms = parseInt(a);

    let b = temp[0].split(".")[0];
    let c = b.split(":")[1];
    let sec = parseInt(c);

    let d = b.split(":")[0];
    let e = d.split("[")[1];
    let min = parseInt(e);

    let ci_time = min * 60 + sec + ms / 1000;
    let tt = {
      index: i,
      time: ci_time,
      ci: ci,
      // min: min,
      // sec: sec,
      // ms: ms
    };
    result.push(tt);
  }
  return result
}
// 判断某个值是否为undefined(接口返回的数据不统一, 有些返回mv有些返回mvid)
export function checkmv(i) {
  if(i.mv === undefined) return i.mvid
  return i.mv
}
export function checkar(i) {
  if(i.ar === undefined) return i.artists
  return i.ar
}
export function checkal(i) {
  if(i.al === undefined) return i.album
  return i.al
}
export function checkdt(i) {
  if(i.dt === undefined) return i.duration
  return i.dt
}