export interface Lyrics{
  qfy: "boolean"
  sfy: "boolean"
  sgc: "boolean"
  klyric:Lyric
  lrc:Lyric
  romalrc:Lyric
  tlyric:Lyric
}
export interface Lyric{
    lyric: "string"
    version: "number"
}
      