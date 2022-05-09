import type { DJBanner, DjCatelist ,CurrentPage,DjInfo} from "@/models/dj";
import { defineStore } from "pinia";
import { ref } from "vue";
import { djCatelist, djBanner, djByType} from "@/utils/api";

export const useDJStore = defineStore("dj", {
    state: () => ({
        djBanners:[] as DJBanner[],
        djCatelists:[] as DjCatelist[],
        currentPage:{} as CurrentPage
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
            this.currentPage.djInfoList= await djByType(id)
        },
    }
})