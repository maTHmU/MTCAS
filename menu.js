if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement)
{
    HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode)
    {
        switch (where)
        {
            case 'beforeBegin':
                this.parentNode.insertBefore(parsedNode,this)
                    break;
            case 'afterBegin':
                this.insertBefore(parsedNode,this.firstChild);
                break;
            case 'beforeEnd':
                this.appendChild(parsedNode);
                break;
            case 'afterEnd':
                if (this.nextSibling) this.parentNode.insertBefore(parsedNode,this.nextSibling);
                else this.parentNode.appendChild(parsedNode);
                break;
        }
    }

    HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr)
    {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var parsedHTML = r.createContextualFragment(htmlStr);
        this.insertAdjacentElement(where,parsedHTML)
    }

    HTMLElement.prototype.insertAdjacentText = function (where,txtStr)
    {
        var parsedText = document.createTextNode(txtStr)
            this.insertAdjacentElement(where,parsedText)
    }
}
var moveDiv; 
var oldX; 
var oldY; 
function down(div,event){ 
    moveDiv = div; 
    if(getBrowserType() == "fox"){
        oldX = event.pageX;
        oldY = event.pageY;
    }else{
        oldX = event.x;
        oldY = event.y;
    }

    if(getBrowserType() == "fox"){
        document.addEventListener("mousemove",move,true);
    }else{
        div.setCapture();
    }


} 
function move(event){ 
    if(null!=moveDiv){ 
        var oldXtemp = parseInt(moveDiv.style.left); 
        var oldYtemp = parseInt(moveDiv.style.top); 

        if(getBrowserType() == "fox"){
            oldXtemp = oldXtemp + event.pageX-oldX; 
            moveDiv.style.left = oldXtemp; 
            oldX = event.pageX; 

            oldYtemp = oldYtemp + event.pageY - oldY; 
            moveDiv.style.top = oldYtemp; 
            oldY = event.pageY; 
        }else{
            oldXtemp = oldXtemp + event.x-oldX; 
            moveDiv.style.left = oldXtemp; 
            oldX = event.x; 

            oldYtemp = oldYtemp + event.y - oldY; 
            moveDiv.style.top = oldYtemp; 
            oldY = event.y; ;
        }

    }
} 

function up(divObj){ 
    if(null!=moveDiv){ 
        if(getBrowserType() == "fox"){
            document.removeEventListener("mousemove",move,true);
        }else{
            moveDiv.releaseCapture();
        }

        moveDiv = null; 
    } 
} 

function getBrowserType(){
    var browser=navigator.appName;
    var b_version=navigator.appVersion;
    var version=parseFloat(b_version);
    if ((browser=="Netscape")){
        return "fox";
    }else if(browser=="Microsoft Internet Explorer"){
        if(version>=4){
            return "ie4+";
        }else{
            return "ie4-";
        }
    }else{
        return "NSupport";
    }
}

var divNum = 0;
function add(){
    var tipStr = document.getElementById("mytip").value;
    var divHtmlArr = new Array();
    divHtmlArr.push("<div id=\"div"+divNum+"\" ");
    divHtmlArr.push("style=\"border:1px solid #BDD2ED;position:absolute;left:10px;top:10px;width:100px;height:100px;background-color:#ff0000;\" "); 
    divHtmlArr.push("onmousedown=\"down(this,event)\" ");
    divHtmlArr.push("onmousemove=\"move(event)\" onmouseup=\"up(this)\">"+tipStr+"</div> ");

    document.body.insertAdjacentHTML("afterBegin",divHtmlArr.join(''));
    divNum++;
}


/*
   <div id="div1" style="border:1px solid #BDD2ED;position:absolute;left:10px;top:10px;width:100px;height:100px;background-color:#ff0000;" onmousedown="down(this,event)" onmousemove="move(event)" onmouseup="up(this)">aaaaaaaaa</div> 
   <div id="div2" style="border:1px solid #BDD2ED;position:absolute;left:110px;top:20px;width:100px;height:100px;background-color:#23df00;" onmousedown="down(this,event)" onmousemove="move(event)" onmouseup="up(this)">bbbbb</div> 
   <div id="div3" style="border:1px solid #BDD2ED;position:absolute;left:320px;top:230px;width:100px;height:100px;background-color:#031d30;" onmousedown="down(this,event)" onmousemove="move(event)" onmouseup="up(this)">cccc</div> 
   <div id="div4" style="border:1px solid #BDD2ED;position:absolute;left:220px;top:80px;width:100px;height:100px;background-color:#0033de;" onmousedown="down(this,event)" onmousemove="move(event)" onmouseup="up(this)">dddddd</div> 
   <div id="div5" style="border:1px solid #BDD2ED;position:absolute;left:150px;top:440px;width:100px;height:100px;background-color:#87190f;" onmousedown="down(this,event)" onmousemove="move(event)" onmouseup="up(this)">eeeee</div> 
   */
