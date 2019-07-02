/*
    严禁非项目搭建人员修改此文件！！！！！！！！！！！！！
*/

function GetUrlByParamName(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var URL =  decodeURI(window.location.search);
    var r = URL.substr(1).match(reg);
    if(r!=null){
        //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
        return  decodeURI(r[2]);
    };
    return false;
};

function GetPath()
{
    var url=window.location.href;
    var urlArr=url.split('?');
    var newurl='';
    if(urlArr.length>1){
        if(urlArr[1].indexOf('pos')>=0){
            newurl=urlArr[0]+'?pos='+GetUrlByParamName('pos')
        }else{
            newurl=urlArr[0]
        }
    }else{
        newurl=urlArr[0]
    }

    return newurl;
};

function changeUrlArg(url, arg, val){
    var pattern = arg+'=([^&]*)';
    var replaceText = arg+'='+val;
    return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
}

function addUrlPara(url,name, value) {
    var currentUrl = url;
    if (/\?/g.test(currentUrl)) {
        if (/name=[-\w]{4,25}/g.test(currentUrl)) {
            currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
        } else {
            currentUrl += "&" + name + "=" + value;
        }
    } else {
        currentUrl += "?" + name + "=" + value;
    }
    return currentUrl;
}



//数组里删除某个值
var removeFromArray = function (arr, val) {
    var index = $.inArray(val, arr);
    if (index >= 0)
        arr.splice(index, 1);
    return arr;
};
//数组里删除某个对象
var removeFromArrayByObj=function(_arr, _obj,type) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i][type] == _obj[type]) {
            _arr.splice(i, 1);
        }
    }
    return _arr

};

//_arr1删除有_arr2里所有的元素
var removeFromArrayByArr=function (_arr1,_arr2,type) {
    for(var i=0;i<_arr1.length;i++){
        for(var x=0;x<_arr2.length;x++){
            if (_arr1[i][type] == _arr2[x][type]) {
                _arr1.splice(i, 1);
            }
        }
    }
    return _arr1
}

//对象数组去重
//去重
function unique(arr, type) {
    var res = [arr[0]];
    for(var i = 1; i < this.length; i++){
        if(arr[i][type] !== res[res.length - 1][type]){
            res.push(arr[i]);
        }
    }
    return res;
}

//拼接去重
function MergeArray(arr1,arr2,type){
    var _arr = new Array();
    for(var i=0;i<arr1.length;i++){
        _arr.push(arr1[i]);
    }
    for(var i=0;i<arr2.length;i++){
        var flag = true;
        for(var j=0;j<arr1.length;j++){
            if(arr2[i][type]==arr1[j][type]){
                flag=false;
                break;
            }
        }
        if(flag){
            _arr.push(arr2[i]);
        }
    }
    return _arr;
}

//当所有input失去焦点时去除收尾空格
$('input[type="text"]').blur(function () {
    $(this).val($(this).val().trim())
})
$('input[type="email"]').blur(function () {
    $(this).val($(this).val().trim())
})
$('input[type="password"]').blur(function () {
    $(this).val($(this).val().trim())
})
$('input[type="number"]').blur(function () {
    $(this).val($(this).val().trim())
})

//判断手机号
function isPoneAvailable(tel) {
    //手机或固定电话
    var mobile = /^1[0-9]{10}$/, phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
}


//验证身份证
function IdentityCodeValid(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    // if(!pass) alert(tip);
    console.log(tip)
    return pass;
}

//字符串显示某一部分，隐藏一部分
function strhidden(str,frontLen,endLen) {
    var len = str.length-frontLen-endLen;
    var xing = '';
    for (var i=0;i<len;i++) {
        xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}

//滚动条

function boxscroll(c) {
    $(c).niceScroll({
        cursorcolor: "#c7defe", //滚动条的颜色
        cursoropacitymax: 1, //滚动条的透明度，从0-1
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "8px", //滚动条的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px", //以像素为光标边界半径  圆角
        autohidemode: false, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条
        zindex: "auto" //给滚动条设置z-index值
    });
}

