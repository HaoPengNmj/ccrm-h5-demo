import CryptoJS from 'crypto-js';
import { getJsapiTickit } from '@/apis/user';

/**
 * 生成签名
 * @param {string} jsapiTicket - 企业微信的 jsapi_ticket
 * @param {string} nonceStr - 随机字符串
 * @param {number} timestamp - 时间戳
 * @param {string} url - 当前网页的 URL
 * @returns {string} - 生成的签名
 */
function generateSignature(jsapiTicket: string, nonceStr: string, timestamp: number, url: string): string {
  const string1 = [`jsapi_ticket=${jsapiTicket}`, `noncestr=${nonceStr}`, `timestamp=${timestamp}`, `url=${url}`].join('&');
  const signature = CryptoJS.SHA1(string1).toString(CryptoJS.enc.Hex);
  return signature;
}

/**
 * WeCom功能钩子
 *
 * 该钩子用于在Vue组件中集成WeCom JS-SDK的功能，包括预览文件和获取地理位置信息
 * 它在组件挂载时初始化WeCom JS-SDK，并提供预览文件和获取位置信息的方法
 */
const useWeCom = () => {
  let ready = false;

  /**
   * 初始化WeCom JS-SDK
   *
   * 该函数负责初始化WeCom JS-SDK，包括配置必要的参数和监听ready/error事件
   * 它会检查wx对象是否存在，获取JSAPI票证，生成签名，并配置wx对象
   */
  const initWeCom = async () => {
    if (ready) {
      return;
    }

    if (typeof wx === 'undefined') {
      console.error('wx is not defined. Make sure you have included the WeCom JS-SDK script.');
      return;
    }

    const { data } = await getJsapiTickit();

    const timestamp = new Date().getTime();
    const nonceStr = (Math.random() * 1000000000000).toFixed(0);
    const jsapi_ticket = data?.ticket;
    const url = window.location.href.split('#')[0];
    const signature = generateSignature(jsapi_ticket, nonceStr, timestamp, url);

    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式
      appId: import.meta.env.VITE_CORP_ID as string, // 企业ID
      timestamp: timestamp, // 时间戳
      nonceStr: nonceStr, // 随机字符串
      signature: signature, // 签名
      jsApiList: ['getLocation', 'previewFile', 'onMenuShareTimeline', 'setClipboardData'], // 需要使用的JS接口列表
    });

    wx.ready(() => {
      ready = true;
    });
    wx.error(() => {
      ready = false;
    });
  };

  /**
   * 预览文件函数
   *
   * 该函数用于在微信环境中预览文件它依赖于微信的wx.ready方法和wx.previewFile方法
   * 主要用于预览指定url的文件，可以广泛应用于需要在微信内预览文档、图片等文件的场景
   *
   * @param url 文件的预览地址，必须是完整的URL路径
   * @param name 文件名，需要包含文件格式的后缀
   * @param size 文件的字节大小，用于确保文件能正确打开
   * @param callback 可选的回调函数，用于处理预览成功或失败的结果
   */
  const previewFile = async (url: string, name: string, size: number, callback?) => {
    wx.ready(() => {
      wx.previewFile({
        url: url, // 需要预览文件的地址(必填，可以使用相对路径)
        name: name, // 需要预览文件的文件名，必须有带文件格式的后缀，例如.doc(不填的话取url的最后部分，最后部分是个包含格式后缀的文件名)
        size: size, // 需要预览文件的字节大小(必填，而且大小必须正确，否则会打开失败)
        success: (res) => {
          console.info('wx.previewFile :>> ', res);
          callback(res);
        },
        fail: (err) => {
          console.error('wx.previewFile :>> ', err);
          callback(err);
        },
      });
    });
  };

  /**
   * 获取当前位置信息
   *
   * 本函数利用微信的API获取用户的地理位置信息，使用回调函数处理结果
   * 主要用于需要获取用户位置信息的场景，例如地图服务、位置分享等
   *
   * @param {Function} callback 回调函数，用于处理获取位置信息成功或失败的结果
   *                            回调函数接受一个参数，成功时为位置信息对象，失败时为错误对象
   */
  const getLocation = async (callback) => {
    wx.ready(() => {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          console.info('wx.getLocation :>> ', res);
          callback(res);
        },
        fail: (err) => {
          console.error('wx.getLocation :>> ', err);
          callback(err);
        },
      });
    });
  };

  /**
   * 分享到企业微信聊天窗
   *
   * @param {string} title 分享标题
   * @param {string} desc 分享描述
   * @param {string} link 分享链接：在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
   * @param {string} imgUrl 分享封面图片
   * @param {Function} callback 回调函数，用于处理分享成功或失败的结果
   *                            回调函数接受一个参数，成功时为结果对象，失败时为错误对象
   */
  const shareWechatMessage = async (params: { title: string; desc: string; link: string; imgUrl: string }, callback?) => {
    wx.ready(() => {
      wx.invoke(
        'shareWechatMessage',
        {
          title: params.title || '',
          desc: params.desc || '',
          link: params.link,
          imgUrl: params.imgUrl,
          enableIdTrans: 0, // 是否开启id转译，不填默认为0
        },
        function (res) {
          if (res.err_msg === 'shareWechatMessage:ok') {
            console.info('分享成功 :>> ', res);
            callback(res);
          } else {
            console.error('分享失败 :>> ', res);
            callback(res);
          }
        }
      );
    });
  };

  /**
   * 分享到微信朋友圈功能
   *
   * 该函数用于在微信环境中调用分享功能
   * 主要用于需要在微信内分享内容的场景
   *
   * @param {string} title 分享标题
   * @param {string} link 分享链接：在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
   * @param {string} imgUrl 分享封面图片
   * @param {Function} callback 回调函数，用于处理分享成功或失败的结果
   *                            回调函数接受一个参数，成功时为结果对象，失败时为错误对象
   */
  const onMenuShareTimeline = async (params: { title: string; link: string; imgUrl: string }, callback?) => {
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: params.title || '',
        link: params.link,
        imgUrl: params.imgUrl,
        enableIdTrans: 0, // 是否开启id转译，不填默认为0
        success: function (res) {
          console.info('onMenuShareTimeline :success>> ', res);
          callback(res);
        },
        error: function (res) {
          console.error('onMenuShareTimeline :error>> ', res);
          callback(res);
        },
      });
    });
  };
  const shareToExternalMoments = (params: { title: string; desc: string; link: string; imgUrl: string }, callback?) => {
    wx.ready(() => {
      // const { data } = await getJsapiTickit();
      const timestamp = new Date().getTime();
      const nonceStr = (Math.random() * 1000000000000).toFixed(0);
      const jsapi_ticket = 'MWuAU7++akmU/aAfL9ppsg==';
      const url = window.location.href.split('#')[0];
      const signature = generateSignature(jsapi_ticket, nonceStr, timestamp, url);
      console.log('wx :>> ', wx);
      console.log('wx.config :>> ', wx.config);
      console.log('wx.agentConfig :>> ', wx.agentConfig);
      wx.agentConfig({
        corpid: import.meta.env.VITE_CORP_ID as string, // 企业ID
        agentid: import.meta.env.VITE_AGENT_ID as string,
        timestamp: timestamp, // 时间戳
        nonceStr: nonceStr, // 随机字符串
        signature: signature, // 签名
        jsApiList: ['shareToExternalMoments'], // 需要使用的JS接口列表
        success: function (res) {
          console.info('wx.agentConfig :>> ', res);
          wx.invoke(
            'shareToExternalMoments',
            {
              text: {
                content: params.desc, // 文本内容
              },
              attachments: [
                // {
                //   msgtype: 'image', // 消息类型，必填
                //   image: {
                //     mediaid: '', // 图片的素材id
                //     imgUrl: '', // 图片的imgUrl,跟图片mediaid填其中一个即可
                //   },
                // },
                {
                  msgtype: 'link', // 消息类型，必填
                  link: {
                    title: params.title, // H5消息标题
                    imgUrl: params.imgUrl, // H5消息封面图片URL
                    url: params.link, // H5消息页面url 必填
                  },
                },
                // {
                //   msgtype: 'video', // 消息类型，必填
                //   video: {
                //     mediaid: '', // 视频的素材id
                //   },
                // },
              ],
            },
            function (res) {
              console.info('shareToExternalMoments :success>> ', res);
              callback(res);
            },
            function (res) {
              console.error('shareToExternalMoments :error>> ', res);
              callback(res);
            }
          );
        },
        fail: function (err) {
          console.error('wx.agentConfig :>> ', err);
        },
      });
    });
  };

  /**
  /**
   * 将数据复制到剪贴板
   * 此函数利用微信JS-SDK提供的接口，将指定的数据写入用户的剪贴板
   * 主要用于提升用户体验，简化用户的手动复制操作
   *
   * @param data 需要复制到剪贴板的数据，可以是任何字符串类型的信息
   */
  const setClipboardData = (data: string) => {
    wx.ready(() => {
      wx.setClipboardData({
        data: data,
        success: (res) => {
          console.log('wx.setClipboardData :>> ', data);
          console.log('wx.setClipboardData :>> ', res);
        },
        fail: (err) => {
          console.error('wx.setClipboardData :>> ', err);
        },
      });
    });
  };

  onMounted(() => {
    initWeCom();
  });

  return {
    previewFile,
    getLocation,
    shareWechatMessage,
    onMenuShareTimeline,
    shareToExternalMoments,
    setClipboardData,
  };
};

export default useWeCom;
