import { defineStore, storeToRefs } from "pinia";
import { useDetail, useSongUrl, djProgram, useProgramDjDetail, getLyric } from "@/utils/api";
import { watch } from "vue";
import { useLyricStore } from '@/stores/lyric';
import type { Song } from "@/models/song";
import { ENPTY_SONG } from "@/models/song";
import { ENPTY_DJ_PROGRAM } from "@/models/dj";
import type { SongUrl } from "@/models/song_url";
import messageAlert from '@/utils/messageAlert';
import { nextTick } from "vue";
// 将电台功能和音乐播放功能放在一起，耦合度太高，难以添加新功能
const KEYS = {
    volume: 'PLAYER-VOLUME'
}

const enum LoopType {
    SingleCycle,
    ListLoop,
    RandomPlay,
}

// tip:如何同步电台歌曲和电台节目——将电台节目储存在对应的歌曲上
export const usePlayerStore = defineStore({
    id: "player",
    state: () => ({
        audio: new Audio(),
        loopType: LoopType.SingleCycle,//循环模式 0 单曲循环 1 列表循环 2随机播放
        volume: localStorage.getItem(KEYS.volume)?.toInt() || 60,//音量
        playList: [] as Song[],//播放列表,
        showPlayList: false,
        id: 0,
        url: '',
        songUrl: {} as SongUrl,
        song: ENPTY_SONG,
        isPlaying: false, //是否播放中
        sliderInput: false,//是否正在拖动进度条
        ended: false,//是否播放结束
        muted: false,//是否静音
        currentTime: 0,//当前播放时间
        duration: 0,//总播放时长
        djPlaying: false,//是否在播放电台节目
        currentDjPage: 0,
        loadAllDjPage: false,
        djId: 0,//电台节目id，是返回的电台节目里表示电台的id
        djProgram: ENPTY_DJ_PROGRAM,
        djProgramid: 0
    }),
    getters: {
        playListCount: state => {
            return state.playList.length;
        },
        thisIndex: state => state.playList.findIndex(song => song.id === state.id || song.djProgram?.id === state.id),
        nextSong(state): Song {
            const { thisIndex, playListCount } = this

            if (thisIndex === playListCount - 1) {
                return state.playList.first();
            } else {
                const nextIndex = thisIndex + 1
                return state.playList[nextIndex];
            }
        },
        prevSong(state): Song {
            const { thisIndex } = this
            if (thisIndex === 0) {
                return state.playList.last();
            } else {
                const prevIndex: number = thisIndex - 1
                return state.playList[prevIndex];
            }
        },
        haveSong(state): boolean {
            return state.song !== ENPTY_SONG
        }
    },
    actions: {
        // 初始化
        init() {
            this.audio.volume = this.volume / 100;
        },


        // 以下为普通音乐用到的逻辑
        clearPlayList() {
            this.songUrl = {} as SongUrl
            this.url = ''
            this.id = 0;
            this.song = ENPTY_SONG
            this.isPlaying = false;
            this.sliderInput = false;
            this.ended = false;
            this.muted = false;
            this.currentTime = 0;
            this.playList = [] as Song[];
            this.showPlayList = false;
            this.djPlaying = false
            this.djId = 0
            this.djProgramid = 0
            this.djProgram = ENPTY_DJ_PROGRAM
            this.loadAllDjPage = false
            this.audio.load()
            setTimeout(() => {
                this.duration = 0;
            }, 500)
        },
        async play(id: number) {
            this.isPlaying = false
            const songUrlInfo = await useSongUrl(id)
            if (!songUrlInfo.url) {
                messageAlert.error('歌曲Url无效')
                this.play(this.nextSong.id)
                return
            }

            this.audio.src = songUrlInfo.url;
            console.log('歌曲ID:', id, '歌曲url:', songUrlInfo.url);
            await this.audio.play().catch(res => console.error(res))
            this.isPlaying = true
            this.songUrl = songUrlInfo
            this.url = songUrlInfo.url
            this.id = id
            await this.songDetail()
        },
        async songDetail() {
            this.song = await useDetail(this.id)
            this.pushPlayList({ replace: false }, this.song)
        },
        //播放列表里面添加音乐
        pushPlayList(config: { replace: boolean }, ...list: Song[]) {
            const { replace } = config
            if (replace || this.djPlaying) {
                this.playList = list;
            } else {
                list.forEach(song => {
                    if (this.playList.filter(s => s.id == song.id).length <= 0) {
                        this.playList.push(song)
                        console.log('添加普通歌曲');
                    }
                })
            }
            this.djProgramid = 0
            this.djProgram = ENPTY_DJ_PROGRAM
            this.currentDjPage = 0
            this.djPlaying = false
        },



        // 以下为电台用到的逻辑
        // 播放电台
        async playDjProgram(id: number) {
            if (id == this.djProgramid) return;
            this.clearPlayList()
            // 因为电台节目没有给出确定的url，需要自己用id查询
            const djProgramInfos = await djProgram(id)
            console.log('电台ID:', id, '电台节目', djProgramInfos)
            this.djProgramid = id
            this.djProgram = djProgramInfos[0]
            const djList = await Promise.all(djProgramInfos.map(djProgramInfo => useDetail(djProgramInfo.mainSong.id).then(res => {
                res.djProgram = djProgramInfo
                return res
            })))
            // 一定不是同一个电台
            this.pushDjList({ replace: true }, ...djList)
            await this.playDj(this.djProgram.id)
        },
        async playDj(id?: number) {
            if (!id) return
            if (id == this.id) return;
            const thisDjIndex = this.playList.findIndex(song => song.djProgram?.id === id)
            if (thisDjIndex >= this.playListCount - 2) {
                this.moreDj()
            }
            this.isPlaying = false
            const detail = await useProgramDjDetail(id)

            const data = await useSongUrl(detail.mainSong.id)
            this.audio.src = data.url;
            console.log('节目ID:', id, '节目url:', data.url);
            await this.audio.play().catch(res => console.error(res))
            this.isPlaying = true
            this.songUrl = data
            this.url = data.url
            this.djProgram = detail
            this.id = id
            this.djDetail()
        },
        // 异步加载更多电台节目
        async moreDj() {
            const res = await djProgram(this.djProgramid, (this.currentDjPage + 1) * 5, 5)
            const djList = [] as Song[]
            for (let i = 0; i < res.length; i++) {
                const data = await useDetail(res[i].mainSong.id)
                data.djProgram = res[i]
                djList.push(data)
            }
            this.currentDjPage++
            if (djList.length === 0) {
                this.loadAllDjPage = true
            } else {
                this.pushDjList({ replace: false }, ...djList)
            }
        },
        //播放列表里面添加电台节目
        pushDjList(config: { replace: boolean }, ...list: Song[]) {
            // 如果之前不在播放电台，或者不是同一个电台就替换
            const { replace } = config
            console.log('添加电台歌曲');
            console.log(replace, !this.djPlaying);

            if (replace || !this.djPlaying) {
                this.playList = list;
                this.djId = list[0].djId
                console.log('列表替换成电台', list, !this.djPlaying, (this.djId != list[0].djId), this.djId, list[0].djId)
            } else {
                // 否则添加在队尾
                list.forEach(song => {
                    if (this.playList.filter(s => s.id == song.id).length <= 0) {
                        this.playList.push(song)
                        console.log('在队尾添加了', song.name);
                    }
                })
            }
            this.djPlaying = true
        },
        async djDetail() {
            const detail = await useProgramDjDetail(this.id)
            this.song = await useDetail(detail.mainSong.id)
            this.song.djProgram = detail
            console.log('电台id', this.song.djId);
            // 一般不需要加入列表，因为已经加入过，但是有时会播放单曲，直接调用这个函数，所以需要再添加到播放列表
            if (this.song.djId != 0) {
                this.pushDjList({ replace: false }, this.song)
            }
        },





        // 以下为电台和普通歌曲交汇的逻辑
        //下一曲
        next() {
            if (this.loopType === LoopType.RandomPlay) {
                this.randomPlay()
            } else {
                if (this.djPlaying) {
                    this.playDj(this.nextSong.djProgram?.id)
                } else {
                    this.play(this.nextSong.id)
                }
            }
        },
        //上一曲
        prev() {
            if (this.djPlaying) {
                this.playDj(this.prevSong.djProgram?.id)
            } else {
                this.play(this.prevSong.id)
            }
        },




        // 以下逻辑为电台和普通歌曲无关的逻辑
        //重新播放
        rePlay() {
            setTimeout(() => {
                this.currentTime = 0;
                this.audio.play()
            }, 1500)
        },
        //随机播放
        randomPlay() {
            this.play(this.playList.sample().id)
        },
        //播放结束
        playEnd() {
            console.log('播放结束')
            switch (this.loopType) {
                case LoopType.SingleCycle:
                    this.rePlay()
                    break;
                case LoopType.ListLoop:
                    this.next()
                    break;
                case LoopType.RandomPlay:
                    this.randomPlay()
                    break;
            }
        },
        //播放、暂停
        togglePlay() {
            if (!this.song.id) return;
            if (this.isPlaying) {
                this.audio.pause();
            } else {
                this.audio.play();
            }
            this.isPlaying = !this.isPlaying
        },
        // 播放
        setPlay() {
            if (!this.song.id) return;
            this.isPlaying = true
            this.audio.play();
        },
        // 暂停
        setPause() {
            if (!this.song.id) return;
            this.isPlaying = false
            this.audio.pause();
        },
        //切换循环类型
        toggleLoop() {
            switch (this.loopType) {
                case LoopType.RandomPlay:
                    this.loopType = LoopType.SingleCycle
                    break;
                case LoopType.SingleCycle:
                    this.loopType = LoopType.ListLoop
                    break;
                case LoopType.ListLoop:
                    this.loopType = LoopType.RandomPlay
                    break;
                default:
                    this.loopType = LoopType.SingleCycle
            }
        },
        //静音切换
        toggleMuted() {
            this.muted = !this.muted
            this.audio.muted = this.muted
        },
        //音量设置
        setVolume(n: number) {
            n = n > 100 ? 100 : n
            n = n < 0 ? 0 : n
            this.volume = n
            this.audio.volume = n / 100
            localStorage.setItem('PLAYER-VOLUME', n.toString())
        },
        //修改播放时间
        onSliderChange(val: number) {
            this.currentTime = val
            this.sliderInput = false;
            this.audio.currentTime = val
        },
        //播放位置正在修改，防止被定时器修改
        onSliderInput(val: number) {
            this.sliderInput = true;
        },
        //定时器回调
        interval() {
            if (this.isPlaying && !this.sliderInput) {
                this.currentTime = parseInt(this.audio.currentTime.toString())
                this.duration = parseInt(this.audio.duration.toString());
                this.ended = this.audio.ended
            }
        }
    }
})

export const userPlayerInit = () => {
    const { checkLyric, setLyric } = useLyricStore()

    const { init, interval, playEnd, audio } = usePlayerStore()

    init()

    const { ended, id, djPlaying } = storeToRefs(usePlayerStore())

    audio.ontimeupdate = interval.before(() => {//装饰器，检查歌词位置
        !djPlaying.value && checkLyric(audio.currentTime)
    })

    console.log("播放器：", audio);

    //监听播放结束
    watch(ended, ended => {
        if (!ended) return
        playEnd()
    })
    watch(id, id => {
        console.log('监听到歌曲变化');
        nextTick().then()
        if (!djPlaying.value) {
            setLyric(id)
        }
    })

    //启动定时器
    // onMounted(() => {
    //     init()
    //     console.log('启动歌曲定时器')
    //     timer = setInterval(interval.before(() => {//装饰器，检查歌词位置
    //         checkLyric(audio.currentTime)
    //     }), 1000)
    // })
    //清除定时器
    // onUnmounted(() => {
    //     console.log('清除歌曲定时器')
    //     clearInterval(timer)
    // })
    // const getTime = () => {
    //     return timer
    // }
}
