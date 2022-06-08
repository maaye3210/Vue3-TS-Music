import type {Banner} from "@/models/banner";
import type {DjProgram, Personalized, PersonalizedMv, PersonalizedNewSong} from "@/models/personalized";
import type {PlayListDetail, PlaylistHighqualityTag} from "@/models/playlist";
import type {PlayListCat} from "@/models/playlist_cat";
import type {Song} from "@/models/song";
import type {SongUrl} from "@/models/song_url";
import type {TopListDetail} from "@/models/toplist_detail";
import http from "@/utils/http";
import type {Artist, Mv} from "@/models/artist";
import type {ArtistDesc, ArtistDetail} from "@/models/artist_detail";
import type {Album,LoveAlbum} from "@/models/album";
import type {PersonalizedPrivateContent, Video, VideoGroup} from "@/models/video";
import type {SearchHotDetail, SearchSuggest} from "@/models/search";
import type {MvUrl,LoveMv} from "@/models/mv";
import type {PlayListHot} from "@/models/playlist_hot";
import type {UserProfile,Subcount} from "@/models/user";
import type {Account} from "@/models/user";
import type {DjCatelist,DJBanner,RecommendDjProgram,DjInfo,Recommend,userDjRecommend,djHourTopList,todayPerferedDj} from "@/models/dj";
import type {djDetail} from "@/models/djlist";
import type {Lyrics} from '@/models/lyric';
import type {PlayListCommentInfo} from "@/models/comment";

export async function useLogin(phone: string, password: string) {
    return await http.get<{
        code: number,
        cookie: string,
        token: string,
        account: Account
    }>("login/cellphone", {phone: phone, password: password})
}

export async function useLoginStatus() {
    return await http.get<{
        data: {
            code: number,
            profile: UserProfile,
            account: Account
        },
    }>("login/status")
}

export async function useSongUrl(id: number) {
    const {data} = await http.get<{ data: SongUrl[] }>('/song/url', {id: id})
    return data.first()
}

export async function useDetail(id: number) {
    const res = await http.get<{ songs: Song[] }>('/song/detail', {ids: id})
    const {songs} = res
    return songs.first()
}

export async function useBanner() {
    const {banners} = await http.get<{ banners: Banner[] }>('/banner', {type: 1})
    return banners
}

export async function usePersonalized() {
    const {result} = await http.get<{ result: Personalized[] }>('/personalized')
    return result
}

export async function usePersonalizedNewSong() {
    const {result} = await http.get<{ result: PersonalizedNewSong[] }>('/personalized/newsong')
    return result
}

export async function usePlayListDetail(id: number, s: number = 8) {
    const {playlist} = await http.get<{ playlist: PlayListDetail }>('/playlist/detail', {id: id, s: s})
    return playlist
}

export async function usePlayListTrackAll(id: number) {

    const {songs} = await http.get<{ songs: Song[] }>('playlist/track/all', {id: id})
    return songs
}

export async function useTopListDetail() {
    const {list} = await http.get<{ list: TopListDetail[] }>('/toplist/detail')
    return list
}

export async function usePlayListCatList() {
    const {sub, categories} = await http.get<{ sub: PlayListCat[], categories: string[] }>('playlist/catlist')

    return {sub, categories}
}

export async function userArtistList(pageData: { type: number, area: number, initial: string, page: number, limit: number }) {
    const res = await http.get<{ artists: Artist[] }>('artist/list', {
        type: pageData.type,
        area: pageData.area,
        initial: pageData.initial,
        limit: pageData.limit,
        offset: (pageData.page - 1) * pageData.limit
    })

    return res.artists
}

export async function useArtistDetail(id: number) {
    const {data} = await http.get<{ data: ArtistDetail }>('artist/detail', {id: id})
    return data
}

export async function useArtistDesc(id: number) {
    return await http.get<ArtistDesc>('artist/desc', {id: id})
}

export async function useArtistSongs(id: number, order: string = 'time', limit: number = 10, offset: number = 0) {
    return await http.get<{ songs: Song[] }>('artist/songs', {id: id, order: order, limit: limit, offset: offset})
}

export async function useArtistAlbum(id: number, limit: number = 10, offset: number = 0) {
    return await http.get<{ hotAlbums: Album[] }>('artist/album', {id: id, limit: limit, offset: offset})
}

export async function useArtistMv(id: number, limit: number = 10, offset: number = 0) {
    return await http.get<{ mvs: Mv[] }>('artist/mv', {id: id, limit: limit, offset: offset})
}
// 视频时间线推荐 需要登录
export async function useVideoTimelineRecommend(offset: number = 0) {
    const {datas} = await http.get<{ datas: Video[] }>('video/timeline/recommend', {offset: offset})
    return datas
}

export async function usePersonalizedPrivateContentList(limit: number = 10, offset: number = 0) {
    const {result} = await http.get<{ result: PersonalizedPrivateContent[] }>('personalized/privatecontent/list', {
        limit: limit,
        offset: offset
    })
    return result
}


export async function usePersonalizedMv() {
    const {result} = await http.get<{ result: PersonalizedMv[] }>('personalized/mv')
    return result
}

export async function usePersonalizedDjProgram() {
    const {result} = await http.get<{ result: DjProgram[] }>('personalized/djprogram')
    return result
}


