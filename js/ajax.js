//全局配置路径前缀
//var baseapi='http://192.168.56.91:9084/'
//var baseapi='http://192.168.0.155:8500/'
var baseapi='';
//页面加载所要进行的操作
ajaxStatus = true;


// ajax封装
var baseUrl=baseapi;
function ajax(url, data, success, error,cache, alone, async, type, dataType) {
	//加载动画
    layer.msg('请求加载中...', {
        icon: 16
        , shade: 0.01
    });

    var type = type || 'post';//请求类型
	var dataType = dataType || 'json';//接收数据类型 
	var async = async || true;//异步请求 
	var alone = alone || false;//独立提交（一次有效的提交） 
	var cache = cache || false;//浏览器历史缓存 
	var success = success || function (data) {
        //关闭load
        layer.closeAll('loading');

		if(data.status){

			//服务器处理成功 
			setTimeout(function () {
			 if(data.url){ 
			 		location.replace(data.url); 
			 	}else{ 
			 		location.reload(true); 
			 	} 
			},1500); 
		 }else{
			 //服务器处理失败
			 if(alone){
			 //改变ajax提交状态 
			 	ajaxStatus = true; 
			 } 
		 } 
	 }; 
	var error = error || function (data) {
		  /*console.error('请求成功失败');*/ /*data.status;//错误状态吗*/ 
		layer.closeAll('loading');
		setTimeout(function () {
            if(data.status == 401){
                window.location.href='/login.html'
            }
		   if(data.status == 404){
		   		 alert('请求失败，请求未找到');
		    }else if(data.status == 503){
               alert('请求失败，服务器内部错误');
		    }else {
               alert('请求失败,网络连接超时');
		    } 
		    ajaxStatus = true; 
		},500); 
	};
	 /*判断是否可以发送请求*/
	if(!ajaxStatus){
		return false;
	}
	//ajaxStatus = false;
	//禁用ajax请求 /*正常情况下1秒后可以再次多个异步请求，为true时只可以有一次有效请求（例如添加数据）*/
	if(!alone){
		setTimeout(function () {
			ajaxStatus = true;
		},1000);
	}
	$.ajax({
		'url':baseUrl + url, 
		'data': data,
		'type': type,
		'dataType': dataType,
		'async': async, 
		'success': success, 
		'error': error,
        crossDomain: true == !(document.all),  //ie下跨域请求解决方案
        beforeSend: function(request) {
            //获取token
            /*var token=localStorage.getItem('token') || ''
			if(token!=''){
                request.setRequestHeader("Token", token);
			}*/
        },
	}); 
}

var $ajax={
    // submitAjax(post方式提交)
     submitAjax:function(form, success,error, cache, alone) {
		cache = cache || true;
		var form = $(form);
		var url = form.attr('action');
		var data = form.serialize();
		ajax(url, data, success, cache, alone, false, 'post','json');
	},
    // ajax提交(post方式提交)
     post:function(url, data, success, error,cache, alone) {
		ajax(url, data, success, error,cache, alone, false, 'post','json');
	},
    // ajax提交(get方式提交)
     get:function(url, success, error,cache, alone) {
		ajax(url, {}, success, error,cache,alone, false, 'get','json');
	},
    // ajax提交(get方式提交带参数)
     getData:function(url,data, success, error,cache, alone) {
		ajax(url, data, success,error,cache, alone, false, 'get','json');
	},
    // jsonp跨域请求(get方式提交)
     jsonp:function(url, success, error,cache, alone) {
		ajax(url, {}, success, error,cache, alone, false, 'get','jsonp');
	}
}

/*//submitAjax调用实例
$(function () {
	$('#form-logo').submit(function () {
	submitAjax('#form-logo'); return false; }); 
});*/ 







