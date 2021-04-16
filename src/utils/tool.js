import XLSX from 'xlsx';
export const getObjValueArr = obj => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    let values = [];
    for (let item in obj) {
      values.push(obj[item]);
    }
    return values;
  }
};

export const downloadToExcel = (
  data,
  header,
  fileName = '下载内容',
  sheetName = 'sheet1',
  suffix = '.xlsx'
) => {
  if (Array.isArray(data) && Array.isArray(header)) {
    // let ws = XLSX.utils.aoa_to_sheet(data, {
    //   header: header,
    //   skipHeader: true
    // });
    data.unshift(header);
    let ws = XLSX.utils.aoa_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName + suffix);
  }
};

export const getCookie = name => {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
};
