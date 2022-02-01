//要解码的base64
export function base64ToString(data: string) {
  /** Convert Base64 data to a string */
  var toBinaryTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
  ];
  var result = '';
  var leftbits = 0;
  var leftdata = 0;
  for (var i = 0; i < data.length; i++) {
    var c = toBinaryTable[data.charCodeAt(i) & 0x7f];
    var padding = (data.charCodeAt(i) == '='.charCodeAt(0));
    if (c == -1) continue;
    leftdata = (leftdata << 6) | c;
    leftbits += 6;
    if (leftbits >= 8) {
      leftbits -= 8;
      if (!padding)
        result += String.fromCharCode((leftdata >> leftbits) & 0xff);
      leftdata &= (1 << leftbits) - 1;
    }
  }
  return result;
}
//字符串转换为base64
export function toBase64(data: string) {
  var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var base64Pad = '=';
  var result = '';
  var length = data.length;
  var i;
  // Convert every three bytes to 4 ascii characters.                                                 

  for (i = 0; i < (length - 2); i += 3) {
    result += toBase64Table[data.charCodeAt(i) >> 2];
    result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
    result += toBase64Table[((data.charCodeAt(i + 1) & 0x0f) << 2) + (data.charCodeAt(i + 2) >> 6)];
    result += toBase64Table[data.charCodeAt(i + 2) & 0x3f];
  }

  // Convert the remaining 1 or 2 bytes, pad out to 4 characters.                                     

  if (length % 3) {
    i = length - (length % 3);
    result += toBase64Table[data.charCodeAt(i) >> 2];
    if ((length % 3) == 2) {
      result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];
      result += toBase64Table[(data.charCodeAt(i + 1) & 0x0f) << 2];
      result += base64Pad;
    } else {
      result += toBase64Table[(data.charCodeAt(i) & 0x03) << 4];
      result += base64Pad + base64Pad;
    }
  }
  return result;
}
