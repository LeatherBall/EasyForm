/**
 * 常用表单规则校验
 */
export default {
  car: {
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    message: '请输入正确的车牌号'
  },
  ch: {
    pattern: /^[\u4e00-\u9fa5]{0,}$/,
    message: '只能输入中文'
  },
  email: {
    pattern: /[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`…\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/,
    message: '请输入正确的邮箱地址'
  },
  en: {
    pattern: /^[A-Za-z]+$/,
    message: '只能输入英文'
  },
  enAndNumber: {
    pattern: /^[A-Za-z0-9]+$/,
    message: '只能输入英文和数字'
  },
  enCaps: {
    pattern: /^[A-Z]+$/,
    message: '只能输入大写英文字母'
  },
  enLower: {
    pattern: /^[a-z]+$/,
    message: '只能输入小写英文字母'
  },
  idCard: {
    pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    message: '请输入正确的身份证号'
  },
  integer: {
    pattern: /^-?\d+$/,
    message: '只能输入整数'
  },
  ipv4: {
    pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    message: '请输入正确的IP-v4地址'
  },
  ipv6: {
    pattern: /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-….){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
    message: '请输入正确的IP-v6地址'
  },
  negativeInteger: {
    pattern: /^-\d+$/,
    message: '只能输入负整数'
  },
  noChar: {
    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
    message: '只能输入中文、大小写字母或数字'
  },
  number: {
    pattern: /^[0-9]*$/,
    message: '只能输入数字'
  },
  passwordStrength: {
    pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    message: '密码长度最少6位，且必须包括大小写字母、数字和字符'
  },
  phone: {
    pattern: /^1[34578]\d{9}$/,
    message: '请输入正确的手机号'
  },
  positiveInteger: {
    pattern: /^\d+$/,
    message: '只能输入正整数'
  },
  url: {
    pattern: /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
    message: '请输入有效的URL地址'
  },
  w: {
    pattern: /^\w+$/,
    message: '只能输入数字、英文字母或下划线'
  }
}