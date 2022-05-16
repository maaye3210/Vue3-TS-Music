import {defineStore, storeToRefs} from "pinia";
import {useDetail, useSongUrl, djProgram } from "@/utils/api";
import {onMounted, onUnmounted, toRefs, watch} from "vue";
import type {Song} from "@/models/song";
import type {SongUrl} from "@/models/song_url";

const KEYS = {
    volume: 'PLAYER-VOLUME'
}

export const usePlayerStore = defineStore({
    id: "player",
    state: () => ({
        audio: new Audio(),
        loopType: 0,//循环模式 0 单曲循环 1 列表循环 2随机播放
        volume: localStorage.getItem(KEYS.volume)?.toInt() || 60,//音量
        playList: [] as Song[],//播放列表,
        showPlayList: false,
        id: 0,
        url: '',
        songUrl: {} as SongUrl,
        song: {} as Song,
        isPlaying: false, //是否播放中
        isPause: true,//是否暂停
        sliderInput: false,//是否正在拖动进度条
        ended: false,//是否播放结束
        muted: false,//是否静音
        currentTime: 0,//当前播放时间
        duration: 0,//总播放时长
        djPlaying:false,//是否在播放电台节目
        currentDjPage:0,
        loadAllDjPage:false,
        djId:0,//电台节目id，是返回的电台节目里表示电台的id
        djProgramid:0
    }),
    getters: {
        playListCount: state => {
            return state.playList.length;
        },
        thisIndex: state => {
            return state.playList.findIndex(song => song.id === state.id);
        },
        nextSong(state): Song {
            const {thisIndex, playListCount} = this
            if (thisIndex === playListCount - 1) {
                return state.playList.first();
            } else {
                const nextIndex: number = thisIndex + 1
                return state.playList[nextIndex];
            }
        },
        prevSong(state): Song {
            const {thisIndex} = this
            if (thisIndex === 0) {
                return state.playList.last();
            } else {
                const prevIndex: number = thisIndex - 1
                return state.playList[prevIndex];
            }
        }
    },
    actions: {
        init() {
            this.audio.volume = this.volume / 100;
        },
        //播放列表里面添加音乐
        pushPlayList(replace: boolean, ...list: Song[]) {
            console.log('添加普通歌曲');
            if (replace||this.djPlaying) {
                this.playList = list;
            }else{
                list.forEach(song => {
                    if (this.playList.filter(s => s.id == song.id).length <= 0) {
                        this.playList.push(song)
                    }
                })
            }
            this.djProgramid=0
            this.currentDjPage=0
            this.djPlaying=false
        },
        //播放列表里面添加电台节目
        pushDjList(replace: boolean, ...list: Song[]) {
            // 如果之前不在播放电台，或者不是同一个电台就替换
            console.log('添加电台歌曲');
            if (replace||!this.djPlaying||(this.djId!=list[0].djId)) {
                this.playList = list;
                this.djId=list[0].djId
                console.log('列表替换成电台',list,!this.djPlaying,(this.djId!=list[0].djId),this.djId,list[0].djId)
            }else{
                // 否则添加在队尾
                list.forEach(song => {
                if (this.playList.filter(s => s.id == song.id).length <= 0) {
                    this.playList.push(song)
                    console.log('在队尾添加了',song.name);
                }
            })
            }
            this.djPlaying=true
        },
        clearPlayList() {
            this.songUrl = {} as SongUrl
            this.url = ''
            this.id = 0;
            this.song = {} as Song
            this.isPlaying = false;
            this.isPause = false;
            this.sliderInput = false;
            this.ended = false;
            this.muted = false;
            this.currentTime = 0;
            this.playList = [] as Song[];
            this.showPlayList = false;
            this.djPlaying=false
            this.djId=0
            this.djProgramid=0
            this.loadAllDjPage=false
            this.audio.load();
            setTimeout(() => {
                this.duration = 0;
            }, 500)
        },
        async play(id: number) {
            console.log('歌曲ID:',id);
            if (id == this.id) return;
            this.isPlaying = false
            const data = await useSongUrl(id)
            this.audio.src = data.url;
            console.log('歌曲url:',data.url);
            this.audio.play().then(res => {
                this.isPlaying = true
                this.isPause = false
                this.songUrl = data
                this.url = data.url
                this.id = id
                this.songDetail()
            }).catch(res => {
                console.log(res)
            })
        },
        async playDjProgram(id: number) {
            console.log('电台节目ID:',id);
            if (id == this.djProgramid) return;
            this.clearPlayList()
            this.djProgramid=id
            // 因为电台节目没有给出确定的url，需要自己用id查询
            const res= await djProgram(id)
            const djList=[] as Song[]
            for (let i = 0; i < res.length; i++) {
                djList.push(await useDetail(res[i].mainSong.id)) 
            }
            this.pushDjList(false,...djList)
            await this.play(res[0].mainSong.id)
        },
        async moreDj(){
            const res= await djProgram(this.djProgramid, (this.currentDjPage+1)*5)
            const djList=[] as Song[]
            for (let i = 0; i < res.length; i++) {
                djList.push(await useDetail(res[i].mainSong.id)) 
            }
            this.currentDjPage++
            if (djList.length===0) {
                this.loadAllDjPage=true
            }else{
                this.pushDjList(false,...djList)
            }
            
        },
        //播放结束
        playEnd() {
            console.log('播放结束')
            switch (this.loopType) {
                case 0:
                    this.rePlay()
                    break;
                case 1:
                    this.next()
                    break;
                case 2:
                    this.randomPlay()
                    break;
            }
        },
        async songDetail() {

            this.song = await useDetail(this.id)
            if (this.song.djId!=0) {
                this.pushDjList(false, this.song)
            }else{
                // 如果是电台歌曲，一般不需要加入列表，因为已经加入过
                // this.pushPlayList(false, this.song)
            }
        },
        //重新播放
        rePlay() {
            setTimeout(() => {
                this.currentTime = 0;
                this.audio.play()
            }, 1500)
        },
        //下一曲
        next() {
            if (this.loopType === 2) {
                this.randomPlay()
            } else {
                if (this.thisIndex>=this.playListCount-2) {
                    this.moreDj()
                }
                this.play(this.nextSong.id)
            }

        },
        //上一曲
        prev() {
            this.play(this.prevSong.id)
        },
        //随机播放
        randomPlay() {
            this.play(this.playList.sample().id)
        },
        //播放、暂停
        togglePlay() {
            if (!this.song.id) return;
            this.isPlaying = !this.isPlaying
            if (!this.isPlaying) {
                this.audio.pause();
                this.isPause = true
            } else {
                this.audio.play();
                this.isPause = false
            }
        },
        setPlay() {
            if (!this.song.id) return;
            this.isPlaying = true
            this.audio.play();
            this.isPause = false

        },
        setPause() {
            if (!this.song.id) return;
            this.isPlaying = false
            this.audio.pause();
            this.isPause = true
        },
        //切换循环类型
        toggleLoop() {
            if (this.loopType == 2) {
                this.loopType = 0;
            } else {
                this.loopType++;
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
        //播放时间拖动中
        onSliderInput(val: number) {
            this.sliderInput = true;
        },
        //定时器
        interval() {
            if (this.isPlaying && !this.sliderInput) {
                this.currentTime = parseInt(this.audio.currentTime.toString());
                this.duration = parseInt(this.audio.duration.toString());
                this.ended = this.audio.ended
            }
        }
    }
})


export const userPlayerInit = () => {
    let timer: NodeJS.Timer;
    const {init, interval, playEnd} = usePlayerStore()

    const {ended} = storeToRefs(usePlayerStore())

    //监听播放结束
    watch(ended, ended => {
        if (!ended) return
        playEnd()
    })

    //启动定时器
    onMounted(() => {
        init()
        console.log('启动定时器')
        timer = setInterval(interval, 1000)
    })
    //清除定时器
    onUnmounted(() => {
        console.log('清除定时器')
        clearInterval(timer)
    })
}
