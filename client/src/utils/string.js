export function toUpperCase(str) {
    return str.toUpperCase();
}

export function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export function dateFormat(date) {
    var ngay = new Date(date);

    var ngayNum = ngay.getDate();
    var thangNum = ngay.getMonth() + 1;
    var namNum = ngay.getFullYear();
    var gio = ngay.getHours();
    var phut = ngay.getMinutes();
    var giay = ngay.getSeconds();

    var ngayDinhDang = gio + ':' + phut + ':' + giay + ' ' +
        ngayNum + '/' + thangNum + '/' + (namNum % 100);

    return ngayDinhDang;
}

export function truncate(array, maxlength) {
    if (array.length > maxlength) {
        return array.substring(0, maxlength) + ' ...'; 
    } else {
        return array; 
    }
}