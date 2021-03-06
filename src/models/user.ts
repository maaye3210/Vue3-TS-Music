export interface UserProfile {
	userId: number;
	userType: number;
	nickname: string;
	avatarImgId: number;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundUrl: string;
	signature?: any;
	createTime: number;
	userName: string;
	accountType: number;
	shortUserName: string;
	birthday: number;
	authority: number;
	gender: number;
	accountStatus: number;
	province: number;
	city: number;
	authStatus: number;
	description?: any;
	detailDescription?: any;
	defaultAvatar: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	locationStatus: number;
	vipType: number;
	followed: boolean;
	mutual: boolean;
	authenticated: boolean;
	lastLoginTime: number;
	lastLoginIP: string;
	remarkName?: any;
	viptypeVersion: number;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
}
export interface Account{
  anonimousUser: boolean;
  ban: number;
  baoyueVersion: number;
  createTime: number;
  donateVersion: number;
  id: number;
  salt: string;
  status: number;
  tokenVersion: number;
  type: number;
  uninitialized: boolean;
  userName: string;
  vipType: number;
  viptypeVersion: number;
  whitelistAuthority: number;
}
export interface Subcount{
	artistCount: number
code: number
createDjRadioCount: number
createdPlaylistCount: number
djRadioCount: number
mvCount: number
newProgramCount: number
programCount: number
subPlaylistCount: number
}