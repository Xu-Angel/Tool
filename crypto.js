// Node env
import crypto from 'crypto'
// PHP code: var_dump(md5(md5('123456') + '!@#@!').md5(time()))
/* 
http://nodejs.cn/api/buffer.html#buffer_buffers_and_character_encodings
Node.js 当前支持的字符编码有：

'ascii': 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。

'utf8': 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。

'utf16le': 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

'ucs2': 'utf16le' 的别名。

'base64': Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。

'latin1': 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。

'binary': 'latin1' 的别名。

'hex': 将每个字节编码成两个十六进制的字符。

现代的 Web 浏览器遵循 WHATWG 编码标准，将 'latin1' 和 'ISO-8859-1' 别名为 'win-1252'。 这意味着当执行 http.get() 之类的操作时，如果返回的字符集是 WHATWG 规范中列出的字符集之一，则服务器可能实际返回 'win-1252' 编码的数据，而使用 'latin1' 编码可能错误地解码字符。
*/
function Md5(password) {
const md5 = crypto.createHash('md5');

md5.update(str);
  // 创建哈希对象，指定'MD5'散列算法  sha1', 'md5', 'sha512' 
  const md5 = crypto.createHash('md5')
  // 往hash对象中添加摘要内容, 使用 digest 方法输出摘要内容，不使用编码格式的参数 其输出的是一个Buffer对象
  return md5.update(password).digest('hex')
}
Md5(Md5('123456') + '!@#@!') + Md5(String(new Date().getTime()))