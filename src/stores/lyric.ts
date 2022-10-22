import { defineStore } from "pinia";
import { getLyric } from '@/utils/api';
import { usePlayerStore } from '@/stores/player';
import type { lyricNode } from '@/models/lyric';
import { formatLyric, formatLyricChain, checkLyric as checkLyric2 } from "./helper/lyrics";


export const useLyricStore = defineStore('lyric', {
  state: () => {
    return {
      showLyrics: false,
      jumping: false,
      currentNode: {} as lyricNode | null,
      startNode: {} as lyricNode | null,
      lyriclist: [] as string[]
    }
  },
  actions: {
    changeShowLyrics() {
      const { djPlaying } = usePlayerStore()
      if (!djPlaying) {
        this.showLyrics = !this.showLyrics
      }
    },
    async setLyric(id: number) {
      const lyrics = (await getLyric(id)).lrc.lyric
      this.lyriclist = formatLyric(lyrics)
      this.startNode = formatLyricChain(lyrics)
      this.currentNode = this.startNode
    },
    checkLyric(time: number) {
      const formatedTime = Math.round(time * 1000)
      if (this.currentNode) {
        const nextNode = checkLyric2(formatedTime, this.currentNode)
        if (nextNode) {
          this.currentNode = nextNode
        }
      }
    },
  }
})