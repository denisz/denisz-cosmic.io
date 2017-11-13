/*!
 Copyright (C) 2010-2013 Raymond Hill: https://github.com/gorhill/Javascript-Voronoi
 MIT License: See https://github.com/gorhill/Javascript-Voronoi/LICENSE.md
 */
function Voronoi(){this.vertices=null;
	this.edges=null;this.cells=null;this.beachsectionJunkyard=[];this.circleEventJunkyard=[]
}Voronoi.prototype.reset=function(){if(!this.beachline){this.beachline=new this.RBTree()
}if(this.beachline.root){var a=this.beachline.getFirst(this.beachline.root);while(a){this.beachsectionJunkyard.push(a);
	a=a.rbNext}}this.beachline.root=null;if(!this.circleEvents){this.circleEvents=new this.RBTree()
}this.circleEvents.root=this.firstCircleEvent=null;this.vertices=[];this.edges=[];
	this.cells=[]};Voronoi.prototype.sqrt=Math.sqrt;Voronoi.prototype.abs=Math.abs;Voronoi.prototype.EPSILON=1e-9;
Voronoi.prototype.equalWithEpsilon=function(d,c){return this.abs(d-c)<1e-9};Voronoi.prototype.greaterThanWithEpsilon=function(d,c){return d-c>1e-9
};Voronoi.prototype.greaterThanOrEqualWithEpsilon=function(d,c){return c-d<1e-9};
Voronoi.prototype.lessThanWithEpsilon=function(d,c){return c-d>1e-9};Voronoi.prototype.lessThanOrEqualWithEpsilon=function(d,c){return d-c<1e-9
};Voronoi.prototype.RBTree=function(){this.root=null};Voronoi.prototype.RBTree.prototype.rbInsertSuccessor=function(e,a){var d;
	if(e){a.rbPrevious=e;a.rbNext=e.rbNext;if(e.rbNext){e.rbNext.rbPrevious=a}e.rbNext=a;
		if(e.rbRight){e=e.rbRight;while(e.rbLeft){e=e.rbLeft}e.rbLeft=a}else{e.rbRight=a}d=e
	}else{if(this.root){e=this.getFirst(this.root);a.rbPrevious=null;a.rbNext=e;e.rbPrevious=a;
		e.rbLeft=a;d=e}else{a.rbPrevious=a.rbNext=null;this.root=a;d=null}}a.rbLeft=a.rbRight=null;
	a.rbParent=d;a.rbRed=true;var c,b;e=a;while(d&&d.rbRed){c=d.rbParent;if(d===c.rbLeft){b=c.rbRight;
		if(b&&b.rbRed){d.rbRed=b.rbRed=false;c.rbRed=true;e=c}else{if(e===d.rbRight){this.rbRotateLeft(d);
			e=d;d=e.rbParent}d.rbRed=false;c.rbRed=true;this.rbRotateRight(c)}}else{b=c.rbLeft;
		if(b&&b.rbRed){d.rbRed=b.rbRed=false;c.rbRed=true;e=c}else{if(e===d.rbLeft){this.rbRotateRight(d);
			e=d;d=e.rbParent}d.rbRed=false;c.rbRed=true;this.rbRotateLeft(c)}}d=e.rbParent}this.root.rbRed=false
};Voronoi.prototype.RBTree.prototype.rbRemoveNode=function(f){if(f.rbNext){f.rbNext.rbPrevious=f.rbPrevious
}if(f.rbPrevious){f.rbPrevious.rbNext=f.rbNext}f.rbNext=f.rbPrevious=null;var e=f.rbParent,g=f.rbLeft,b=f.rbRight,d;
	if(!g){d=b}else{if(!b){d=g}else{d=this.getFirst(b)}}if(e){if(e.rbLeft===f){e.rbLeft=d
	}else{e.rbRight=d}}else{this.root=d}var a;if(g&&b){a=d.rbRed;d.rbRed=f.rbRed;d.rbLeft=g;
		g.rbParent=d;if(d!==b){e=d.rbParent;d.rbParent=f.rbParent;f=d.rbRight;e.rbLeft=f;
			d.rbRight=b;b.rbParent=d}else{d.rbParent=e;e=d;f=d.rbRight}}else{a=f.rbRed;f=d}if(f){f.rbParent=e
	}if(a){return}if(f&&f.rbRed){f.rbRed=false;return}var c;do{if(f===this.root){break
	}if(f===e.rbLeft){c=e.rbRight;if(c.rbRed){c.rbRed=false;e.rbRed=true;this.rbRotateLeft(e);
		c=e.rbRight}if((c.rbLeft&&c.rbLeft.rbRed)||(c.rbRight&&c.rbRight.rbRed)){if(!c.rbRight||!c.rbRight.rbRed){c.rbLeft.rbRed=false;
		c.rbRed=true;this.rbRotateRight(c);c=e.rbRight}c.rbRed=e.rbRed;e.rbRed=c.rbRight.rbRed=false;
		this.rbRotateLeft(e);f=this.root;break}}else{c=e.rbLeft;if(c.rbRed){c.rbRed=false;
		e.rbRed=true;this.rbRotateRight(e);c=e.rbLeft}if((c.rbLeft&&c.rbLeft.rbRed)||(c.rbRight&&c.rbRight.rbRed)){if(!c.rbLeft||!c.rbLeft.rbRed){c.rbRight.rbRed=false;
		c.rbRed=true;this.rbRotateLeft(c);c=e.rbLeft}c.rbRed=e.rbRed;e.rbRed=c.rbLeft.rbRed=false;
		this.rbRotateRight(e);f=this.root;break}}c.rbRed=true;f=e;e=e.rbParent}while(!f.rbRed);
	if(f){f.rbRed=false}};Voronoi.prototype.RBTree.prototype.rbRotateLeft=function(b){var d=b,c=b.rbRight,a=d.rbParent;
	if(a){if(a.rbLeft===d){a.rbLeft=c}else{a.rbRight=c}}else{this.root=c}c.rbParent=a;
	d.rbParent=c;d.rbRight=c.rbLeft;if(d.rbRight){d.rbRight.rbParent=d}c.rbLeft=d};Voronoi.prototype.RBTree.prototype.rbRotateRight=function(b){var d=b,c=b.rbLeft,a=d.rbParent;
	if(a){if(a.rbLeft===d){a.rbLeft=c}else{a.rbRight=c}}else{this.root=c}c.rbParent=a;
	d.rbParent=c;d.rbLeft=c.rbRight;if(d.rbLeft){d.rbLeft.rbParent=d}c.rbRight=d};Voronoi.prototype.RBTree.prototype.getFirst=function(a){while(a.rbLeft){a=a.rbLeft
}return a};Voronoi.prototype.RBTree.prototype.getLast=function(a){while(a.rbRight){a=a.rbRight
}return a};Voronoi.prototype.Diagram=function(a){this.site=a;this.halfedges=[]};Voronoi.prototype.Cell=function(a){this.site=a;
	this.halfedges=[]};Voronoi.prototype.Cell.prototype.prepare=function(){var a=this.halfedges,b=a.length,c;
	while(b--){c=a[b].edge;if(!c.vb||!c.va){a.splice(b,1)}}a.sort(function(e,d){return d.angle-e.angle
	});return a.length};Voronoi.prototype.Cell.prototype.getNeighborIds=function(){var a=[],b=this.halfedges.length,c;
	while(b--){c=this.halfedges[b].edge;if(c.lSite!=null&&c.lSite.voronoiId!=this.site.voronoiId){a.push(c.lSite.voronoiId)
	}else{if(c.rSite!=null&&c.rSite.voronoiId!=this.site.voronoiId){a.push(c.rSite.voronoiId)
	}}}return a};Voronoi.prototype.Cell.prototype.getBbox=function(){var b=this.halfedges,e=b.length,f=Number.MAX_VALUE,d=Number.MAX_VALUE,c=Number.MIN_VALUE,a=Number.MIN_VALUE;
	while(e--){v=b[e].getStartpoint();vx=v.x;vy=v.y;if(vx<f){f=vx}if(vy<d){d=vy}if(vx>c){c=vx
	}if(vy>a){a=vy}}return{x:f,y:d,width:c-f,height:a-d}};Voronoi.prototype.Cell.prototype.pointIntersection=function(a,g){var b=this.halfedges,c=b.length,f,e,d;
	while(c--){halfedge=b[c];f=halfedge.getStartpoint();e=halfedge.getEndpoint();d=(g-f.y)*(e.x-f.x)-(a-f.x)*(e.y-f.y);
		if(!d){return 0}if(d>0){return -1}}return 1};Voronoi.prototype.Vertex=function(a,b){this.x=a;
	this.y=b};Voronoi.prototype.Edge=function(b,a){this.lSite=b;this.rSite=a;this.va=this.vb=null
};Voronoi.prototype.Halfedge=function(d,e,a){this.site=e;this.edge=d;if(a){this.angle=Math.atan2(a.y-e.y,a.x-e.x)
}else{var c=d.va,b=d.vb;this.angle=d.lSite===e?Math.atan2(b.x-c.x,c.y-b.y):Math.atan2(c.x-b.x,b.y-c.y)
}};Voronoi.prototype.Halfedge.prototype.getStartpoint=function(){return this.edge.lSite===this.site?this.edge.va:this.edge.vb
};Voronoi.prototype.Halfedge.prototype.getEndpoint=function(){return this.edge.lSite===this.site?this.edge.vb:this.edge.va
};Voronoi.prototype.createVertex=function(a,c){var b=new this.Vertex(a,c);this.vertices.push(b);
	return b};Voronoi.prototype.createEdge=function(e,a,d,b){var c=new this.Edge(e,a);
	this.edges.push(c);if(d){this.setEdgeStartpoint(c,e,a,d)}if(b){this.setEdgeEndpoint(c,e,a,b)
	}this.cells[e.voronoiId].halfedges.push(new this.Halfedge(c,e,a));this.cells[a.voronoiId].halfedges.push(new this.Halfedge(c,a,e));
	return c};Voronoi.prototype.createBorderEdge=function(d,c,a){var b=new this.Edge(d,null);
	b.va=c;b.vb=a;this.edges.push(b);return b};Voronoi.prototype.setEdgeStartpoint=function(b,d,a,c){if(!b.va&&!b.vb){b.va=c;
	b.lSite=d;b.rSite=a}else{if(b.lSite===a){b.vb=c}else{b.va=c}}};Voronoi.prototype.setEdgeEndpoint=function(b,d,a,c){this.setEdgeStartpoint(b,a,d,c)
};Voronoi.prototype.Beachsection=function(){};Voronoi.prototype.createBeachsection=function(a){var b=this.beachsectionJunkyard.pop();
	if(!b){b=new this.Beachsection()}b.site=a;return b};Voronoi.prototype.leftBreakPoint=function(e,f){var a=e.site,m=a.x,l=a.y,k=l-f;
	if(!k){return m}var n=e.rbPrevious;if(!n){return -Infinity}a=n.site;var h=a.x,g=a.y,d=g-f;
	if(!d){return h}var c=h-m,j=1/k-1/d,i=c/d;if(j){return(-i+this.sqrt(i*i-2*j*(c*c/(-2*d)-g+d/2+l-k/2)))/j+m
	}return(m+h)/2};Voronoi.prototype.rightBreakPoint=function(b,c){var d=b.rbNext;if(d){return this.leftBreakPoint(d,c)
}var a=b.site;return a.y===c?a.x:Infinity};Voronoi.prototype.detachBeachsection=function(a){this.detachCircleEvent(a);
	this.beachline.rbRemoveNode(a);this.beachsectionJunkyard.push(a)};Voronoi.prototype.removeBeachsection=function(b){var a=b.circleEvent,j=a.x,h=a.ycenter,e=this.createVertex(j,h),f=b.rbPrevious,d=b.rbNext,l=[b],g=Math.abs;
	this.detachBeachsection(b);var m=f;while(m.circleEvent&&g(j-m.circleEvent.x)<1e-9&&g(h-m.circleEvent.ycenter)<1e-9){f=m.rbPrevious;
		l.unshift(m);this.detachBeachsection(m);m=f}l.unshift(m);this.detachCircleEvent(m);
	var c=d;while(c.circleEvent&&g(j-c.circleEvent.x)<1e-9&&g(h-c.circleEvent.ycenter)<1e-9){d=c.rbNext;
		l.push(c);this.detachBeachsection(c);c=d}l.push(c);this.detachCircleEvent(c);var k=l.length,i;
	for(i=1;i<k;i++){c=l[i];m=l[i-1];this.setEdgeStartpoint(c.edge,m.site,c.site,e)}m=l[0];
	c=l[k-1];c.edge=this.createEdge(m.site,c.site,undefined,e);this.attachCircleEvent(m);
	this.attachCircleEvent(c)};Voronoi.prototype.addBeachsection=function(l){var j=l.x,n=l.y;
	var p,m,w,q,o=this.beachline.root;while(o){w=this.leftBreakPoint(o,n)-j;if(w>1e-9){o=o.rbLeft
	}else{q=j-this.rightBreakPoint(o,n);if(q>1e-9){if(!o.rbRight){p=o;break}o=o.rbRight
	}else{if(w>-1e-9){p=o.rbPrevious;m=o}else{if(q>-1e-9){p=o;m=o.rbNext}else{p=m=o}}break
	}}}var e=this.createBeachsection(l);this.beachline.rbInsertSuccessor(p,e);if(!p&&!m){return
	}if(p===m){this.detachCircleEvent(p);m=this.createBeachsection(p.site);this.beachline.rbInsertSuccessor(e,m);
		e.edge=m.edge=this.createEdge(p.site,e.site);this.attachCircleEvent(p);this.attachCircleEvent(m);
		return}if(p&&!m){e.edge=this.createEdge(p.site,e.site);return}if(p!==m){this.detachCircleEvent(p);
		this.detachCircleEvent(m);var h=p.site,k=h.x,i=h.y,t=l.x-k,r=l.y-i,a=m.site,c=a.x-k,b=a.y-i,u=2*(t*b-r*c),g=t*t+r*r,f=c*c+b*b,s=this.createVertex((b*g-r*f)/u+k,(t*f-c*g)/u+i);
		this.setEdgeStartpoint(m.edge,h,a,s);e.edge=this.createEdge(h,l,undefined,s);m.edge=this.createEdge(l,a,undefined,s);
		this.attachCircleEvent(p);this.attachCircleEvent(m);return}};Voronoi.prototype.CircleEvent=function(){};
