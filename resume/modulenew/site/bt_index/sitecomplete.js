
$(function(){
	var access= $('body').attr('data-access');
	if(access=='single'){
		return;
	}

	var resume_basic_need= $('body').attr('data_resume_basic_need');
	var role= $('body').attr('data-role');
	if(resume_basic_need==1 && role =='candidate'){
		resume_basic();
	}

	// var wxScan=$('body').data('wxscan');
	// if(wxScan==1){
	// 	Lcp.modal('绑定微信','/?name=user&handle=wxbind');
	// }
	// console.log(wxScan);
	wx_need_scan();
});

function resume_basic(){
	$('body').append('<a href="/?name=resume&handle=interest" class="boxyit" style="display:none" data-original-title="" id="resume_basic" title="填写信息">填写信息</a>');
	$('#resume_basic').click();
	$('.modal-header').find('button').hide();
}

function wx_need_scan(){
	$('.messagesendbox #btnSend,.btn-reflush').click(function(){
		wx_scan();
	});
	var scan=$('span[data-wxscan]');
	if(scan.length!=0 && scan.data('wxscan')==1){
		wx_scan();
	}
}


function wx_scan(){
	$.get('/api.php?name=referee&handle=needwxscan',function(data){
		if(data.need!=undefined && data.need==1){
			Lcp.modal('绑定微信','/?name=user&handle=wxbind');
			$(".modal-dialog").addClass("modal-wxcode");
			$('.modal .close span').click(function(){
				$.get('/api.php?name=referee&handle=needwxscan&close=1');
			})
		}
	},'json');
}
