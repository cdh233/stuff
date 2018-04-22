

//初始加载
$(function(){

	$('[data-console="1"] .box>.row').prepend('<div class="col-md-2 text-center nt-menu-box"></div>');

	$(".nt-menu").appendTo(".nt-menu-box");
	
	$('[data-console="1"] .box>.row>.col-md-8').removeClass("col-md-8").addClass("col-md-7");
	$('[data-console="1"] .box>.row>.col-md-4').removeClass("col-md-4").addClass("col-md-3");

	$('[data-console="1"] .box').show();

    $('[data-console="1"] .box').css('background-image','none');


    //$($(".container").get(0)).prepend('<div class="alert alert-info text-center">为了提高性能，内推网 9月6日21点~9月7日9点 进行系统升级，如给你带来的不便敬请谅解~</div>');
	
	//
	Lcp.helpTip();
	//Lcp.bindTags();
	//Lcp.bindTagsSelect();
	Lcp.init();
	Lcp.setDefault();
	Lcp.userData();
	Lcp.setMonitor();
	Lcp.loading();
	Lcp.wxcode();
	Lcp.messageitem();
	Lcp.search();
	Lcp.activereferee();
	Lcp.select();
	if($('[data-toggle="tooltip"]').size()>0){
	 	$('[data-toggle="tooltip"]').tooltip();
	}

	//	
	 look( "#subnavi_"+$(".nav-sub").data("handle") );
	 
	$("#subnavi_"+$(".nav-sub").data("handle")).addClass("active");
	
	//图片
	$(".thumbnail-sm").each(function(){
		if($(this).attr("src")==''){
			$(this).attr("src","/modulenew/user/images/default.png");
		}
	});
	
	//分页选择页数
	$(".selectpage").bind("change",
	        function() {
	            var f = $(this);
	            var e = parseInt(f.val());
	            if (!isNaN(e)) {
	                window.location = (f.attr("title") + "&itemnum=" + e)
	            }
	});
});

//
function look(log,title){
	if(title){
		console.log("#"+title+"#");
	}
	console.log(log);
}



//
if (typeof Lcp == "undefined") {
	var Lcp = new Object();
}


Lcp.DARecort=function(id){
	$.get("/api.php?name=da&handle=record&id="+id);
};


//
Lcp.defaultImg=function(em){
	look($(em).data("type"),"xxx");
	if($(em).data("type")=="company"){
		em.src="/modulenew/company/images/default.png";
		return;
	}
	em.src="/modulenew/user/images/default.png";
}


//

Lcp.userData=function(){
	look("userData", $('body').data("uid"));
	//
	if($('body').data("uid")==0){
		return;
	}
	
	var uid=$('body').data("uid");
	
	
	//
	setTimeout(function(){
		getRemote();
	},500);
	
	/*
	setInterval(function(){
		getRemote();
	},50000);
	*/
	//
	function getRemote(){
		return;
		//look("sss");
		$.get("/api.php?name=user&handle=data&uid="+uid,function(re){
			
			if(re.className!='success'){
				return;
			}
			//look(re.data);
			//
			$.each(re.data,function(field,v){
				look(field+":"+v);
				look(v);
				if(v==null){
					return;
				}
				
				$("badge","[data-badge="+field+"]").remove();
				
				//
				if(v==0 || v=='0' || v==null){
				   return;
				}
				//	
				$("[data-badge="+field+"]").append('<badge>'+v+'+</badge>');
				
			}); 
		},'json');
	}
};



Lcp.setDefault=function(){
	$("*[data-default]").each(function(){
		var v=$(this).text().replace(/(^\s*)|(\s*$)/g,'');
		var noval=$(this).data("noval");
		if(!noval){
			noval='';
		}
		if(v==noval){
			$(this).html($(this).data("default"));
		}
	});
};

//监控
Lcp.setMonitor=function(){
	$("*[data-monitor]").each(function(){
		var clicktype=$(this).data('clicktype');
		var monitor=$(this).data('monitor');
		var tag= $(this).get(0).tagName ;
		if(clicktype==''){
			clicktype='click';
		}
		if(clicktype=='click'){
			$(this).click(function(){
				$.get('/api.php?name=lean&handle=monitor&monitor='+monitor);
			});
		}
	});
}



