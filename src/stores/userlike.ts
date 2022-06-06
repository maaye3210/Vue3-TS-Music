import {defineStore} from "pinia";
import { userPlaylist, userlikelist, userSubcount} from "@/utils/api";
import type {PlayListDetail} from '@/models/playlist';
import type {Subcount} from '@/models/user';


export const useUserLikeStore = defineStore("userlike", {
    state: () => {
        return {
            playlist: [] as PlayListDetail[],
            loveIdList:[] as number[],
            uid:-1,
            subcount:{} as Subcount
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
          this.subcount = await userSubcount(uid)
        }
    }
})
