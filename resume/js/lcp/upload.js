
/**
 * 
 * 
 <img src="{$c[icon]}" id="src_icon" class="thumbnail-sm src_icon" />
 <input type="hidden" id="icon" name="icon" value="{$c[icon]}" class="icon"/>
<span  class="btn btn-primary btn-xs" data-toggle="upload" data-toimgsrc="src_icon" data-toimg="icon" 
data-type="companyicon" data-oid="{$c[id]}">上传图片</span>
 * 
 * 
 */

//
+function ($) {
 	 'use strict';
	 jQuery.upload=function(em,options){
		
		
		look("upload");
		var $t=$(em);
		
		var options = $.extend({}, $t.data(), typeof option == 'object' && option);
		look(options,"options");
		
		
		look($t.data("toimgsrc"));
		look($t.data("toimg"));
		
		var toimgsrc=$("."+$t.data("toimgsrc"),$t.parent().parent());
		var toimg=$("."+$t.data("toimg"),$t.parent().parent());
		
		look(toimgsrc.attr("src"),"toimgsrc");
		look(toimg.attr("id"),"toimg");
		
		//
		$t.click(function(re){
			Lcp.upload(function(re){
				var imgurl=re.file.url;
				look(imgurl);
				//look(toimgsrc.length);
				if(toimgsrc.length>0){
					var timestamp = Date.parse(new Date());
					timestamp = timestamp / 1000;
					toimgsrc.attr("src",imgurl+"?"+timestamp);
				}
				//look(toimg.length);
				if(toimg.length>0){
					toimg.val(imgurl);
				}
			},options);
		});
	};
		
	
	
	
	/*
	 * 绑定成插件
	 */
	$.fn.upload=function(option){
		return this.each(function(){
			new jQuery.upload(this,option);
		});
	};
	
	
	
	//运用
	$(function(){
		//
		if($("*[data-toggle=upload]").length>0){
		  $("*[data-toggle=upload]").upload({});
		}
	});
	
}(jQuery);





	