//
Lcp.init=function(){
   Lcp.modalInit();
   Lcp.popoverInit();
   Lcp.filteruiInit();
};


//
Lcp.filteruiInit=function(){
	var filteruiblock= $(".ui-filterui-block:first");
	filteruiblock.find(".key a").click(function(e){
		e.stopPropagation();
	});
	filteruiblock.find("li").click(function(){
		$(this).toggleClass("on");
	});
	filteruiblock.find(".filter-more").click(function(){
		filteruiblock.toggleClass("off");
	});
	
	//
	
	$(".ui-filterui li").each(function(){
		var $a=$(".keys a:first",this);
		
		look($a.hasClass("on"));
		if(!$a.hasClass("on")){
			$a.closest("li").addClass("on");
		}
	});
	
};






//
if (typeof b == "undefined") {
	var b = new Object();
}
//
b.hide=function(){
	$(".modal").css("display","none");
	$("body").removeClass("modal-open");
	$(".modal-backdrop").remove();
	
	look("hide");
};

b.setheight=function(height){
   look("setheight");
   $(".modal-body iframe").css("height",height+"px");
};



//

Lcp.formValide=function(f,error){
	look(f.attr("class"),"class");
	var form=$(f);
	$(".form-group",form).removeClass("has-error");
	$(".form-group .err",form).remove();
	
	var errornew=error;
	//
	
	$.each(error,function(field,msg){
		look(field+":"+msg);
		var control=$("[name="+field+"]",form);
		if(control.length!=0){
		  control.closest(".form-group").addClass("has-error");
		  control.after('<span class="help-block err">'+msg+'</span>');
		  delete errornew[field];
		}
	});
	//
	$("input,select,textarea",form.find(".has-error")).first().focus();
	
	look(errornew);
	parent.b.setheight($(document).height());
	return errornew;
	
};


Lcp.formContent=function(c,dataview){
	var content=$(c);
	$.each(dataview,function(field,value){
		look(field+":"+value);
		look("#"+field+"-v");
		look(content.attr("class"));
		content.find("#"+field+"-v").html(value);
	});
};



/**
 * 文件上传
 * Lcp.upload(function(){},{type:类型,oid:相关编号});
 */
Lcp.upload=function(callback,option){

	look(option);
	var options = $.extend({}, typeof option == 'object' && option);

	if(!option){
		alert("还没有设置上传类型");
		return;
	}
	
	if(!option.type){
		alert("还没有设置上传类型");
		return;
	}

	
    //
	
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	
	var uploadform=$("#uploadForm"+timestamp);
	if(uploadform.size()!=0){
		//look(uploadform);
		//uploadform.find("#upfile").click();
		//return;
	}
	
	
	//
	if(!window.appenduploadjs){
	  $('body').append('<script language="javascript" src="/js/lib/jquery.form.js"></script>');
	  window.appenduploadjs=1;
	}

	if(options.type=="resumeattach"){
		var uploadtype="'doc', 'docx', 'pdf', 'ppt', 'txt', 'wps'"
	}else{
        uploadtype="'jpg', 'gif', 'png', 'jpeg'"
	}
	
	// $('#uploadfile').append('<form id="uploadForm'+timestamp+'" method="post" enctype="multipart/form-data"><input name="upfile" type="file" id="upfile" /></form>');
	var formhtml=$('<div/>').html('<div class="uploadbox"><form id="uploadForm'+timestamp+'" method="post" enctype="multipart/form-data"><input name="upfile" type="file" id="upfile" /><span>点击上传</span></form><div class="grey text-center mt10">支持'+ uploadtype +'格式，文件小于10M (图片小于 2M )</div></div>');
	Lcp.modal('选择文件',formhtml);
	uploadform=$("#uploadForm"+timestamp);



	//
	//uploadform.find("#upfile").click();
	//
	uploadform.find("#upfile").change(function(){
		uploadform.submit();
	});
	//
	$(uploadform.submit(function () {   
		look("submit");
		var url="/api.php?name=file&handle=upload&type="+options.type+"&oid="+options.oid;
		look(url);
        $(".uploadbox form").hide();
        $(".uploadbox").append('<div>上传中...</div>');
		uploadform.ajaxSubmit({
            type: "post",
            url: url,
            dataType: 'json',
            success: function (re) { 
        	   if(re.className!='success'){
        		   look(re,"re");
        		   alert(re.message);
                   b.hide();
        		   return;

        	   }
        	   look(re); 
        	   //
        	   re.file.url=re.file.url+"?"+timestamp;
        	   if(typeof callback=="function"){
        		   callback(re);
        		   uploadform.remove();
        	   }
        	   b.hide();
            },
            error: function (msg) {
                alert("文件上传失败");   
                uploadform.remove();
                b.hide();
            }
        });
		 uploadform.remove();
        return false;
    }));
	//

	
};



