export class TimerControler {
  currentIndex = 0
  starttime = 0
  lasttime = 0
  isPlaying = false
  currenttime = new Date()
  Timer = {} as NodeJS.Timer
  origintimes:number[]
  times:number[]
  handler:(index:number)=>void
  constructor(lyrics:{time:number}[], handler:(index:number)=>void, offset:number=0) {
    const origintimes = []
    for (let i = 0; i < lyrics.length; i++) {
      origintimes.push(Math.round(lyrics[i].time * 1000) - offset)
    }
    this.origintimes = origintimes
    const times = [origintimes[0]]
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
    this.currentIndex = 0
    this.play()
  }
  // play都是从头播放的，用户不应该直接调用
  protected play() {
    if (this.currentIndex === this.times.length) return 
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
    if (!this.isPlaying) return
    clearTimeout(this.Timer)
    // lasttime表示上一个事件执行后经过多长时间暂停
    this.lasttime = (new Date).getTime() - this.starttime
    this.isPlaying = false
  }
  // 继续
  continue() {
    // 可能从任意时间继续播放，这时要计算出所处的位置
    // 恢复现场
    if (this.isPlaying) return
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
  resetTimeline(lyrics:{time:number}[],offset:number=0) {
    this.reset()
    const origintimes = []
    for (let i = 0; i < lyrics.length; i++) {
      origintimes.push(Math.round(lyrics[i].time * 1000) - offset)
    }
    this.origintimes = origintimes
    const times = [origintimes[0]]
    for (let i = 1; i < origintimes.length; i++) {
      times.push(origintimes[i] - origintimes[i - 1])
    }
    this.times = times
  }
  // 设置时间
  settime(time:number, redo:boolean = false) {
    // 两种情况，整数或者一个对应的time
    // 这时要知道设置的时间与上一个开始节点之间的距离
    if (time < 0) {
      return this.reset()
    }
    clearTimeout(this.Timer)
    if (time >= this.origintimes[this.origintimes.length - 1]) {
      this.currentIndex = this.origintimes.length
      if (redo&&this.currentIndex>0) {
        this.handler(this.currentIndex)
      }
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
    if (redo&&this.currentIndex>0) {
      this.handler(this.currentIndex-1)
    }
    // 还原现场
    if (this.currentIndex > 0) {
      // console.log(this.lasttime,'时间：' , time, '上个时间开始时间：' , this.origintimes[this.currentIndex]);
      this.lasttime = time - this.origintimes[this.currentIndex-1]
    }else{
      this.lasttime = time 
    }
    // this.lasttime = time - this.currentIndex > 0 ? this.origintimes[this.currentIndex] : 0
    // console.log('time:',time,'index:', this.currentIndex,'lasttime:',this.lasttime,'需要时间：',this.times[this.currentIndex],"定时时间：",this.times[this.currentIndex] - this.lasttime);
    // console.log(this.lasttime,this.times[this.currentIndex] - this.lasttime);
    
    this.Timer = setTimeout(() => {
      this.handler(this.currentIndex)
      
      this.currentIndex++
      // console.log('--------',this.currentIndex,'------this.currentIndex');
      this.play()
    }, this.times[this.currentIndex] - this.lasttime)
    this.starttime = (new Date).getTime() + this.lasttime
  }
}

// export interface TimerControler {
//   currentIndex : number
//   starttime : number
//   lasttime : number
//   isPlaying : boolean
//   currenttime : Date
//   Timer : NodeJS.Timer
//   origintimes:number[]
//   times:number[]
//   handler:(index:number) => {}
//   init:()=>void
//   pause:()=>void
//   continue:()=>void
//   reset:()=>void
//   settime:(time:number)=>void
//   prototype:any
// }