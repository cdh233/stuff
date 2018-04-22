



/**
 * 
 * @return
 */
Lcp.bindTagsReload=function(){
	$(".bindtags").each(function(){
		$this=$(this);
		var num=$this.attr("data-nums");
		if(num!=1){
			return;
		}
		if($this.find(".tag").size()!=0){
			$this.find("input").hide();
		}
		else{
			$this.find("input").show();
		}
		
	});
};

Lcp.bindTags=function() {
	
   //
   if($(".bindtags").size()==0){
		return;
   }
    
   $(".tags").on("click",".tag span.close",function(){
	  
	   var o=$(this).parent();
	   var id=o.attr("data-relaid");
	   if(id=='0'){
		   o.remove();
		   Lcp.bindTagsReload();
		   return;
	   }
	   
	   //
	   var url="/?name=tags&handle=delrela&id="+id+"&json=1";
	   $.post(url,function(re){
		   if(re.className!='success'){
		     return;
		   }
		   //
		   o.remove();
		   Lcp.bindTagsReload();
	   },'json');
   });	
   
	
   $('body').append('<link rel="stylesheet" href="/js/lib/jquery.ui.css">');
   //	
   $(".bindtags").each(function(){
	   
	   $(this).find("input[type=text]").focus(function(){
	     $(".selectdiv").hide();
	   });
	   
	   var tagstype=$(this).attr("data-tagstype");
	   var tagsrelatype=$(this).attr("data-tagsrelatype");
	   var nums=$(this).attr("data-nums");
	   var oid=$(this).attr("data-oid");
	  
	   var tagsobj=$(this).find(".tags");
	   
	  
	   /*
	    * 显示自动匹配
	    */
	   $(this).find("input[type=text]")
	   .autocomplete( {
			minLength : 2,
			delay : 500,
			source : function(request, response) {
		       console.log("--");
			   console.log(tagstype);
				$.get("/?name=tags&handle=lists&json=1&keyword="+request.term+"&type="+tagstype+"&relatype="+tagsrelatype, function(data) {
					console.log(data);
					response($.map(data, function(item, index) {
						return {
							id : item.id,
							follow : item.follow,
							tagname : item.tagname
						};
					}));
				}, 'json');
			},
			focus : function(event, ui) {
				// $(this).find( "in" ).val( ui.item.label );
			return false;
		    },
		    select : function(event, ui) {
			$(this).val('');
			
			if(nums==1){
			  $(this).hide();
			}
			
			Lcp.lcpAddTags(tagsobj,$(this), [ {
				id : ui.item.id,
				tagtype : tagstype,
				tagrelatype : tagsrelatype,
				tagid:ui.item.id,
				oid:oid,
				tagname : ui.item.tagname
			} ]);

			  return false;
		    }
		   }).autocomplete("instance")._renderItem = function(ul, item) {
			return $("<li>----").append(
					"<a>" + item.tagname + "</a>")
					.appendTo(ul);
		   };
		   
		   
		   /*
		    * 显示box
		    */
		   
		   $(this).on("click",".selectdiv .tag",function(){
			   console.log("sdfsf");
			   var o=$(this);
			   Lcp.lcpAddTags(tagsobj,$(this), [ {
					id : o.attr("data-tagid"),
					tagtype : tagstype,
					tagrelatype : tagsrelatype,
					tagid:o.attr("data-tagid"),
					oid:oid,
					tagname : o.text()
				} ]);
			});
		   
		   
		   //
		   var selectdiv=$(this).find(".tagsselect");
		   if(selectdiv.size()!=0){
		   selectdiv.append('<span class="arrow">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
		   selectdiv.find("span.arrow").click(function(){
				console.log(444);
				var selectbox=selectdiv.find(".selectdiv");
				if(selectbox.size()!=0){
				    console.log(selectbox.is(":hidden"));
					if(selectbox.is(":hidden")){
						selectbox.show();
					}else{
						selectbox.hide();
					}
					return;
				}
				//
				var url="/?name=tags&handle=gets&type="+tagstype+"&json=1";
				$.get(url,function(re){
					selectbox=selectdiv.append('<div class="selectdiv">'+re.taghtml+'</selectdiv>');
				},'json');
			});
		   }
		   //
		   $(document).bind('click', function(e){
	            var target = $(e.target);
	            if(target.closest('.bindtags').length == 0){
	                $(".selectdiv").hide();
	            }
	        })
		   
		   
   });
};

//
Lcp.bindTagsSelect=function(){
	
	$(".selectdiv").on("click",".tag",function(){
		tagsobj.lcpAddTags( [ {
			id : ui.item.id,
			tagtype : tagstype,
			tagrelatype : tagsrelatype,
			tagid:ui.item.id,
			oid:oid,
			tagname : ui.item.tagname
		} ]);
	});
	
	$(".bindtags").each(function(){
		   var tagstype=$(this).attr("data-tagstype");
		   var tagsrelatype=$(this).attr("data-tagsrelatype");
		   var oid=$(this).attr("data-oid");
	});
	
	Lcp.bindTagsReload();
};




/** 
 * 自动提示
 */
+function ($) {
    'use strict';
    jQuery.lcpAutocomplete=function(em,option){
    	var $this=$(em);
    	var type=$this.data("type");
    	
    	if($this.data("isautocomplete")==1){
    		return;
    	}
    	
    	look("bind");
    	//
    	$this.autocomplete( 
    	{
		 			minLength : 2,
		 			autoFocus: true,
		 			delay : 500,
		 			source : function(request, response) {
		 		      $.get("/api.php?name=tag&handle=lists&keyword="+request.term+"&type="+type, function(data) {
		 					response($.map(data.tags, function(item, index) {
		 						return {
		 							id : item.id,
		 							tagname : item.tagname
		 						};
		 					}));
		 				}, 'json');
		 			},
		 			focus : function(event, ui) {
		 				// $(this).find( "in" ).val( ui.item.label );
		 				
		 				look('focus');
		 				look(ui);
		 			    return false;
		 		    },
		 		    select : function(event, ui) {
			 			
			 			//
			 			$this.val(ui.item.tagname);
			 			return false;
		 		    }
 		   }).autocomplete("instance")._renderItem = function(ul, item) {
	 				return $("<li>").append('<div>'+item.tagname+'</div>').appendTo(ul)
 		   };
 		   
 		   //
 		   $this.data("isautocomplete",1);
    };
    /*
	 * 绑定成插件
	 */
	$.fn.lcpAutocomplete=function(option){
		return this.each(function(){
			new jQuery.lcpAutocomplete(this,option);
		});
	};
 	  
 	//
 	$('body').on("click","input[data-toggle=autocomplete]",function(){
 		$(this).lcpAutocomplete();
 	});
 	  
}(jQuery);