export async function useVideoGroupList() {
    const {data} = await http.get<{ data: VideoGroup[] }>('video/group/list')
    return data
}

export async function useVideoGroup(id?: number, offset?: number) {
    const {datas} = await http.get<{ datas: Video[] }>(id ? 'video/group' : 'video/timeline/all', {
        id: id,
        offset: offset
    })
    return datas
}


export async function useAlbum(id: number) {
    const {album, songs} = await http.get<{ album: Album, songs: Song[] }>('album', {id: id})

    return {album, songs}
}

export async function useSearchHotDetail() {
    const {data} = await http.get<{ data: SearchHotDetail[] }>('search/hot/detail')
    return data
}

export async function useSearchSuggest(keywords: string) {
    const {result} = await http.get<{ result: SearchSuggest }>('search/suggest', {keywords: keywords})
    return result
}

export async function useMvDetail(mvid: number) {

}

export async function useMvUrl(id: number) {
    const {data} = await http.get<{ data: MvUrl }>("mv/url", {id: id})
    return data
}


export async function usePlaylistHighqualityTags() {
    const {tags} = await http.get<{ tags: PlaylistHighqualityTag[] }>("playlist/highquality/tags")

    return tags
}

export async function usePlaylistHot() {
    const {tags} = await http.get<{ tags: PlayListHot[] }>("playlist/hot")

    return tags
}

export async function useTopPlaylistHighquality(params?: { limit?: number, before?: number, cat: string }) {
    return await http.get<{ playlists: PlayListDetail[], total: number, more: boolean, lasttime: number }>("top/playlist/highquality", params)

}
// 获取电台轮播
export async function djBanner() {
    const {data}=await http.get<{ data: DJBanner[]}>("/dj/banner")
    return data
}
// 获取电台分类
export async function djCatelist() {
    const {categories}=await http.get<{ categories: DjCatelist[]}>("/dj/catelist")
    return categories.map(category=>{return {id:category.id,name:category.name}})
}
// 按类型获取电台
export async function djByType(id:number) {
    const {djRadios}=await http.get<{ djRadios: DjInfo[]}>("/dj/recommend/type",{type:id})
    return djRadios
}
// 获取个性推荐电台(展示在电台首页)
export async function djRecommend() {
    const {data}=await http.get<{ data: Recommend[]}>("/dj/personalize/recommend")
    return data
}
export async function djProgram(rid:number, offset:number=0, limit:number = 5) {
    const {programs}=await http.get<{ programs: RecommendDjProgram[]}>("/dj/program",{rid,limit,offset})
    return programs
}
export async function useProgramDjDetail(id:number) {
    const {program}=await http.get<{ program: RecommendDjProgram }>("/dj/program/detail",{id})
    console.log(program);
    
    return program
}
export async function userdjRecommend() {
    const data=await http.get<userDjRecommend>("/dj/recommend")
    return data
}
// /dj/program/toplist/hours
export async function djToplist(limit:number) {
    const {data:{list:arr}}=await http.get<{data:{list:djHourTopList[]}}>("/dj/program/toplist/hours",{limit})
    return arr
}
// /lyric
export async function lyric(id:number) {
    return await http.get<Lyrics>("/lyric",{id})
}

// /likelist?uid=32953014 我喜欢
export async function userlikelist(uid:number) {
    const {ids} = await http.get<{ids:number[]}>("/likelist",{uid})
    return ids
}

// /user/subcoun
export async function userPlaylist(uid:number) {
    const { playlist } = await http.get<{playlist:PlayListDetail[]}>("/user/playlist",{uid})
    return playlist
}

export async function userSubcount(uid:number) {
    return await http.get<Subcount>("/user/subcount",{uid})
}
// /album/sublist
export async function userAlbumSublist(limit?:number, offset?:number) {
// limit: 取出数量 , 默认为 25
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0

    const {data} = await http.get<{data:LoveAlbum[]}>("/album/sublist",{limit ,offset})
    return data
}
// /dj/sublist
export async function userDjSublist() {
    const {djRadios} = await http.get<{djRadios:DjInfo[]}>("/dj/sublist")
    return djRadios
}
// /mv/sublist
export async function userMvSublist() {
    const {data} = await http.get<{data:LoveMv[]}>("/mv/sublist")
    return data
}
// /user/dj
export async function userDj(id:number) {
    const data = await http.get<{}>("/mv/sublist",{id})
    return data
}
// /dj/today/perfered
export async function userTodayPerferedDj() {
    const {data} = await http.get<{data:todayPerferedDj[]}>("/dj/today/perfered")
    return data
}
// /dj/detail
export async function useDjDetail(rid:number) {
    const {data} = await http.get<{data:DjInfo}>("/dj/detail",{rid})
    return data
}
// /comment/new 统一评论数据接口
export async function useCommentNew(id:number,type:number,pageNo:number=1,pageSize:number=20,sortType:number=1,cursor?:number) {
    // pageNo:分页参数,第 N 页,默认为 1
    // pageSize:分页参数,每页多少条数据,默认 20
    // sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
    // cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
    const {data} = await http.get<{data:PlayListCommentInfo}>("/comment/new",{id,type,pageNo,pageSize,sortType,cursor})
    return data
}