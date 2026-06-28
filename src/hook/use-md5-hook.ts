import CryptoJS from 'crypto-js';

export default class signMd5Utils {
  /**
   * @param url 请求的url,应该包含请求参数(url的?后面的参数)
   * @param requestParams 请求参数(POST的JSON参数)
   * @returns {string} 获取签名
   */
  static getSign(timestamp, query) {
    // 将 query 转换为 JSON 字符串
    const bodyStr = JSON.stringify(query);

    // 拼接字符串
    const input = bodyStr + timestamp;

    // 将字符串转换为 UTF-8 编码的字节数组
    const utf8Bytes = CryptoJS.enc.Utf8.parse(input);

    // 计算 MD5 哈希值
    const hashValue = CryptoJS.MD5(utf8Bytes);

    // 将 WordArray 转换为十六进制字符串
    const hexString = hashValue.toString(CryptoJS.enc.Hex);

    return hexString;
  }
}
