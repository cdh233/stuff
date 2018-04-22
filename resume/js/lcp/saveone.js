//$('body').append('<script language="javascript" src="/js/lib/spin.min.js"></script>');
//$('body').append('<script language="javascript" src="/js/lib/ladda.min.js"></script>');
/**
 
 
  <!--saveone-->
          <div data-toggle="saveone">
            <!--saveone 显示-->
            <div class="saveone-view" data-url="/?name=begin&handle=saveone&id={$j[id]}&json=1">
                 
            </div>
            <!--/saveone 显示-->
            <!--saveone 表单-->
            <div class="saveone-form" data-url="/?name=begin&handle=saveone&id={$j[id]}&json=1">
             
            </div>
            <!--/saveone 表单-->
          </div>
  <!--/saveone-->
  
  
  php:
  
  //
			ob_start ();
			require_once "modulenew/begin/bt_index/saveone_view.html";
			$jsonhtml = site_get_ob_content ();
 
     $s->html=$jsonhtml;
 
 
 * 保存单个信息
 */
+function ($) {
 	 'use strict';
	 jQuery.saveone=function(em,option){
         Ladda.bind( 'div:not(.progress-demo) .btn-save:not(.btn-edit)');
		//look(this,"this");
		var $t=$(em);
		var $v=$(".saveone-view",$t);
		var $f=$(".saveone-form",$t);
		
		var $exejs=$t.data("exejs"); //触发的js
		look($exejs,"exejs");
		//
		var viewurl=$v.data("url");
		var formurl=$f.data("url");
		var type=$t.data("type");
		//look(type,"type");
		//look(viewurl);
		//look(formurl);
		
		//
		if(option.show=="view"){
		  showview();
		}
		if(option.show=="form"){
	      showform();
		}
		
		//重新加载
		if(option.load==1){
		  
		  //look("load","load");
		  show_remote("form");
		  show_remote("view");
		}
		
		editcontrol();
		
		
		
		
		
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
		
		
		
		//显示view
		function showview(){
			//look("showview");
			$v.show();
			$f.hide();
		};
		//
		function showform(){
			$(".btn-cancel").click();
			$v.hide();
			$f.show();
			$($("input,textarea",$f).get(0)).focus();
		};
		
		//获得远程信息
		function show_remote(showtype){
			var url=(showtype=="form")?formurl:viewurl;
			var $o= (showtype=="form")?$f:$v;
			
			//look(url+"|"+showtype,"viewurl-showtype");
			if(!url){
				return;
			}
			url+=("&showtype="+showtype);
			$.get(url,function(re){
				$o.html(re.html);
			},'json');
		};
		
		//删除这个saveone
		function remove(){
			$t.remove();
		}
		
		
		
		/**
		 * 消息
		 */
		function showmessage(re){
			look(re.error);
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
			
			
			
			if($(".msg p",$t).length>0){
				$(".msg p",$t).html(msg).show();
				return;
			}
			$("form",$t).prepend('<div class="msg alert alert-danger alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><p>'+msg+'</p></div>');	
		}
		
		
		
		//点击编辑按钮
		$($v).on("click",".btn-save,.btn-add",function(){
			//look($(".saveone-form:visible").length,"length");
			if($(".saveone-form:visible").length>0){
			   //return;
		    };
			
			showform();
		});
		
		
		//点击编辑取消
		$($f).on("click",".btn-cancel",function(){
			showview();
		});
		
		//点击删除
		$($f).on("click",".btn-del",function(){
			
			Lcp.modal('是否删除',$('<h3>是否删除此条信息</h3>'),function(){
				var data={};
				data.click=1;
				data.status=-1;
				$.post(formurl,data,function(re){
					if(re.className!='success'){
						return;
					}
					//
					remove();
					b.hide();
				},'json');
				
			});
		});
		
		
		//点击保存
		$($f).on("click",".btn-save",function(){

			var data=Lcp.getFormJson($("form",$f));
			data.click=1;
			//look(formurl,"formurl");


			$.post(formurl,data,function(re){
				if(re.className!='success'){
					Lcp.formValide($("form",$t),re.error);
					showmessage(re);
                    Ladda.stopAll();
					return;
				}

				//
				
				if(type=="add"){
					
				  var saveone='<!--saveone-->';
				  saveone+='<div data-toggle="saveone">';
				  
				  saveone+='<!--saveone 显示-->';
			      saveone+='<div class="saveone-view" data-url="'+re.viewurl+'">加载中...</div>';
				  saveone+='<!--/saveone 显示-->';
				  
				  saveone+=' <!--saveone 表单-->';
				  saveone+='<div class="saveone-form" data-url="'+re.formurl+'">加载中...</div>';
				  saveone+=' <!--/saveone 表单-->';
				  
				  saveone+='</div>';
		 
				  //look(type,"type--");
				  //look($t.attr("class"));
				  //look($t.parent().attr("class"));
				  $(saveone).prependTo($t.parent()).saveone({show:"view",load:1});
				  show_remote("form");
				  //
				  
				}else{
				   $v.html(re.html);
				}

				//
				if($exejs!=''){
					eval($exejs);
				}
				//

				showview();
				Lcp.setDefault();
                Ladda.stopAll();
				
			},'json');
		});
	};
	
	/*
	 * 绑定成插件
	 */
	$.fn.saveone=function(option){
		return this.each(function(){
			new jQuery.saveone(this,option);
		});
	};
	
	//开始运用
	$(function(){
		
		$("div[data-toggle=saveone]").saveone({show:"view"});
		
	});
}(jQuery);