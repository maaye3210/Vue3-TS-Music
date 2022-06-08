import type {Album} from '@/models/album';
import type {Artist} from '@/models/artist';


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
export interface DJ{
	accountStatus: number
	anchor: boolean
	authStatus: number
	authenticationTypes: number
	authority: number
	avatarDetail: object
	avatarImgId: number
	avatarImgIdStr: string
	avatarImgId_str: string
	avatarUrl: string
	backgroundImgId: number
	backgroundImgIdStr: string
	backgroundUrl: string
	birthday: number
	brand: string
	city: number
	defaultAvatar: boolean
	description: string
	detailDescription: string
	djStatus: number
	expertTags: object
	experts: object
	followed: boolean
	gender: number
	mutual: boolean
	nickname: string
	province: number
	remarkName: object
	signature: string
	userId: number
	userType: number
	vipType: number
}
export interface DjInfo{
	dj: DJ
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
export interface Recommend {
	dj: DJ,
	alg: string
	buyed: boolean
	category: string
	categoryId: number
	composeVideo: boolean
	createTime: number
	desc: string
	descPicList: object
	discountPrice: object
	dynamic: boolean
	feeScope: number
	finished: boolean
	hightQuality: boolean
	icon: object
	id: number
	intervenePicId: number
	intervenePicUrl: string
	lastProgramCreateTime: number
	lastProgramId: number
	lastProgramName: string
	lastUpdateProgramName: string
	liveInfo: object
	manualTagsDTO: object
	name: string
	originalPrice: number
	picId: number
	picUrl: string
	playCount: number
	price: number
	privacy: boolean
	programCount: number
	purchaseCount: number
	radioFeeType: number
	rcmdText: string
	rcmdtext: string
	scoreInfoDTO: object
	secondCategory: string
	secondCategoryId: number
	shortName: string
	subCount: number
	taskId: number
	underShelf: boolean
	videos: object
	whiteList: boolean
}
export interface RecommendDjProgram{
	alg: object
	artists:Artist[]
	auditDisPlayStatus: number
	auditStatus: number
	authDTO: object
	bdAuditStatus: number
	blurCoverUrl: string
	buyed: boolean
	canReward: boolean
	categoryId: number
	categoryName: object
	channels: []
	commentCount: number
	commentThreadId: string
	coverId: number
	coverUrl: string
	createEventId: number
	createTime: number
	description: string
	disPlayStatus: object
	dj: DJ
	djPlayRecordVo: object
	duration: number
	existLyric: boolean
	feeScope: number
	h5Links: object
	id: number
	isPublish: boolean
	likedCount: number
	listenerCount: number
	liveInfo: object
	mainSong: mainSong
	mainTrackId: number
	name: string
	privacy: boolean
	programDesc: object
	programFeeType: number
	pubStatus: number
	radio: Radio
	recommended: boolean
	reward: boolean
	scheduledPublishTime: number
	score: number
	secondCategoryId: number
	secondCategoryName: object
	serialNum: number
	shareCount: number
	smallLanguageAuditStatus: number
	songs: object
	subscribed: boolean
	subscribedCount: number
	titbitImages: object
	titbits: object
	trackCount: number
	videoInfo: object
}
export interface Quality{
	bitrate: number
	dfsId: number
	extension: string
	id: number
	name: object
	playTime: number
	size: number
	sr: number
	volumeDelta: number
}
export interface Radio{
	buyed: boolean
	category: string
	categoryId: number
	createTime: number
	desc: string
	descPicList: object
	discountPrice: object
	dj: object
	dynamic: boolean
	feeScope: number
	finished: boolean
	icon: object
	id: number
	intervenePicId: number
	intervenePicUrl: string
	lastProgramCreateTime: number
	lastProgramId: number
	lastProgramName: object
	liveInfo: object
	manualTagsDTO: object
	name: string
	originalPrice: number
	picId: number
	picUrl: string
	playCount: number
	price: number
	privacy: boolean
	programCount: number
	purchaseCount: number
	radioFeeType: number
	secondCategory: string
	shortName: string
	subCount: number
	taskId: number
	underShelf: boolean
	videos: object
}
export interface mainSong {
	album: Album
	alias: []
	artists: Artist[]
	audition: object
	bMusic: Quality
	commentThreadId: string
	copyFrom: string
	copyright: number
	copyrightId: number
	crbt: object
	dayPlays: number
	disc: string
	duration: number
	fee: number
	ftype: number
	hMusic: Quality
	hearTime: number
	id: number
	lMusic: Quality
	mMusic: Quality
	mark: number
	mp3Url: object
	mvid: number
	name: string
	no: number
	noCopyrightRcmd: object
	playedNum: number
	popularity: number
	position: number
	ringtone: string
	rtUrl: object
	rtUrls: []
	rtype: number
	rurl: object
	score: number
	sign: object
	starred: boolean
	starredNum: number
	status: number
	transName: object
}
export interface djRadios {
	buyed: boolean
	category: string
	categoryId: number
	copywriter: string
	createTime: number
	dj: DJ
	feeScope: number
	id: number
	name: string
	picUrl: string
	playCount: number
	programCount: number
	radioFeeType: number
	rcmdtext: object
	subCount: number
	subed: boolean
}
export interface userDjRecommend{
	name:string
	djRadios:djRadios[]
}
export interface djHourTopList{
	lastRank: number
	program: RecommendDjProgram
	programFeeType: number
	rank: number
	score: number
}
export interface todayPerferedDj{
	alg: string
	discountPrice: object
	feeScope: number
	icon: object
	id: number
	lastProgramName: string
	name: string
	originalPrice: object
	picUrl: string
	playCount: number
	programCount: number
	radioFeeType: number
	rcmdText: string
	subCount: number
	subed: boolean
	traceId: object
}
export interface djDetail {
    id: number,
    name: string,
    dj: DJ,
    picId: number,
    picUrl: string,
    desc: string,
    subCount: number,
    shareCount: number,
    likedCount: number,
    programCount: number,
    commentCount: number,
    createTime: number,
    categoryId: number,
    category: string,
    secondCategoryId: number,
    secondCategory: string,
    radioFeeType: number,
    feeScope: number,
    lastProgramCreateTime: number,
    lastProgramId: number,
    rcmdText: string,
    subed: boolean,
    commentDatas: [],
    feeInfo: object,
    unlockInfo: object,
    original: boolean,
    playCount: number,
    privacy: boolean,
    disableShare: boolean,
    icon: object,
    activityInfo: object,
    toplistInfo: object,
    dynamic: boolean,
    labelDto: object,
    labels: object
}
