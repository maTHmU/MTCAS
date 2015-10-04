function ShowHide(e)
{
var o=event.srcElement;
e.style.display=(e.style.display=="none")?"":"none";
o.innerText=(e.style.display=="none")?"显示目录":"隐藏目录";
}