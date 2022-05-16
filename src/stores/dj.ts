import type { DJBanner, DjCatelist ,CurrentPage,Recommend,RecommendDjProgram} from "@/models/dj";
import type { SongUrl } from "@/models/song_url";
import type { Song } from "@/models/song";
import { defineStore } from "pinia";
import { ref } from "vue";
import { djCatelist, djBanner, djByType,djRecommend,djProgram,useSongUrl,useDetail} from "@/utils/api";


export const useDJStore = defineStore("dj", {
    state: () => ({
        djBanners:[] as DJBanner[],
        djCatelists:[] as DjCatelist[],
        currentPage:{} as CurrentPage,
        recommend:[] as Recommend[],
        recommendProgram:[] as RecommendDjProgram[],
        programIndex:0,
        programSum:0,
        songUrl:{} as SongUrl,
        songDetail:{} as Song
    }),
    
    actions: {
        async getDjCatelists() {
            this.djCatelists= await djCatelist()
            this.currentPage.currentName= this.djCatelists[0].name
            this.currentPage.currentId= this.djCatelists[0].id
            await this.getDjByType(this.currentPage.currentId)
        },
        async getDjBanner() {
            this.djBanners= await djBanner()
        },
        async getDjByType(id:number) {
            this.currentPage.djInfoList = await djByType(id)
        },
        // 推荐电台
        async getRecommendList() {
            this.recommend = await djRecommend()
            // 推荐电台节目列表
            this.recommendProgram = await djProgram(this.recommend[0].id)
            // 立刻获得列表数组第一个的歌曲信息,展示在首页
            this.songUrl = await useSongUrl(this.recommendProgram[0].mainSong.id)
            this.songDetail = await useDetail(this.recommendProgram[2].mainSong.id)
        }
    }
})