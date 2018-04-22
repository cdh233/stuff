


/** 
 * 保存单个信息
 */
+function ($) {
    'use strict';
    jQuery.validate=function(em,option){
	   look("valid-------");
    	var $this=$(em);
    	var rule={//验证规则
    			phone:/^1(3|5|8|4)\d{1}\d{8}$/,
    			company:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9\s-,-.]*$/,
    			uname:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]*$/,
    			zh:/^[\u4e00-\u9fa5]+$/,//纯中文
    			card:/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((((19|20)((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229)))|20000229)\d{3}(\d|X|x))|(((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}))$/, //身份证号	
    			int:/^[0-9]*$/,				
    			s:'',
    			email:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    			age:/^1[89]|[2-9]\d|99$/
    	};
    	//
    	var rules={			
    			isNonEmpty: function(value, errorMsg) {//不能为空 	
    				errorMsg=errorMsg||" ";		 
    				if (!value.length) return errorMsg;           
    			},	
    			minLength: function(value, length, errorMsg) { //大于 	
    				errorMsg=errorMsg||" ";	          
    				if (value.length < length) return errorMsg;            
    			},
    			maxLength: function(value, length, errorMsg) {//小于  
    				errorMsg=errorMsg||" ";			   
    				if (value.length > length) return errorMsg;
    			},
    			isRepeat:function(value, range, errorMsg){ //重复密码	
    				errorMsg=errorMsg||" ";		
    				if(value!==$("#"+range).val()) return errorMsg;
    			},	
    			between: function(value, range, errorMsg) {//大于小于 
    				errorMsg=errorMsg||" ";           
    				var min = parseInt(range.split('-')[0]);
    				var max = parseInt(range.split('-')[1]);			
    				if (value.length < min || value.length > max) return errorMsg;
    			},	
    			level:function(value,range,errorMsg){//密码复杂程度
    				errorMsg=errorMsg||" ";
    				var r=verifyCheck.pwdStrong(value);						
    				if(range>4) range=3;
    				if(r<range)  return errorMsg;			
    			},
    			isPhone: function(value, errorMsg) {	
    				errorMsg=errorMsg||" ";			  
    				if (!rule.phone.test(value)) return errorMsg;
    			},
    			isCompany:function(value, errorMsg) { 
    				errorMsg=errorMsg||" ";   
    				if (!rule.company.test(value)) return errorMsg;
    			},
    			isInt: function(value, errorMsg) {
    				errorMsg=errorMsg||" ";
    				if (!rule.int.test(value)) return errorMsg;
    			},
    			isUname: function(value, errorMsg) {
    				errorMsg=errorMsg||" ";
    				if (!rule.uname.test(value)) return errorMsg;
    			},
    			isZh: function(value, errorMsg) {
    				errorMsg=errorMsg||" ";				
    				if (!rule.zh.test(value)) return errorMsg;
    			},
    			isCard: function(value, errorMsg) {
    				errorMsg=errorMsg||" ";
    				if (!rule.card.test(value)) return errorMsg;
    			},
    			isChecked: function(value, errorMsg, el){
    				errorMsg=errorMsg||" ";
    				var a=$(el).find('input:checked').length,
    					b=$(el).find('.on').length;							
    				if(!a && !b) return errorMsg;
    			},
    			isEmail: function(value,errorMsg){
    				errorMsg=errorMsg||" ";
    				if (!rule.email.test(value)) return errorMsg;
    			},
    			isAge: function(value,errorMsg){
    				errorMsg=errorMsg||" ";
    				if (!rule.age.test(value)) return errorMsg;
    			}
    	};
    	
    	var errors={};
    	
    	/*
    	 * 获得最终的错误
    	 */
    	
    	/*
    	 * 检查错误
    	 */
    	function checkControl(em){
    		var $t=$(em);
    		var val=$t.val();
    		
    		//
    		if(!$t.hasClass("required")){
    			return;
    		}
    		//
    		var valid=$t.data("valid");
    		
    		var msg=this.rules[valid].apply(val,'xxxx');
    		if(msg==''){
    			return;
    		}
    		//
    		
    		this.errors[$t.attr("name")]=msg;
    	}
    	
    	/**
    	 * 遍历
    	 */
    	function eachControls(){
    		
    		$("textarea,input",$this).each(function(){
    			checkControl($(this));
    		});
    		
    		look(this.errors);
    	}
    	
    	
    	
    	//
    	function trigger(){
    		
    		
    		
    		
    		
    	}
    	
    	
    	//
    	this.trigger();
    	
    	
    };
 	  
	  
  
    /*
	 * 绑定成插件
	 */
	$.fn.validate=function(option){
		return this.each(function(){
			new jQuery.validate(this,option);
		});
	};
 	  
 	//
 	$("form[data-toggle=valid]").validate();
 	  
}(jQuery);