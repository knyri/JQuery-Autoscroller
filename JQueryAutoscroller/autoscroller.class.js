/**
 * Scrolls the elements in the containing element up and down.
 * 
 * Options:
 * 	speed: delay between movements in milliseconds. Default is 100.
 * 	increment: number of pixels to scroll the elements. Default is 1
 * 	pauseonhover: true or false. Pauses movement when the mouse is over it. Default is true
 * 	bouncepause: number of milliseconds to pause before changing directions. Default is 500
 * 	type: bounce,infinite
 * 
 * If using type:'infinite' then all the children need to be in DIV elements.
 * @author Kenneth Pierce
 */

var AutoScroller=function(id,options){
	var t=this;
	t.$scrollpane=$('#'+id);
	t.options={speed:100,increment:1,pauseonhover:true,bouncepause:500,type:'bounce'};
	t.position=0;
	t.dir=1;
	if(options)$.extend(t.options,options);
	switch(t.options.type){
		case 'bounce':
			t.options.type=0;
			break;
		case 'infinite':
			t.options.type=1;
			break;
	}
	t.scroll=function(){
		t.position+=t.options.increment*t.dir;
		if(t.options.type==0){
			var bounce=false;
			if(t.dir==1 && t.position>t.scrollheight){
				t.position=t.scrollheight;
				t.dir=-1;
				bounce=true;
			}else if(t.dir==-1 && t.position<0){
				t.position=0;
				t.dir=1;
				bounce=true;
			}
			t.$scrollpane.scrollTop(t.position);
			if(bounce)
				t.timer=setTimeout(t.scroll,t.options.bouncepause);
			else
				t.timer=setTimeout(t.scroll,t.options.speed);
		}else if(t.options.type==1){
			if(t.position>=t.scrollheight){
				t.position=0;
				var $item=t.$scrollcontent.children('div:first-child');
				t.$scrollcontent.append($item);
				t.$scrollpane.scrollTop(t.position);
				$item=t.$scrollcontent.children('div:first-child');
				t.scrollheight=$item.outerHeight(true);
			}else
				t.$scrollpane.scrollTop(t.position);
			t.timer=setTimeout(t.scroll,t.options.speed);
		}
	};
	t.start=function(){
		if(t.timer==null)
			t.timer=setTimeout(t.scroll,t.options.speed);
	};
	t.stop=function(){
		clearTimeout(t.timer);
		t.timer=null;
	};

	t.$scrollpane=t.$scrollpane.wrapInner($('<div class="scrollpane"></div>'));
	t.$scrollcontent=t.$scrollpane.children('div:first-child');
	if(t.options.type==0)
		t.scrollheight=$(t.$scrollpane.find('div.scrollpane').get(0)).height()-t.$scrollpane.height();
	else if(t.options.type==1)
		t.scrollheight=t.$scrollcontent.find('div:first-child').outerHeight(true);
	if(t.options.pauseonhover==true){
		t.$scrollpane.hover(t.stop,t.start);
	}
};