/**
 * 
 */
Lcp.helpTip=function(){
	$("input[helptip]")
	.focus(function(){
		var helptip=$(this).parent().find(".helptip");
		if(helptip.size()==0){
			$(this).after('<div class="helptip">'+$(this).attr("helptip")+'</div>');
		}
		helptip.show();
	}).blur(function(){
		var helptip=$(this).parent().find(".helptip");
		helptip.hide();
	});
};


/**
 * 
 */
Lcp.lcpAddTags=function(divobj,inputobj,data){
	var $this = $(divobj);
	$.each(data,function(i, tag) {
		if ($this.find("#tag" + tag.id).size() != 0) {
		  return;
		}
		//如果只是添加信息
		if(tag.oid==''){
		   
		    var i=$(".tags .tag").size()+1;
		    var html='<div class="tag" id="tag'+ tag.tagid+ '" data-relaid="0">';
		    html+=('<input name="tag['+i+'][tagtype]" type="hidden" id="tag['+i+'][tagtype]" value="'+tag.tagtype+'" />');
		    html+=('<input name="tag['+i+'][tagrelatype]" type="hidden" id="tag['+i+'][tagrelatype]" value="'+tag.tagrelatype+'" />');
		    html+=('<input name="tag['+i+'][tagid]" type="hidden" id="tag['+i+'][tagid]" value="'+tag.tagid+'" />');
		    html+=('<input name="tag['+i+'][tagname]" type="hidden" id="tag['+i+'][tagname]" value="'+tag.tagname+'" />');
		    html+=(tag.tagname+'<span class="close">x</span></div>');
		    //
		    $this.append(html);
		    Lcp.bindTagsReload();
		    return;
		}
		
		//
		var url="/?name=tags&handle=add&json=1";
		$.post(url,tag,function(re){
			if(re.className!='success'){
				return;
			}
			//
			var rtag=re.tag;
			if(rtag.id==undefined){
				return;
			}
			$this.append('<div class="tag" id="tag'+ rtag.tagid+ '" data-relaid="'+rtag.id+'">'+ rtag.tagname+ ' <span class="close">x</span></div>');
			if($this.size()==0){
			  $(inputobj).val(rtag.tagname);
			}else{
			  $(inputobj).val('');
			}
			
			Lcp.bindTagsReload();
			
		},'json');
		
	});
};

/**
 * 
 */
Lcp.needLogin=function(){
	if($("#islogin").val()!=1){
		
		Lcp.modal('登录',"/?name=user&handle=login&single=1");
		return false;
	}
	return false;
};

/**
 * 显示消息
 */
Lcp.message=function(content){
	look(content);
	$(".box").first().prepend('<div class="alert alert-info alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>'+content+'</div>');
};

/**
 * 
 */
Lcp.modalInit=function(){
	//
	$(".modaltpl").hide();
	
	
	
	
	//
	$("body").on("click",".boxyit,.modalit",function(e){
	 
	
	  var tag= $(this).get(0).tagName ;
	  var title="";
	  var url="";
	  //
	  if(tag=='A'){
		 e.preventDefault(); 
		 title=$(this).attr("title");
		 if(typeof(title)=="undefined"){
	         title=$(this).text();
		 }
	     content=$(this).attr("href");  
	  }
	  //
	  if(tag=="BUTTON"){
		  title=$(this).attr("title");
		  content=$(this).attr("link");
	  }
	  
	  Lcp.modal(title,content);
	  
	});
	
	
	//如果是single的页面就会自动弹出来
	
    if($('body').data("access")=="single"){
    	look("single");
   	 //
   	 parent.b.setheight($(document).height());
   	 
   	 $('body').on('click',function(){
   		resizeSingleParent();
   	 });
   	 
   	 $(window).resize(function(){
   		resizeSingleParent();
      }); 
   	 
   	 
   	 //
   	 
   	 
    }
	
    
    //执行resize
    function resizeSingleParent(){
    	if($(".modal-body").size()==0){
         	   look($(document).height());
     	       parent.b.setheight($(document).height());
        }
    }
    
    
};

