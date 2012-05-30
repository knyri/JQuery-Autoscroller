/**
 * Scrolls the elements in the containing element up and down.
 * 
 * Options:
 * 	speed: delay between movements in milliseconds. Default is 100.
 * 	increment: number of pixels to scroll the elements. Default is 1
 * 	pauseonhover: true or false. Pauses movement when the mouse is over it. Default is true
 * 	bouncepause: number of milliseconds to pause before changing directions. Default is 500
 * @author Kenneth Pierce
 */
var AutoScroller=function(id,options){
	var t=this,bounce=false;
	t.$scrollpane=$('#'+id);
	t.options={speed:100,increment:1,pauseonhover:true,bouncepause:500};
	t.position=0;
	t.dir=1;
	if(options)$.extend(t.options,options);
	t.$scrollpane=t.$scrollpane.wrapInner($('<div class="scrollpane" />'));
	t.scrollheight=$(t.$scrollpane.find('div.scrollpane').get(0)).height()-t.$scrollpane.height();
	t.scroll=function(){
		bounce=false;
		t.position+=t.options.increment*t.dir;
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
	};
	t.start=function(){
		if(t.timer==null)
			t.timer=setTimeout(t.scroll,t.options.speed);
	};
	t.stop=function(){
		clearTimeout(t.timer);
		t.timer=null;
	};
	if(t.options.pauseonhover==true){
		t.$scrollpane.hover(t.stop,t.start);
	}
};
