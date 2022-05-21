import type { DJBanner, DjCatelist } from "@/models/dj";
import { defineStore } from "pinia";
import { djCatelist, djBanner} from "@/utils/api";


export const useDJStore = defineStore("dj", {
    state: () => ({
        djBanners:[] as DJBanner[],
        djCatelists:[] as DjCatelist[]
    }),
    actions: {
        async getDjCatelists() {
            this.djCatelists= await djCatelist()
        },
        async getDjBanner() {
            this.djBanners= await djBanner()
        }
    }
})