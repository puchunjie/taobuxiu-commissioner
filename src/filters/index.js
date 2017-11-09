//空值转换
export const emptyHlod = (value, payload = '—') => {
    if (value != '') {
        return value
    } else {
        return payload
    }
}