

// 验证用户名
function validUsername(num) {

    if (num.length == 0) {
        //错误提示
        return false
    }
    return true;
}

//验证手机号
function validTel(num) {
    if (num.length != 11) {
        //错误提示
        return false
    }
    return true;
}


//验证身份证号
function validId(num) {
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i;
    if (!reg.test(num)) {
        //错误提示
        return false
    }
    return true;
}

//验证验证码
function validCode(num) {
    var reg = /^\d{6}$/;
    if (!reg.test(num)) {
        return false
    }
    return true;
}


// 验证密码
function validpass(num) {
    if (num.length>6) {
        return false
    }
    return true;
}

export {
    validUsername, validTel, validId, validCode, validpass
}