// ==UserScript==
// @name	PKUSolved
// @namespace	http://j.mp/nolze
// @description	Show whether you solved a particular problem on poj.org.
// @match http://poj.org/problem?id=*
// ==/UserScript==
// If your browser doesn't support @match use this:
// @include	http://poj.org/problem?id=*
(function(){
	var id = window.localStorage.getItem("id");
	if(!id){
		id = window.prompt("Enter your user ID", null);
		if(!id)return;
		window.localStorage.setItem("id", id);
	}
	var chk = function(obj){
		s = new Array();
		s.push(new Date().getTime()+24*60*60*1000);
		s = s.concat(obj.responseText.match(/p\(....\)/g));
		window.localStorage.setItem("solved", JSON.stringify(s));
	};
	s = window.localStorage.getItem("solved");
	if(!s||new Date().getTime()>s[0]){
		GM_xmlhttpRequest({method:"get", url:"http://poj.org/userstatus?user_id="+id, onload:chk});
		s = window.localStorage.getItem["solved"];
	}
	s = JSON.parse(s);
	if(s.indexOf("p("+document.title.substr(0,4)+")")!=-1){
		document.title = "[S]" + document.title;
	}
	return;
})();