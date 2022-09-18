import { defineStore, storeToRefs } from "pinia";
import { lyric } from '@/utils/api';
import { stringToNumber } from '@/utils/number';
import { usePlayerStore } from '@/stores/player';
import { TimerControler } from '@/utils/timecontroler';
import type { Lyric } from '@/models/lyric';
// import type { timerControler as TimerControler } from '@/utils/timecontroler';



export const useLyricStore = defineStore('lyric', {
  state: () => {
    return {
      test: false,
      lyrics: {} as Lyric,
      currentlyric: -1,
      jumping: false,
      controler: new TimerControler([], (index: number) => { }, 0),
      checktime: 3
    }
  },
  getters: {
    lyriclist: state => {
      const reg = /\[(?<time>.*)\](?<word>.*)\n/g

      const res: { time: number, word: string }[] = []
      if (state.lyrics) {
        let temp
        while (temp = reg.exec(state.lyrics.lyric)) {
          res.push({ time: stringToNumber(temp.groups!.time), word: temp.groups!.word })
        }
      }
      return res
    }
  },
  actions: {
    change() {
      const { djPlaying } = storeToRefs(usePlayerStore())

      if (!djPlaying.value) {
        this.test = !this.test
      }
    },
    async getlyric(id: number) {
      this.lyrics = (await lyric(id)).lrc
    },
    checkLyric(time: number) {
      if (!this.checktime--) {
        this.checktime = 3
        this.controler.setTime(Math.round(time * 1000))
      }
    },
    jumpTo(time: number) {
      if (!this.jumping) {
        this.jumping = true
        let res = this.lyriclist.length - 1
        for (let i = 0; i < this.lyriclist.length; i++) {
          if (time < this.lyriclist[i].time) {
            res = i - 1
            break
          }
        }
        this.currentlyric = res
        this.jumping = false
      }
    }
  }
})