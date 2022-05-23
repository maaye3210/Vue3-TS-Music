import {defineStore,storeToRefs} from "pinia";
import {lyric} from '@/utils/api';
import {stringToNumber} from '@/utils/number';
import type {Lyrics} from '@/models/lyric';
export const useLyricStore = defineStore('lyric', {
  state: () => {
      return {
        test: false,
        lyrics: {} as Lyrics,
        currentlyric:0,
        jumping:false
      }
  },
  getters: {
    lyriclist: state => {
      const reg = /\[(?<time>.*)\](?<word>.*)\n/g
      let temp
      const res = []
      if(state.lyrics.lrc){
        while (temp = reg.exec(state.lyrics.lrc.lyric)) {
          res.push({time:stringToNumber(temp.groups!.time),word:temp.groups!.word})
        }
      }
      return res as {time:number,word:string}[]
    }
},
  actions: {
    change(){
      this.test=!this.test
    },
    async getlyric (id:number){
      this.lyrics = await lyric(id)
    },
    checkLyric(time:number){
      // console.log();
      
      if (this.lyriclist.length > 0) {
        if (this.currentlyric>this.lyriclist.length) {
          this.currentlyric=0
        }
        if (time >= this.lyriclist[this.currentlyric+1]?.time && time < this.lyriclist[this.currentlyric+2]?.time) {
          this.currentlyric++
        } else if (time < this.lyriclist[this.currentlyric]?.time || time >= this.lyriclist[this.currentlyric+2]?.time) {
          this.jumpTo(time)
        }
      }
    },
    jumpTo(time:number){
      if (!this.jumping) {
        console.log('跳转到',time);
        this.jumping=true
        let res = this.lyriclist.length - 1
        for (let i = 0; i < this.lyriclist.length; i++) {
          if (time < this.lyriclist[i].time) {
            res = i - 1
            break
          }
        }
        this.currentlyric = res
        this.jumping=false
      }
    }
  }
})