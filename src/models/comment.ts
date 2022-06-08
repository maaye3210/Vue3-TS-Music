export interface PlayListComment {
  user: User;
  beReplied?: any;
  commentId: number;
  content: string;
  status: number;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  replyCount: number;
  liked: boolean;
  expressionUrl?: any;
  parentCommentId: number;
  repliedMark: boolean;
  pendantData?: any;
  showFloorComment: ShowFloorComment;
  decoration: Decoration;
  commentLocationType: number;
  args: string;
  tag: Tag;
  source?: any;
  resourceSpecialType?: any;
  extInfo: Decoration;
  commentVideoVO: CommentVideoVO;
  contentResource?: any;
  contentPicNosKey?: any;
  contentPicUrl?: any;
  grade?: any;
}

export interface PlayListCommentInfo {
  commentsTitle: string;
  comments: Comment[];
  currentCommentTitle: string;
  currentComment?: any;
  totalCount: number;
  hasMore: boolean;
  cursor: string;
  sortType: number;
  sortTypeList: SortTypeList[];
}

interface SortTypeList {
  sortType: number;
  sortTypeName: string;
  target: string;
}

interface Comment {
  user: User;
  beReplied?: any;
  commentId: number;
  content: string;
  status: number;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  replyCount: number;
  liked: boolean;
  expressionUrl?: any;
  parentCommentId: number;
  repliedMark: boolean;
  pendantData?: PendantDatum;
  showFloorComment: ShowFloorComment;
  decoration: Decoration;
  commentLocationType: number;
  args: string;
  tag: Tag;
  source?: any;
  resourceSpecialType?: any;
  extInfo: ExtInfo;
  commentVideoVO: CommentVideoVO;
  contentResource?: any;
  contentPicNosKey?: any;
  contentPicUrl?: any;
  grade?: any;
}

interface CommentVideoVO {
  showCreationEntrance: boolean;
  allowCreation: boolean;
  creationOrpheusUrl?: any;
  playOrpheusUrl?: any;
  videoCount: number;
  forbidCreationText: string;
}

interface ExtInfo {
  repliedByAuthorCount?: string;
  authorRepliedIds?: number[];
}

interface Tag {
  datas?: any[];
  extDatas: any[];
  relatedCommentIds?: any;
}

interface Decoration {
}

interface ShowFloorComment {
  replyCount: number;
  comments?: any;
  showReplyCount: boolean;
  topCommentIds?: any;
  target?: any;
}

interface PendantDatum {
  id: number;
  imageUrl: string;
}

interface User {
  avatarDetail?: AvatarDetail;
  commonIdentity?: any;
  locationInfo?: any;
  liveInfo?: any;
  followed: boolean;
  vipRights?: VipRight;
  relationTag?: any;
  anonym: number;
  userId: number;
  userType: number;
  nickname: string;
  avatarUrl: string;
  authStatus: number;
  expertTags?: any;
  experts?: any;
  vipType: number;
  remarkName?: any;
  isHug: boolean;
}

interface VipRight {
  associator: Associator;
  musicPackage?: any;
  redVipAnnualCount: number;
  redVipLevel: number;
}

interface Associator {
  vipCode: number;
  rights: boolean;
}

interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}