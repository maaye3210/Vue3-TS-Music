import type { lyricNode } from "@/models/lyric"
import { markRaw } from 'vue';
// import { stringToNumber } from "@/utils/number"
function stringToNumber(string: string) {
  const time = string.split(":");
  const num: number = parseInt(time[0]) * 60 + parseFloat(time[1]) * 1
  return num
}


export function formatLyricChain(lyrics: string, offset: number = 100) {
  const reg = /\[(?<time>.*)\](?<word>.*)\n/g
  let temp: RegExpExecArray | null
  let index = 0
  let parentNode = {} as lyricNode
  const res = parentNode
  while (temp = reg.exec(lyrics)) {
    const time = stringToNumber(temp.groups!.time) * 1000
    const offsetTime = time > offset ? time - offset : 0
    const currentNode = markRaw({
      time: offsetTime,
      word: temp.groups!.word,
      next: null,
      pre: parentNode,
      index: index++
    })
    parentNode.next = currentNode
    parentNode = currentNode
  }
  return res.next
}

export function checkLyric(time: number, currentNode: lyricNode) {
  const formatedTime = Math.round(time)
  if (currentNode.time <= formatedTime && ((currentNode.next && currentNode.next.time > formatedTime) || !currentNode.next)) return
  while (!(currentNode.time <= formatedTime && ((currentNode.next && currentNode.next.time > formatedTime) || !currentNode.next))) {
    if (currentNode.time > formatedTime && currentNode.pre) {
      currentNode = currentNode.pre
    } else if (currentNode.next && currentNode.next.time < formatedTime) {
      currentNode = currentNode.next
    }
  }
  console.log(currentNode);
  return currentNode
}

export function formatLyric(lyrics: string) {
  const reg = /\[(?<time>.*)\](?<word>.*)\n/g
  const lyricList = []
  let lyric
  while (lyric = reg.exec(lyrics)) {
    lyricList.push(lyric.groups!.word)
  }
  return lyricList
}