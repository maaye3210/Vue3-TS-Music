import {defineStore} from "pinia";
import { userPlaylist, userlikelist} from "@/utils/api";
import type {PlayListDetail} from '@/models/playlist';


export const useUserLikeStore = defineStore("userlike", {
    state: () => {
        return {
            playlist: [] as PlayListDetail[],
            loveIdList:[] as number[],
            uid:-1
        }
    },
    getters: {
        lovelist: state => {
            return state.playlist.length > 0 ? state.playlist[0] : {} as PlayListDetail
        },
        userId: state =>{
          return state.playlist.length > 0 ? state.playlist[0].id : -1
        },
        myplaylists: state => {
            return state.playlist.filter(list => list.userId === state.uid)
        },
        likeplaylists: state => {
            return state.playlist.filter(list => list.userId != state.uid)
        },
    },
    actions: {
        async getUserPlaylist(uid:number) {
          this.uid=uid
          this.playlist = await userPlaylist(uid)
          this.loveIdList = await userlikelist(uid)
        }
    }
})