Voronoi.prototype.attachCircleEvent=function(i){var r=i.rbPrevious,o=i.rbNext;if(!r||!o){return
}var k=r.site,u=i.site,c=o.site;if(k===c){return}var t=u.x,s=u.y,n=k.x-t,l=k.y-s,f=c.x-t,e=c.y-s;
	var w=2*(n*e-l*f);if(w>=-2e-12){return}var h=n*n+l*l,g=f*f+e*e,m=(e*h-l*g)/w,j=(n*g-f*h)/w,b=j+s;
	var q=this.circleEventJunkyard.pop();if(!q){q=new this.CircleEvent()}q.arc=i;q.site=u;
	q.x=m+t;q.y=b+this.sqrt(m*m+j*j);q.ycenter=b;i.circleEvent=q;var a=null,p=this.circleEvents.root;
	while(p){if(q.y<p.y||(q.y===p.y&&q.x<=p.x)){if(p.rbLeft){p=p.rbLeft}else{a=p.rbPrevious;
		break}}else{if(p.rbRight){p=p.rbRight}else{a=p;break}}}this.circleEvents.rbInsertSuccessor(a,q);
	if(!a){this.firstCircleEvent=q}};Voronoi.prototype.detachCircleEvent=function(a){var b=a.circleEvent;
	if(b){if(!b.rbPrevious){this.firstCircleEvent=b.rbNext}this.circleEvents.rbRemoveNode(b);
		this.circleEventJunkyard.push(b);a.circleEvent=null}};Voronoi.prototype.connectEdge=function(l,a){var b=l.vb;
	if(!!b){return true}var c=l.va,p=a.xl,n=a.xr,r=a.yt,d=a.yb,o=l.lSite,e=l.rSite,i=o.x,h=o.y,k=e.x,j=e.y,g=(i+k)/2,f=(h+j)/2,m,q;
	if(j!==h){m=(i-k)/(j-h);q=f-m*g}if(m===undefined){if(g<p||g>=n){return false}if(i>k){if(!c){c=this.createVertex(g,r)
	}else{if(c.y>=d){return false}}b=this.createVertex(g,d)}else{if(!c){c=this.createVertex(g,d)
	}else{if(c.y<r){return false}}b=this.createVertex(g,r)}}else{if(m<-1||m>1){if(i>k){if(!c){c=this.createVertex((r-q)/m,r)
	}else{if(c.y>=d){return false}}b=this.createVertex((d-q)/m,d)}else{if(!c){c=this.createVertex((d-q)/m,d)
	}else{if(c.y<r){return false}}b=this.createVertex((r-q)/m,r)}}else{if(h<j){if(!c){c=this.createVertex(p,m*p+q)
	}else{if(c.x>=n){return false}}b=this.createVertex(n,m*n+q)}else{if(!c){c=this.createVertex(n,m*n+q)
	}else{if(c.x<p){return false}}b=this.createVertex(p,m*p+q)}}}l.va=c;l.vb=b;return true
};Voronoi.prototype.clipEdge=function(d,i){var b=d.va.x,l=d.va.y,h=d.vb.x,g=d.vb.y,f=0,e=1,k=h-b,j=g-l;
	var c=b-i.xl;if(k===0&&c<0){return false}var a=-c/k;if(k<0){if(a<f){return false}else{if(a<e){e=a
	}}}else{if(k>0){if(a>e){return false}else{if(a>f){f=a}}}}c=i.xr-b;if(k===0&&c<0){return false
	}a=c/k;if(k<0){if(a>e){return false}else{if(a>f){f=a}}}else{if(k>0){if(a<f){return false
	}else{if(a<e){e=a}}}}c=l-i.yt;if(j===0&&c<0){return false}a=-c/j;if(j<0){if(a<f){return false
	}else{if(a<e){e=a}}}else{if(j>0){if(a>e){return false}else{if(a>f){f=a}}}}c=i.yb-l;
	if(j===0&&c<0){return false}a=c/j;if(j<0){if(a>e){return false}else{if(a>f){f=a}}}else{if(j>0){if(a<f){return false
	}else{if(a<e){e=a}}}}if(f>0){d.va=this.createVertex(b+f*k,l+f*j)}if(e<1){d.vb=this.createVertex(b+e*k,l+e*j)
	}return true};Voronoi.prototype.clipEdges=function(e){var a=this.edges,d=a.length,c,b=Math.abs;
	while(d--){c=a[d];if(!this.connectEdge(c,e)||!this.clipEdge(c,e)||(b(c.va.x-c.vb.x)<1e-9&&b(c.va.y-c.vb.y)<1e-9)){c.va=c.vb=null;
		a.splice(d,1)}}};Voronoi.prototype.closeCells=function(a){var n=a.xl,m=a.xr,q=a.yt,e=a.yb,g=this.cells,f=g.length,b,h,r,o,p,j,l,i,d,c,k=Math.abs;
	while(f--){b=g[f];if(!b.prepare()){continue}o=b.halfedges;p=o.length;h=0;while(h<p){r=(h+1)%p;
		i=o[h].getEndpoint();l=o[r].getStartpoint();if(k(i.x-l.x)>=1e-9||k(i.y-l.y)>=1e-9){d=i;
			if(this.equalWithEpsilon(i.x,n)&&this.lessThanWithEpsilon(i.y,e)){c=this.createVertex(n,this.equalWithEpsilon(l.x,n)?l.y:e)
			}else{if(this.equalWithEpsilon(i.y,e)&&this.lessThanWithEpsilon(i.x,m)){c=this.createVertex(this.equalWithEpsilon(l.y,e)?l.x:m,e)
			}else{if(this.equalWithEpsilon(i.x,m)&&this.greaterThanWithEpsilon(i.y,q)){c=this.createVertex(m,this.equalWithEpsilon(l.x,m)?l.y:q)
			}else{if(this.equalWithEpsilon(i.y,q)&&this.greaterThanWithEpsilon(i.x,n)){c=this.createVertex(this.equalWithEpsilon(l.y,q)?l.x:n,q)
			}}}}j=this.createBorderEdge(b.site,d,c);o.splice(h+1,0,new this.Halfedge(j,b.site,null));
			p=o.length}h++}}};Voronoi.prototype.compute=function(i,j){var d=new Date();this.reset();
	var h=i.slice(0);h.sort(function(n,m){var o=m.y-n.y;if(o){return o}return m.x-n.x
	});var b=h.pop(),l=0,f=Number.MIN_VALUE,e=Number.MIN_VALUE,k=this.cells,a;for(;;){a=this.firstCircleEvent;
		if(b&&(!a||b.y<a.y||(b.y===a.y&&b.x<a.x))){if(b.x!==f||b.y!==e){k[l]=new this.Cell(b);
			b.voronoiId=l++;this.addBeachsection(b);e=b.y;f=b.x}b=h.pop()}else{if(a){this.removeBeachsection(a.arc)
		}else{break}}}this.clipEdges(j);this.closeCells(j);var c=new Date();var g=new this.Diagram();
	g.cells=this.cells;g.edges=this.edges;g.vertices=this.vertices;g.execTime=c.getTime()-d.getTime();
	this.reset();return g};
