import type {Artist} from '@/models/artist';

export interface Album {
    songs: any[];
    paid: boolean;
    onSale: boolean;
    mark: number;
    blurPicUrl: string;
    companyId: number;
    alias: string[];
    artists: Artist[];
    copyrightId: number;
    picId: number;
    artist: Artist;
    publishTime: number;
    company: string;
    briefDesc: string;
    picUrl: string;
    commentThreadId: string;
    pic: number;
    tags: string;
    description: string;
    status: number;
    subType: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
}
export interface LoveAlbum{
    subTime: number,
    msg: [],
    alias: [],
    artists: Artist[],
    picId: number,
    picUrl: string,
    name: string,
    id: number,
    size: number,
    transNames: []
  }
