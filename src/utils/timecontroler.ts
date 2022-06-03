export class TimerControler {
  currentIndex = 0
  starttime = 0
  lasttime = 0
  isPlaying = false
  currenttime = new Date()
  Timer = {} as NodeJS.Timer
  origintimes:number[]
  times:number[]
  handler:(index:number)=>{}
  constructor(lyrics:{time:number}[], handler:(index:number)=>{}) {
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
  protected play() {
    if (this.currentIndex === this.times.length) return "播放结束"
    // 这里最好不要有太多操作，影响速度
    this.Timer = setTimeout(() => {
      this.handler(this.currentIndex)
      this.currentIndex++
      this.play()
    }, this.times[this.currentIndex])
    this.starttime = (new Date).getTime()
  }
  // 暂停
  pause() {
    // 是一个随机的时间，但是可以考虑转化为整数（作用不大）
    // 暂停时要保存现场
    // this.lasttime = this.currenttime.getTime() - this.starttime + this.lasttime
    clearTimeout(this.Timer)
    this.lasttime = (new Date).getTime() - this.starttime
    this.isPlaying = false
  }
  // 继续
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
  // 重置计时
  reset() {
    clearTimeout(this.Timer)
    this.currentIndex = 0
  }
  // 设置时间
  settime(time:number) {
    // 两种情况，整数或者一个对应的time
    // 这时要知道设置的时间与上一个开始节点之间的距离
    if (time < 0) {
      return this.reset()
    }
    clearTimeout(this.Timer)
    if (time >= this.origintimes[this.origintimes.length - 1]) {
      this.currentIndex = this.origintimes.length
      return 
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

export interface TimerControler {
  currentIndex : number
  starttime : number
  lasttime : number
  isPlaying : boolean
  currenttime : Date
  Timer : NodeJS.Timer
  origintimes:number[]
  times:number[]
  handler:(index:number) => {}
  init:()=>void
  pause:()=>void
  continue:()=>void
  reset:()=>void
  settime:(time:number)=>void
}