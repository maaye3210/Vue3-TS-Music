export interface DJBanner {
	targetId: number;
	targetType: number;
	pic: string;
	url: string;
	typeTitle: string;
	exclusive: boolean;
}
export interface DjCatelist {
	id: number;
	name: string;
}
export interface DjRecommend {
	defaultAvatar: boolean,
  province: number,
  authStatus: number,
  followed: boolean,
  vatarUrl: string,
  accountStatus: number,
  gender: number,
  city: number,
  birthday: number,
  userId: number,
  userType: number,
  nickname: string,
  signature: string,
  description: string,
  detailDescription: string,
  avatarImgId: number,
  backgroundImgId: number,
  backgroundUrl: string,
  authority: number,
  mutual: boolean,
  expertTags: object,
  experts: object,
  djStatus: number,
  vipType: number,
  remarkName: object,
  authenticationTypes: number,
  avatarDetail: object,
  anchor: boolean,
  avatarImgIdStr: string,
  backgroundImgIdStr: string,
  avatarImgId_str: string
}
export interface DjInfo{
	dj: {
		defaultAvatar: boolean,
		province: number,
		authStatus: number,
		followed: boolean,
		avatarUrl: string,
		accountStatus: number,
		gender: number,
		city: number,
		birthday: number,
		userId: number,
		userType: number,
		nickname: string,
		signature: string,
		description: string,
		detailDescription: string,
		avatarImgId: number,
		backgroundImgId: number,
		backgroundUrl: string,
		authority: number,
		mutual: boolean,
		expertTags: object,
		experts: object,
		djStatus: number,
		vipType: number,
		remarkName: object,
		authenticationTypes: number,
		avatarDetail: object,
		anchor: boolean
},
category: string,
secondCategory: string,
buyed: boolean,
price: number,
originalPrice: number,
discountPrice: object,
purchaseCount: number,
lastProgramName: string,
videos: object,
finished: boolean,
underShelf: boolean,
liveInfo: object,
playCount: number,
privacy: boolean,
icon: object,
manualTagsDTO: object,
descPicList: object,
dynamic: boolean,
shortName: string,
lastProgramId: number,
feeScope: number,
categoryId: number,
taskId: number,
createTime: number,
programCount: number,
picId: number,
subCount: number,
lastProgramCreateTime: number,
radioFeeType: number,
intervenePicUrl: string,
picUrl: string,
intervenePicId: number,
name: string,
id: number,
desc: string,
rcmdtext: string,
lastUpdateProgramName: string
}
export interface CurrentPage{
	currentName:string
	currentId:number
	djInfoList:DjInfo[]
}
