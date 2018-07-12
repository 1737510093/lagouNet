function Index(){}

$.extend(Index.prototype,{
	loaderHeader:function(){
		new Header();
	}
});
new Index().loaderHeader();