/**
 * 
 */
Lcp.modal=function(title,content,okexe,footer,option){
	look(content);
	if(content==undefined)content=$('');
	var type=typeof content;
	var body='';
	look(type);
	if(type=='string'){
		content=content+"&single=1";
		body='<iframe  src="'+content+'" frameborder="0" scrolling="no"  width="100%" height="100%">dddd</iframe>';
	}
	else if(type=='object'){
		look(content.text());
		
		body=content.prop("outerHTML");
		//alert(body);
	}
	look("modal");
	look(type);
	
	//
	
	var sm='';
	if(option==undefined){
	}
	else{
	  sm=((option.sm==1)?"modal-sm":"");
	}
	
	
	
	var str='<div class="modal">'+
  '<div class="modal-dialog '+sm+'">'+
   ' <div class="modal-content">'+
      '<div class="modal-header">'+
       ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
        '<h4 class="modal-title">'+title+'</h4>'+
      '</div>'+
      '<div class="modal-body">'+body+
      '</div>'+
    '</div><!-- /.modal-content -->'+
  '</div><!-- /.modal-dialog -->'+
 '</div><!-- /.modal -->';
	
	if($(".modal").size()!=0){
		$(".modal").remove();
	}
	$('body').append(str);
	
	if(typeof okexe=="function"){
		if(!footer){
		 footer='<div class="modal-footer">'+
       '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
       '<button type="button" class="btn btn-primary btn-ok">确定</button>'+
       '</div>'; 
	   }
	   $(".modal-body").after(footer);
	   $(".modal-footer .btn-ok").click(function(){
		   look("sss");
		   okexe();
	   });
	}
	$('.modal-header .close').click(function(){
		b.hide();
	});
	//
	$('.modal').modal({backdrop: 'static', keyboard: false,show:true});
};

/**
 * 
 */
Lcp.modalSize=function(height){
	$(".modal-body").css("height",height+"px");
};

/**
 * 
 */

Lcp.popoverInit=function(){
    //
	$(".popovertpl").hide();
	
	//
	$(".popoverit").each(function(){
		$this=$(this);
        var popoverit=$this.attr("data-popoverit");
        console.log(popoverit);
        var content=$("#"+popoverit).html();
        $("#"+popoverit).remove();
        $this.popover({html:true,content:content});
        
        $(".popover").find("textarea,input").focus();
	});
};

/**
 * 
 */
Lcp.popover=function(em,title,content){
	
	var body='';
	var type=typeof content;
	if(type=='object'){
		body=content.html();
	}else{
		body=content;
	}
	//
	var str='<div class="popover bottom">'+
   '<div class="arrow"></div>'+
    '<h3 class="popover-title">'+title+'</h3>'+
    '<div class="popover-content">'+body+
    '</div>'+
    '</div>';
	
	var $p=em.parent();
	var left=em.position().left;
	var top=em.position().top;
	var height=em.height();

	
	if($p.find(".popover").size()==0){
	   $p.append(str);
	   var width=$p.find(".popover").width()-em.width();
	   $p.find(".popover").css('left',left-(width/2)).css('top',top+(height*2));
	}
	//
	
	if($p.find(".popover").is(":hidden")){
		$p.find(".popover").show();
	}
	else{
		$p.find(".popover").hide()
	}
},

/*
 * 
 */
Lcp.getFormJson=function(form) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function () {
	if (o[this.name] !== undefined) {
	if (!o[this.name].push) {
	o[this.name] = [o[this.name]];
	}
	o[this.name].push(this.value || '');
	} else {
	o[this.name] = this.value || '';
	}
	});
	return o;
};


/*
 * jquery 插件
 */
