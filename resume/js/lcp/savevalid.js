
+function ($) {
 	 'use strict';
	 jQuery.savevalid=function(em,option){
	 	Ladda.bind( 'div:not(.progress-demo) .btn-save:not(.btn-edit)');
		look(this,"this");
		var $t=$(em);
		var action= $t.attr("action");
		look(action,'action');
		if(!action){
			action=window.location.href;
		}
		//
		if(!action){
			action=$t.attr("action");
		}
		
		//
		editcontrol();
		
		look(action);
		
		//
		if(!action){
			showmessage({err:"网页数据出错"});
			return;
		}
		
		
		
		/**
		 * 
		 */
		function editcontrol(){
			look("sss");
			$("input,select,textarea",$t).on("keydown change",function(){
				
				var p=$(this).closest(".has-error");
				if(p.length>0){
					$(".err",p).remove();
					p.removeClass("has-error");
				}
			});
		}
		
		
		
		/**
		 * 消息
		 */
		function showmessage(re){
			
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
			
			
			
			if($(".msg",$t).length>0){
				$(".msg",$t).html(msg).show();
				return;
			}
			$t.prepend('<div class="msg alert alert-danger">'+msg+'</div>');
			
			//
			setTimeout(function(){
				$(".msg",$t).fadeOut();
			},2000);	
		}
		
		
		//点击保存
		$t.on("click",".btn-save",function(){
			var data=Lcp.getFormJson($t);
			data.click=1;
			data.validate=1;
			data.json=1;
			look(action,"formurl");

            var btn=$(this);
            //btn.attr("disabled",true);
			look("post");
			$.post(action,data,function(re){
				look("post");
				btn.attr("disabled",false);
				look(re,"re");
				if(re.className!='success'){
					var errornew=Lcp.formValide($t,re.error);
					showmessage(re);
                    Ladda.stopAll();
					return;
				}
				//
				$t.submit();
			},'json');
		});
	};
	
	/*
	 * 绑定成插件
	 */
	$.fn.savevalid=function(option){
		return this.each(function(){
			new jQuery.savevalid(this,option);
		});
	};
	
	//开始运用
	$(function(){
		$("form[data-toggle=savevalid]").savevalid();
	});
}(jQuery);