
// JavaScript Document
$(function(){
	//
	resume_basic_init();
	resume_detailCanedit_init();
	resume_upload_init();
	resume_send_init();
	resume_edit_init();
	resume_footer_init();
	
	//
	checkin_init();
    resume_fontnum_init();
    resume_feedback_init();
    resume_scroll_init();
	resume_radio_init();
	
	resume_receive_init();
	
});



/**
 * 
 * @return
 */
function resume_receive_init(){
	//
	if($("#resumeReceive").length==0){
		return;
	}
	//
	$(".btn-forward").click(function(){
		var md5keys="";
		$("input.ids:checked").each(function(){
			md5keys+=(","+$(this).val());
		});
		
		if(md5keys==""){
		  alert("还没有选择简历");
		  return;
		}
		
		//
		look(md5keys);
		var url="/?name=resume&handle=forwards&md5keys="+md5keys;
		look(url);
		
		Lcp.modal('转发简历',url);
		
	});
}



/**
 * 
 * @return
 */
function checkin_init(){
	if($(".checkin").length==0){
		return;
	}
	
	$(".checkin .btn-checkin").click(function(){
		 var $this=$(this);
		 var url="/?name=referee&handle=checkin&json=1";
		 $.post(url,function(re){
			 
			 $(".checkin").addClass("checkined"); 
			 
			 //
			 Lcp.modal('欢迎回来',$('<div>'+re.message+'</div>'),function(){
				 b.hide(); 
			 },'<div class="modal-footer"><button type="button" class="btn btn-primary btn-ok">我知道了</button></div>');
		     
			
			 
		 },'json');
	});
}


/**
 * 
 * @return
 */
function resume_footer_init() {

	$('#resumeSendDetail').siblings('footer').hide()
    $('#resumeDetail').siblings('footer').hide()

}
function resume_basic_init(){
	if($("#resumeBasic").length==0){
	   return;	
	}
	
	
	$("footer").hide().removeClass("visible-xs visible-sm visible-md visible-lg");
	$(".navbar-brand").attr("href","#");



}



/**
 * 简历编辑页面
 * @return
 */
function resume_edit_init(){ 
	resume_set_complete();
	console.log('ssssssssssssssssssssssssssssssss');
	if($(".canedit").length==0){
	   return;	
	}
	
	//
	$(document).on("click","[data-toggle=onthedate]",function(){
		//
		var todate=$("input[type=text]",$(this).closest(".form-group"));
		if($(this).is(':checked')){
			todate.attr("disabled",true);
			todate.val("");
			todate.attr("placeholder",todate.attr("placeholder_off"));
		}else{
			todate.attr("disabled",false);
			todate.attr("placeholder",todate.attr("placeholder_on"));
			todate.val("");
		}
	});


	
	
}


/**
 * 操作
 */
function resume_detailCanedit_init(){
  //look("ccc");
  //look($("#resumeDetail").hasClass("canedit"));
  if(!$("#resumeDetail").hasClass("canedit")){
     return;
  }   
  var save_flag=false;
  $('form .btn-save').click(function(){
  	if(save_flag===false){
  		$.get('/api.php?name=resume&handle=us_updatetime',function(data){
  			if(data.className=='success'){
  				save_flag=data.result;
  			}
  		},'json');
  		
  	}
  });
  
  
  
  
  
}

/**
 * 
 * @return
 */
function resume_send_init(){
	if($("#resumeSend").length==0){
	     return;
	}
	

	
	//
	var i=0;
	$("input[name=type]").each(function(){
		if($(this).data("have")==0){
			$(this).attr("disabled", "disabled"); 
		}
		else{
			if(i==0){
			  $(this).attr("checked","checked");
			}
		}
		i++;
	});
	
	
	//
	$(".btn-send").click(function(){
		look("click");
		if($("input[name=type]:checked").length==0){
			alert("还没有选择简历类型");
			return;
		}
		//
		
		$("form",$("#resumeSend")).submit();
	});
	
}


/**
 * 
 * @return
 */
function resume_upload_init(){
	
	//上传附件按钮
	$('body').on('click','.btn_uploadattach',function(){

	  	var obj=$(this);
		  var uid=$(this).data("uid");
		  
		  if(!uid){
			  alert("请完善上面的基本信息先~");
			  return;
		  }
		  
		  Lcp.upload(function(re){
			  //
		      var fileurl=re.file.url;
		      var filename=re.file.filename;
		      var url="/api.php?name=resume&handle=save";

		      $.post(url,{attach_url:fileurl},function(ret){
		    	  if(ret.className!='success'){
					  alert(ret.message);
					  return;
				  }

		    	  //
		    	  var html='<a href="'+fileurl+'" target="_blank">'+filename+'</a>'
		    	  obj.parent().prev().removeAttr('disabled').attr('checked',true);
		    	  obj.parent().find('input').removeAttr('disabled').attr('checked',true);
		    	  $(".uploadfile").html(html);
                  window.location.reload();
		    	  //
		    	  
		    	  
		    	  
		      },'json');


		  },{type:'resumeattach',oid:uid});
	  });

	//附件简历删除按钮绑定事件
	$('body').on('click','.btn_delattach',function(){
		var obj=$(this);
		 var url="/api.php?name=resume&handle=save";

	      $.post(url,{attach_url:''},function(ret){

		      	if(ret.className!='success'){
				 	alert(ret.message);
                    $('.btn_delattach').html('删除附件')
				  	return;
			  	}
			  	obj.prev().html('还没有上传附件');
			  	obj.parent().find('input').attr('disabled','disabled').attr('checked',false);
              	window.location.reload();
	      },'json');		
	});
}