$.fn.serializeJson=function(){ 
    var serializeObj={}; // 目标对象 
    var array=this.serializeArray(); // 转换数组格式 
    // var str=this.serialize(); 
    $(array).each(function(){ // 遍历数组的每个元素 {name : xx , value : xxx}
            if(serializeObj[this.name]){ // 判断对象中是否已经存在 name，如果存在name 
                  if($.isArray(serializeObj[this.name])){ 
                         serializeObj[this.name].push(this.value); // 追加一个值 hobby : ['音乐','体育'] 
                  }else{ 
                          // 将元素变为 数组 ，hobby : ['音乐','体育'] 
                          serializeObj[this.name]=[serializeObj[this.name],this.value]; 
                  } 
            }else{ 
                    serializeObj[this.name]=this.value; // 如果元素name不存在，添加一个属性 name:value 
            } 
    }); 
    return serializeObj; 
}; 


//函数是否存在
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}


//
function lean_pagemonitor(dompath,trigger,spid,itemfield){
    $(dompath).click(function(){
	   $.get(("/?name=lean&handle=monitor&json=1&spid="+spid+"&item="+itemfield),function(re){},'json');
	});
}; 


//跳转
function site_jump(time, url) {
    if (time == 0) {
        location.href = url;
        return
    }
    $("span#rest").text(time);
    if (--time > 0) {
        setTimeout("site_jump(" + time + ",'" + url + "')", 1000);
    } else {
        window.top.location.href = url;
    }
}




