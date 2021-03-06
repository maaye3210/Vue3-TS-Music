// 尝试实现一个能够在时间轴指定时间点调用回调的类。可以整合到音频标签里，实现精确的控制
const lyric = [
  { "time": 0, "word": " 作词 : 队长/黄礼格" },
  { "time": 0.022, "word": " 作曲 : 队长/黄礼格" },
  { "time": 0.044, "word": " 编曲 : 王大夫/Zee Van/高孟昊" },
  { "time": 0.066, "word": " 制作人 : 高孟昊" },
  { "time": 0.89, "word": "Cause you know" },
  { "time": 3.2, "word": "爱意就像大雨落下怎么能让人不牵挂" },
  { "time": 10.55, "word": "过得好吗想说的话你能听到吗" },
  { "time": 16.8, "word": "" },
  { "time": 44.84, "word": "就把我爱意都掩埋" },
  { "time": 48.1, "word": "但你能清楚的明白" },
  { "time": 51.83, "word": "靠近我 然后别离开" },
  { "time": 56.74, "word": "可是难过的却不是回忆" },
  { "time": 59.97, "word": "因为回忆里 哭泣的你" },
  { "time": 64.81, "word": "" },
  { "time": 67.02, "word": "Cause you know" },
  { "time": 69.56, "word": "爱意就像大雨落下怎么能让人不牵挂" },
  { "time": 76.66, "word": "过得好吗想说的话你能听到吗" },
  { "time": 83.27, "word": "Wow 没能陪你到最后 别再叹息皱眉头" },
  { "time": 92.43, "word": "怎么会忘掉你所有" },
  { "time": 95.7, "word": "" },
  { "time": 96.28999999999999, "word": "我还在这 默默的承受着 没有人附和" },
  { "time": 100.56, "word": "过了很久了么" },
  { "time": 102.3, "word": "怎么会傻到等你回来 这算什么期待" },
  { "time": 106.02000000000001, "word": "情话全都变苍白" }
]
class TimerControl {
  currentIndex = 0
  starttime = 0
  lasttime = 0
  Timer = null
  isPlaying = false
  currenttime = new Date()
  constructor(lyrics, handler) {
    const origintimes = []
    for (let i = 0; i < lyrics.length; i++) {
      origintimes.push(Math.round(lyrics[i].time * 1000))
    }
    this.origintimes = origintimes
    const times = [0]
    for (let i = 1; i < origintimes.length; i++) {
      times.push(origintimes[i] - origintimes[i - 1])
    }
    this.times = times
    this.handler = handler
  }
  // 初始化
  init() {
    this.isPlaying = true
    this.starttime = (new Date).getTime()
    this.play()
  }
  // play都是从头播放的，用户不应该直接调用
  play() {
    if (this.currentIndex === this.times.length) return "播放结束"
    // 这里最好不要有太多操作，影响速度
    this.Timer = setTimeout(() => {
      this.handler(this.currentIndex)
      this.currentIndex++
      this.play()
    }, this.times[this.currentIndex])
    this.starttime = (new Date).getTime()
  }

  pause() {
    // 是一个随机的时间，但是可以考虑转化为整数（作用不大）
    // 暂停时要保存现场
    // this.lasttime = this.currenttime.getTime() - this.starttime + this.lasttime
    clearTimeout(this.Timer)
    this.lasttime = (new Date).getTime() - this.starttime
    this.isPlaying = false
  }
  continue() {
    // 可能从任意时间继续播放，这时要计算出所处的位置
    // 恢复现场
    this.Timer = setTimeout(() => {
      this.handler(this.currentIndex)
      this.currentIndex++
      this.play()
    }, this.times[this.currentIndex] - this.lasttime)
    this.starttime = (new Date).getTime() - this.lasttime
    this.isPlaying = true
  }
  reset() {
    clearTimeout(this.Timer)
    this.currentIndex = 0
  }
  settime(time) {
    // 两种情况，整数或者一个对应的time
    // 这时要知道设置的时间与上一个开始节点之间的距离
    if (time < 0) {
      return this.reset()
    }
    clearTimeout(this.Timer)
    if (time >= this.origintimes[this.origintimes.length - 1]) {
      return this.currentIndex = this.origintimes.length
    }
    // 到这里说明设定的时间在时间轴范围内
    // 找到设定的时间之后第一个要执行的序号
    for (let i = 0; i < this.origintimes.length; i++) {
      if (this.origintimes[i] > time) {
        this.currentIndex = i
        break
      }
    }
    // 还原现场
    this.lasttime = time - this.currentIndex > 0 ? this.origintimes[this.currentIndex - 1] : 0
    this.Timer = setTimeout(() => {
      this.handler(this.currentIndex)
      this.currentIndex++
      this.play()
    }, this.times[this.currentIndex] - this.lasttime)
    this.starttime = (new Date).getTime() + this.lasttime
  }
}
const a = new TimerControl(lyric, (index) => {
  console.log(lyric[index].word);
})
a.init()
console.log(a);