import { formatLyricChain, checkLyric } from '../helper/lyrics';

const str = '[00:00.000] 作曲 : 陈小霞\n[00:03.000] 改编词 : 姚若龙\n[00:04.000] 原唱 : 周蕙\n[00:11.43]远处的钟声回荡在雨里\n[00:17.67]我们在屋檐底下牵手听\n[00:23.82]幻想教堂里头那场婚礼\n[00:29.59]是为祝福我俩而举行\n[00:34.38]\n[00:35.65]一路从泥泞走到了美景\n[00:41.77]习惯在彼此眼中找勇气\n[00:48.03]累到无力总会想吻你\n[00:53.45]才能忘了情路艰辛\n[00:59.88]\n[01:02.28]你我约定难过的往事不许提\n[01:08.36]也答应永远都不让对方担心\n[01:14.64]要做快乐的自己照顾自己\n[01:20.74]就算某天一个人孤寂\n[01:26.14]\n[01:26.31]你我约定一争吵很快要喊停\n[01:32.37]也说好没有秘密彼此很透明\n[01:38.46]我会好好地爱你傻傻爱你\n'

describe('lyrics', () => {
  it('happy path', () => {
    const startNode = formatLyricChain(str)
    console.log(startNode);

    if (startNode) {
      expect(checkLyric(14000, startNode)?.word).toBe('远处的钟声回荡在雨里')
      expect(checkLyric(6000, startNode)?.word).toBe(' 原唱 : 周蕙')
      expect(checkLyric(100000, startNode)?.word).toBe('我会好好地爱你傻傻爱你')
    }
  })
})