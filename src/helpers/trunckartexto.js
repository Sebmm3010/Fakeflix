export const trunckarTexto = (text='', num) => {
    if(text.length > num){
        return text.slice(0, num)+'...';
    }
    return text;
}