/**
 * 
 */
function resume_set_complete(){

	
	var $prgbar=$(".progress-bar");
	if($prgbar.length==0){
	   return; 
	}

	var $uid=$("#resumeDetail").data("uid");
	if(typeof($uid)=='undefined'){
		return;
	}
	
	
	var url="/api.php?name=resume&handle=complete&uid="+$uid;
	//
	$.get(url,function(re){
		if(re.className!='success'){
			return;
		}
		$prgbar.css("width",re.complete+"%").text(re.complete+"%");
	},'json');
	

}

/**
 * 更新工作栏信息
 * @return {[type]} [description]
 */
function candidate_header_change(){
	resume_set_complete();
	$('.realname').html($('#realname').val());
	$('.currentjob').html($('#currentjob').val());
	$('.rphoto').attr('src',$('#photo').val());
	
}

function del_old_experience(){
	$('#old_experience').remove();
	$.get('/api.php?name=resume&handle=deloldexperience');
}


function resume_fontnum_init() {
    if($(".wordCount").length==0){
        return;
    }
    $(function(){

        //先选出 textarea 和 统计字数 dom 节点
        var wordCount = $("#wordCount"),
            textArea = wordCount.find("textarea"),
            word = wordCount.find(".word");
        //调用
        statInputNum(textArea,word);

    });

	/*
	 * 剩余字数统计
	 * 注意 最大字数只需要在放数字的节点哪里直接写好即可 如：<var class="word">200</var>
	 */
    function statInputNum(textArea, numItem) {
        var max = numItem.text(),
            curLength;
        textArea[0].setAttribute("maxlength", max);
        curLength = textArea.val().length;
        numItem.text(max - curLength);
        textArea.on('input propertychange', function () {
            numItem.text(max - $(this).val().length);
        });
    }

}

function resume_feedback_init() {
    if($(".btn-feedback").length==0){
        return;
    }
    $('.btn-feedback').click(function(){
        $('.alert-feedback').show();
        hide_feedback();
    })
    function hide_feedback()
    {
        setTimeout(function(){$('.alert-feedback').hide()},3000);
    }

}

function resume_scroll_init(){
    if($("#resume-scroll").length==0){
        return;
    }

    var resume_scoroll_hight=document.getElementById("resume-scroll").offsetTop+90;
	$(window).scroll(function() {
        if(document.body.scrollTop>=resume_scoroll_hight){
            $('#resume-scroll').addClass('resumefix')
        }else if(document.body.scrollTop<resume_scoroll_hight){
            $('#resume-scroll').removeClass('resumefix')
        }
        if(document.body.scrollTop>=$('.resume-module').eq(6).offset().top){
            $('#resume-scroll li').eq(7).addClass('active').siblings().removeClass('active')
        }else if(document.body.scrollTop>=$('.resume-module').eq(5).offset().top){
            $('#resume-scroll li').eq(6).addClass('active').siblings().removeClass('active')
        }else if(document.body.scrollTop>=$('.resume-module').eq(4).offset().top){
            $('#resume-scroll li').eq(5).addClass('active').siblings().removeClass('active')
        }else if(document.body.scrollTop>=$('.resume-module').eq(3).offset().top){
            $('#resume-scroll li').eq(4).addClass('active').siblings().removeClass('active')
        }else if(document.body.scrollTop>=$('.resume-module').eq(2).offset().top){
            $('#resume-scroll li').eq(3).addClass('active').siblings().removeClass('active')
        }else if(document.body.scrollTop>=$('.resume-module').eq(1).offset().top){
            $('#resume-scroll li').eq(2).addClass('active').siblings().removeClass('active')
        }else if(document.body.scrollTop>=$('.resume-module').eq(0).offset().top){
            $('#resume-scroll li').eq(1).addClass('active').siblings().removeClass('active')
        }
    });
    $('#resume-scroll li').click(function(e) {
        $('html,body').animate({scrollTop:$('.resume-module').eq($(this).index()).offset().top},300)
        $(this).addClass('active').siblings().removeClass('active');
    });
}


function resume_radio_init() {
    if($(".radiolabel").length==0){
        return;
    }
    $('.radiolabel').click(function(){
    	$('.radiolabel').removeClass('on')
        $(this).addClass('on');
    })

}

