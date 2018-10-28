import md5 from 'js-md5'

export default function signMd(data) {
  
    let temp = Object.values(data)
    let str = "";
    temp.forEach(element => {
      str += element + '&'
    });
    str = str.substring(-1)
    str = str + '123456'
    console.log(str)
    return md5(str)
}

