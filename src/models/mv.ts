export interface MvUrl {
	id: number;
	url: string;
	r: number;
	size: number;
	md5: string;
	code: number;
	expi: number;
	fee: number;
	mvFee: number;
	st: number;
	promotionVo?: any;
	msg: string;
}
export interface LoveMv {
	alg: object
	aliaName:string
	coverUrl:string
	creator:{userId:number,userName:string}[]
	durationms:number
	markTypes:object
	playTime:number
	title:string
	transName:string
	type:number
	vid:string
}