//
$(function () {
	//'use strict';
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();
    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {

    	
        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

       
        return this.each(function() {
        	
            var $this = $(this).parent(),
                defaults = {
                    delay: 300,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                options = $.extend(true, {}, defaults, options, data),
                timeout;

            $this.hover(function() {
            	;
                if(options.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $(this).addClass('open');
            }, function() {
                timeout = window.setTimeout(function() {
                    $this.removeClass('open');
                }, options.delay);
            });
        });
    };
    //
    $('*[data-hover=dropdown]').dropdownHover();
});



$(function () {
    $("[aria-label='Previous']").html('上一页');
    $("[aria-label='Next']").html('下一页');
});

Lcp.loading=function(){
	$('.btn-save:not(.btn-edit)').addClass('ladda-button');
    $('.btn-save:not(.btn-edit)').attr('data-style','slide-left');
}

Lcp.wxcode=function(){
    $('.wxbind').click(function(){
        Lcp.modal('绑定微信','/?name=user&handle=wxbind');
        $(".modal-dialog").addClass("modal-wxcode");
    });
}
Lcp.messageitem=function(){
	return;
	var messages,notices;
	$.get('/api.php?name=message&handle=lastmessage',function(data){
		
		look(data,"data");
		messages=data.messages;
		if(messages==0){
			$(".message-item").click(function(){
				location.href='/?name=message&handle=users&from=header';
			});
		}else{
			for (var i = 0; i < messages.length; i++) {
				var html='<a href="/?name=message&handle=detail&touid='+messages[i]['fromuid']+'&jid='+messages[i]['relaid']+'" target="_blank"><div class="message-item-con">'
                            +'<img src="'+messages[i]['avatar']+'" class="thumbnail-xs pull-left" onerror="javascript:Lcp.defaultImg(this)"></span>'
                            +'<div class="pull-left ml10">'
                                +'<div class="c666">'+messages[i]['realname']+'</div>'
                                +'<div class="w220 grey">'+messages[i]['content']+'</div>'
                            +'</div>'
                        +'</div></a>';
				$('.message-item .panel-body').append(html);
			}
		}
	},'json');
	$.get('/api.php?name=notice&handle=lastnotice',function(data){
		notices=data.notices;
		if(notices==0){
			$(".notice-item").click(function(){
				location.href='/?name=notice&handle=lists&from=header';
			});
		}else{
			for (var i = 0; i < notices.length; i++) {
				var html='<div class="notice-item-con">'
                            +'<div class="pull-left">'
                                +'<div class="w260">'+notices[i]['message']+'</div>'
                            +'</div>'
                        +'</div>';
				$('.notice-item .panel-body').append(html);
			}
		}
	},'json');


    $(".message-item").click(function (e) {
    	$.get('/api.php?name=message&handle=setread');
        $(".notice-item-letter").addClass('hide')
        if ($(".message-item-letter").hasClass("hide")) {
            $(".message-item-letter").removeClass('hide')
        } else {
            $(".message-item-letter").addClass('hide')
        }
        e ? e.stopPropagation() : event.cancelBubble = true;
        $(this).find('badge').hide();
    });
    $(".notice-item").click(function (e) {
    	$.get('/api.php?name=notice&handle=setread');
        $(".message-item-letter").addClass('hide')
        if ($(".notice-item-letter").hasClass("hide")) {
            $(".notice-item-letter").removeClass('hide')
        } else {
            $(".notice-item-letter").addClass('hide')
        }
        e ? e.stopPropagation() : event.cancelBubble = true;
        $(this).find('badge').hide();
    });
    $(document).click(function () {
        $(".message-item-letter").addClass('hide');
        $(".notice-item-letter").addClass('hide');
    });
}

//搜索框
Lcp.search=function(){
    $('.citylist span').click(function(){
        var city=$(this).html();
        $('.citysearch i').html(city);
        $('.cityvalue').val(city);
        event.stopPropagation();
		$('.citydown').removeClass('open');
		$('.positiondown').addClass('open');
    });
    $('.positionlist span').click(function(){
        var position=$(this).html();
        $('.positionsearch').val(position);
        var searchname=$('.search-backmain input[name="name"]').val();
        var searchhandle=$('.search-backmain input[name="handle"]').val();
        var searchcity=$('.search-backmain input[class="cityvalue"]').val();
        var searchkeyword=$('.search-backmain input[name="keyword"]').val();
        if($("#resumeSave").length==0){
            window.location.href='/?name='+searchname+'&handle='+searchhandle+'&city='+searchcity+'&keyword='+searchkeyword;
        }else{
            window.location.href='/?name='+searchname+'&handle='+searchhandle+'&interestcitys='+searchcity+'&keyword='+searchkeyword;
		}

    });
    $('.hotkeywords a').click(function(){
        var searchname=$('.search-backmain input[name="name"]').val();
        var searchhandle=$('.search-backmain input[name="handle"]').val();
        var searchcity=$('.search-backmain input[class="cityvalue"]').val();
        var searchkeyword=$(this).html();
        if($("#resumeSave").length==0){
            window.location.href='/?name='+searchname+'&handle='+searchhandle+'&city='+searchcity+'&keyword='+searchkeyword;
        }else{
            window.location.href='/?name='+searchname+'&handle='+searchhandle+'&interestcitys='+searchcity+'&keyword='+searchkeyword;
        }
	});
};
Lcp.activereferee=function(){
    if($("#activeReferee").length==0){
        return;
    }

    var myDate = new Date();
    var hidedate=localStorage.getItem('neitui_user_activereferee');
    if(myDate.getDate()==hidedate){
        $("#activeReferee").hide();
        return;
    }

    $(".exchange").click(function(){
        $("#carousel-example-generic").carousel('next');
    });

    $('.closereferee').click(function(){
        $("#activeReferee").hide();
        localStorage.setItem('neitui_user_activereferee', myDate.getDate());
    })
}


Lcp.select=function(){
    $('.selectall').on('click',function(){
        var that=this;
        $('.only').each(function(index, element) {
            $(this).prop('checked',$(that).prop('checked'))
        });
        $('.selectall').each(function(index, element) {
            $(this).prop('checked',$(that).prop('checked'))
        });
    });//全选
}


Lcp.showmessage=function(re,obj){
	look(re);
	var msg='';
	//
	if(re.error.length<=0){
		msg=re.message;
	}
	else{
		look(msg);
		
		$.each(re.error,function(i,c){
			msg+=c+"<br/>";
		});
	}
	
	look(msg);
	
	//
	if(msg==''){
		return;
	}
	
	
	
	if($(".msg",obj).length>0){
		$(".msg",obj).html(msg).show();
		return;
	}
	obj.prepend('<div class="msg alert alert-danger">'+msg+'</div>');
	
	//
	setTimeout(function(){
		$(".msg",obj).fadeOut();
	},2000);	
}