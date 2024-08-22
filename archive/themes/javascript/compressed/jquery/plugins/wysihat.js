/*  WysiHat - WYSIWYG JavaScript framework, version 0.2.1
 *  (c) 2008-2010 Joshua Peek
 *  JQ-WysiHat - jQuery port of WysiHat to run on jQuery
 *  (c) 2010 Scott Williams & Aaron Gustafson
 *  EL-WysiHat - Extensive rewrite of JQ-WysiHat for ExpressionEngine
 *  (c) 2012 EllisLab, Inc.
 *
 *  WysiHat is freely distributable under the terms of an MIT-style license.
 *--------------------------------------------------------------------------*/

(function(j,f,m){var g=window.WysiHat={name:"WysiHat",addButton:function(a,b){this._buttons[a]=b},attach:function(a,b){return new g.Editor(f(a),b)},inherit:function(a,b){function c(){var b;this.parent={};for(b in a)a.hasOwnProperty(b)&&(this.parent[b]=f.proxy(a[b],this))}var h,e;c.prototype=a;e=new c;for(h in b)e[h]=b[h];return e},_buttons:[]};g.Editor=function(a,b){this.$field=a.hide();this.$editor=this.create();a.before(this.$editor);this.createWrapper();this.Element=g.Element;this.Commands=g.Commands;
this.Formatting=g.Formatting;this.init(b)};g.Editor.prototype={_emptyChar:String.fromCharCode(8203),_empty:function(){return"<p>"+this._emptyChar+"</p>"},create:function(){return f("<div/>",{"class":g.name+"-editor",data:{wysihat:this,field:this.$field},role:"application",contentEditable:"true",height:this.$field.height(),dir:this.$field.attr("dir"),html:g.Formatting.getBrowserMarkupFrom(this.$field)})},createWrapper:function(){var a=this;this.$field.add(this.$editor).wrapAll(f("<div/>",{"class":g.name+
"-container",mouseup:function(){a.$field.is(":visible")?a.$editor.height(a.$field.outerHeight()):a.$editor.is(":visible")&&a.$field.height(a.$editor.outerHeight())}}))},init:function(a){var b=this.$editor,c=this;this.Undo=new g.Undo;this.Selection=new g.Selection(b);this.Event=new g.Event(this);this.Toolbar=new g.Toolbar(b,a.buttons);this.$field.change(f.proxy(this,"updateEditor"));b.closest("form").submit(function(){c.$field.is(":visible")||c.updateField()})},updateField:function(){this.$field.val(g.Formatting.getApplicationMarkupFrom(this.$editor))},
updateEditor:function(){this.$editor.html(g.Formatting.getBrowserMarkupFrom(this.$field));this.selectEmptyParagraph()},selectEmptyParagraph:function(){var a=this.$editor,b=a.html(),c=window.getSelection();if(""==b||"<br>"==b||"<br/>"==b||"<p></p>"==b||"<p>\x00</p>"==b)a.html(this._empty()),b=j.createRange(),c.removeAllRanges(),b.selectNodeContents(a.find("p").get(0)),f.browser.mozilla&&a.find("p").eq(0).html(""),c.addRange(b)}};g.Editor.constructor=g.Editor;g.Element=function(){function a(a){for(var b=
arguments.length,c=!1;!1==c&&1<b--;)c=a.is(arguments[b].join(","));return c}var b=["blockquote","details","fieldset","figure","td"],c="article,aside,header,footer,nav,section".split(","),h="blockquote,details,dl,ol,table,ul".split(","),e="dd,dt,li,summary,td,th".split(","),d="address,caption,dd,div,dt,figcaption,figure,h1,h2,h3,h4,h5,h6,hgroup,hr,p,pre,summary,small".split(","),f="audio,canvas,embed,iframe,img,object,param,source,track,video".split(","),g="a,abbr,b,br,cite,code,del,dfn,em,i,ins,kbd,mark,span,q,samp,s,strong,sub,sup,time,u,var,wbr".split(","),
j="b,code,del,em,i,ins,kbd,span,s,strong,u,font".split(","),m="address,blockquote,div,dd,dt,h1,h2,h3,h4,h5,h6,p,pre".split(","),l="button,datalist,fieldset,form,input,keygen,label,legend,optgroup,option,output,select,textarea".split(",");return{isRoot:function(c){return a(c,b)},isSection:function(b){return a(b,c)},isContainer:function(b){return a(b,h)},isSubContainer:function(b){return a(b,e)},isBlock:function(f){return a(f,b,c,h,e,d)},isHTML4Block:function(b){return a(b,m)},isContentElement:function(b){return a(b,
e,d)},isMediaElement:function(b){return a(b,f)},isPhraseElement:function(b){return a(b,g)},isFormatter:function(b){return a(b,j)},isFormComponent:function(b){return a(b,l)},getRoots:function(){return b},getSections:function(){return c},getContainers:function(){return h},getSubContainers:function(){return e},getBlocks:function(){return b.concat(c,h,e,d)},getHTML4Blocks:function(){return m},getContentElements:function(){return e.concat(d)},getMediaElements:function(){return f},getPhraseElements:function(){return g},
getFormatters:function(){return j},getFormComponents:function(){return l}}}();f(j).ready(function(){var a=f(j),b,c;if("onselectionchange"in j&&"selection"in j)a.on("selectionchange",function(){var a=j.selection.createRange().parentElement();f(a).trigger("WysiHat-selection:change")});else c=function(){var a=j.activeElement,c=a.tagName.toLowerCase();if("textarea"==c||"input"==c)b=null;else{a=window.getSelection();if(1>a.rangeCount||(a=a.getRangeAt(0))&&a.equalRange(b))return;b=a;for(a=a.commonAncestorContainer;a.nodeType==
Node.TEXT_NODE;)a=a.parentNode}f(a).trigger("WysiHat-selection:change")},a.mouseup(c),a.keyup(c)});g.Paster=function(){var a=f('<div id="paster" contentEditable="true"/>').css({width:"100%",height:10,position:"absolute",left:-9999});return{getHandler:function(b){return function(c,h){var e=b.Commands.getRanges(),d=e[0].startContainer,i=0;a.html("").css("top",f(j).scrollTop());a.appendTo(j.body);a.focus();setTimeout(function p(){if(!a.html()&&(i+=50,200>i)){setTimeout(p,50);return}var c=f(d).closest(g.Element.getBlocks().join(","));
c.length?b.Formatting.cleanupPaste(a,c.get(0).tagName):b.Formatting.cleanupPaste(a);b.$editor.focus();b.Commands.restoreRanges(e);e[0].deleteContents?e[0].deleteContents():b.Commands.insertHTML("");html=b.$editor.html();(""==html||"\x00"==html||"<br>"==html||"<br/>"==html||"<p></p>"==html||"<p><br></p>"==html||"<p>\x00</p>"==html||html==b._empty())&&b.selectEmptyParagraph();b.Commands.insertHTML(a.html());c=b.Selection.get();b.updateField();b.updateEditor();b.Selection.set(c);a=a.remove();h()},50);
return!1}}}}();var n,o;n=function(){for(var a={3:"enter",8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down",46:"delete",91:"mod",92:"mod",93:"mod",59:";",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"up",63233:"down",63234:"left",63235:"right",63272:"delete"},b=0;10>b;b++)a[b+48]=""+b;for(b=65;90>=b;b++)a[b]=String.fromCharCode(b);return a}();o=function(){var a=/AppleWebKit/.test(navigator.userAgent)&&
/Mobile\/\w+/.test(navigator.userAgent)||/Mac/.test(navigator.platform)?"cmd":"ctrl";return{cut:a+"-x",copy:a+"-c",paste:a+"-v",undo:a+"-z",redo:a+"-shift-z",bold:a+"-b",italics:a+"-i",underline:a+"-u"}}();g.Event=function(a){this.Editor=a;this.$editor=a.$editor;this.eventHandlers=[];this.pasteStart=this.textStart=null;this.textDeleting=!1;this.Undo=a.Undo;this.Selection=a.Selection;this._hijack_events();this.add("paste",g.Paster.getHandler(a))};g.Event.prototype={add:function(a,b){this.eventHandlers[a]=
b},has:function(a){return a in this.eventHandlers},run:function(a,b,c){!1!==this.eventHandlers[a](b,c)&&c()},fire:function(a){var b=this,c,h;this._saveTextState(a);if("undo"==a||"redo"==a){if(this.Undo["undo"==a?"hasUndo":"hasRedo"]())h=this.Undo[a](this.$editor.html()),this.$editor.html(h[0]),this.Selection.set(h[1])}else{if(!this.has(a))return!0;c=this.getState();h=function(){if(!this.hasRun)this.hasRun=!0,b.textChange(c),b._saveTextState(a),b.$editor.focus()};this.run(a,c,f.proxy(h,h))}},textChange:function(a,
b){b=b||this.getState();this.Editor.selectEmptyParagraph();this.Undo.push(a.html,b.html,a.selection,b.selection)},isKeyCombo:function(a,b){var c="",h="",h=-1<a.indexOf("-");if(b.altGraphKey)return!1;b.metaKey&&(c+="cmd-");b.altKey&&(c+="alt-");b.ctrlKey&&(c+="ctrl-");b.shiftKey&&(c+="shift-");if(!h&&1<a.length)return c.replace(/-$/,"")==a;h=n[b.keyCode];return!h?!1:a.toLowerCase()==(c+h).toLowerCase()},isEvent:function(a,b){var c=b.type;if(c==a)return!0;if("key"!=c.substr(0,3))return!1;c=o[a];return!c?
!1:this.isKeyCombo(c,b)},getState:function(){return{html:this.$editor.html(),selection:this.Selection.get()}},_saveTextState:function(a){if("redo"!=a&&this.textStart)this.textChange(this.textStart),this.textStart=null},_hijack_events:function(){this.$editor.on({"selectionchange focusin mousedown":f.proxy(this._rangeEvent,this),"keydown keyup keypress":f.proxy(this._keyEvent,this),"cut undo redo paste input contextmenu":f.proxy(this._menuEvent,this)})},_keyComboEvent:function(a){var b=["undo","redo",
"paste"],c;if("keydown"==a.type)for(;c=b.shift();)if(this.isEvent(c,a)){if("paste"==c){this.fire(c);break}a.preventDefault();this.fire(c);return!1}return!0},_keyEvent:function(a){if("keypress"==a.type)return!0;if(a.ctrlKey||a.altKey||a.metaKey)return this._keyComboEvent(a);if("keydown"==a.type){if("backspace"==n[a.keyCode]){if(!1==this.textDeleting)this.textDeleting=!0,this._saveTextState("backspace")}else if(!0==this.textDeleting)this.textDeleting=!1,this._saveTextState("keypress");if(null==this.textStart)this.textStart=
this.getState()}else if("keyup"==a.type)switch(n[a.keyCode]){case "up":case "down":case "left":case "right":this._saveTextState("keyup")}},_rangeEvent:function(a){this._saveTextState(a.type)},_menuEvent:function(a){for(var b=["undo","redo","paste"],c;c=b.shift();)this.isEvent(c,a)&&("paste"!=c&&a.preventDefault(),this.fire(c))}};g.Event.constructor=g.Event;g.Undo=function(){this.max_depth=75;this.saved=[];this.index=0};g.Undo.prototype={push:function(a,b,c,h){var e=[],d=this;if(e=f.isArray(a)?f.map(a,
function(a,c){return d._diff(a,b[c])}):this._diff(a,b)){if(this.index<this.saved.length)this.saved=this.saved.slice(0,this.index),this.index=this.saved.length;if(this.saved.length>this.max_depth)this.saved=this.saved.slice(this.saved.length-this.max_depth),this.index=this.saved.length;this.index++;this.saved.push({changes:e,selection:[c,h]})}},undo:function(a){this.index--;for(var b=this.saved[this.index],c=b.changes,h=c.length,e=0;e<h;e++)change=c[e],a=a.substring(0,change[0])+change[1]+a.substring(change[0]+
change[2].length);return[a,b.selection[0]]},redo:function(a){for(var b=this.saved[this.index],c=b.changes,h=c.length-1;0<=h;h--)change=c[h],a=a.substring(0,change[0])+change[2]+a.substring(change[0]+change[1].length);this.index++;return[a,b.selection[1]]},hasUndo:function(){return 0!=this.index},hasRedo:function(){return this.index!=this.saved.length},_diff:function(a,b){var c=a.length,h=b.length,e=0,d=0;if(a==b)return null;for(;e<c&&e<h&&!(a[e]!=b[e]);)e++;for(;d<c&&d<h&&!(a[c-d-1]!=b[h-d-1]);)d++;
e==Math.min(c,h)&&(e=0);d==Math.min(c,h)&&(d=0);if(e||d)a=a.substring(e,c-d+1),b=b.substring(e,h-d+1),c=a.length,h=b.length;return c!==h&&(d=c<h?b.indexOf(a):a.indexOf(b),-1<d)?c<h?[[e,"",b.substr(0,d)],[e+c,"",b.substr(d+c)]]:[[e,a.substr(0,d),""],[e+d+h,a.substr(d+h),""]]:[[e,a,b]]}};g.Undo.constructor=g.Undo;g.Selection=function(a){this.$editor=a;this.top=this.$editor.get(0)};g.Selection.prototype={_replace:RegExp("[\r\n]","g"),get:function(a){var b=window.getSelection(),c=j.createRange();if(a===
m){if(!b.rangeCount)return[0,0];a=b.getRangeAt(0)}b=a.toString().replace(this._replace,"").length;c.setStart(this.top,0);c.setEnd(a.startContainer,a.startOffset);a=c.toString().replace(this._replace,"").length;return[a,a+b]},set:function(a,b){f.isArray(a)&&(b=a[1],a=a[0]);var c=window.getSelection(),h=j.createRange(),e;e=this._getOffsetNode(this.top,a,!0);h.setStart.apply(h,e);b===m||b==a?h.collapse(!0):(e=this._getOffsetNode(this.top,b,!1),h.setEnd.apply(h,e));c.removeAllRanges();c.addRange(h)},
toString:function(a){var b=window.getSelection();a===m&&(a=b.getRangeAt(0));return a.toString()},_getOffsetNode:function(a,b,c){function h(a){if(a.nodeType==Node.TEXT_NODE||a.nodeType==Node.CDATA_SECTION_NODE)0<b&&(e=a,b-=a.nodeValue.replace(/\n/g,"").length);else for(var c=0,d=a.childNodes.length;0<b&&c<d;++c)h(a.childNodes[c])}var e=a,d=0,d=this.$editor.get(0).lastChild,i=g.Element.getBlocks();h(a);if(0==b){if(e.nodeType!=Node.TEXT_NODE){for(;null!==e.firstChild;)e=e.firstChild;return[e,0]}if(c){for(a=
0;null===e.nextSibling&&e.parentNode!==d;)a++,e=e.parentNode;if(-1<f.inArray(e.nodeName.toLowerCase(),i)&&null!==e.nextSibling)e=e.nextSibling;for(;a&&e.firstChild&&"br"!=e.firstChild.nodeName.toLowerCase();)a--,e=e.firstChild}}d=e.nodeValue?e.nodeValue.length:0;return[e,d+b]}};g.Selection.constructor=g.Selection;g.Commands=function(){var a={is:{},make:{}},b={bold:"bold",italic:"italic",underline:"underline",strikethrough:"strikethrough",orderedList:"insertOrderedList",unorderedList:"insertUnorderedList"};
f.each("bold,underline,italic,strikethrough,fontname,fontsize,forecolor,createLink,insertImage,insertOrderedList,insertUnorderedList".split(","),function(b,h){a.make[h]=function(b){a.execCommand(h,!1,b)}});f.each({bold:"b, strong",italic:"i, em",link:"a[href]",underline:"u, ins",indented:"blockquote",strikethrough:"s, del",orderedList:"ol",unorderedList:"ul"},function(c,h){a.is[c]=c in b?function(){return a.selectionIsWithin(h)||j.queryCommandState(b[c])}:function(){return a.selectionIsWithin(h)}});
f.each({linked:"link",underlined:"underline",struckthrough:"strikethrough",ol:"orderedList",ul:"unorderedList"},function(b,h){a.is[b]=function(){return a.is[h]()}});f.each({italicize:"italic",font:"fontname",color:"forecolor",link:"createLink",ol:"insertOrderedList",ul:"insertUnorderedList",orderedList:"insertOrderedList",unorderedList:"insertUnorderedList",align:"alignment"},function(b,h){a.make[b]=f.proxy(a.make,h)});a.noSpans=function(){try{return j.execCommand("styleWithCSS",0,!1),function(){j.execCommand("styleWithCSS",
0,!1)}}catch(a){try{return j.execCommand("useCSS",0,!0),function(){j.execCommand("useCSS",0,!0)}}catch(b){try{return j.execCommand("styleWithCSS",!1,!1),function(){j.execCommand("styleWithCSS",!1,!1)}}catch(e){return f.noop}}}}();return a}();f.extend(g.Commands,{_blockElements:g.Element.getContentElements().join(",").replace(",div,",",div:not(."+g.name+"-editor),"),styleSelectors:{fontname:"fontFamily",fontsize:"fontSize",forecolor:"color",hilitecolor:"backgroundColor",backcolor:"backgroundColor"},
validCommands:"backColor,bold,createLink,fontName,fontSize,foreColor,hiliteColor,italic,removeFormat,strikethrough,subscript,superscript,underline,unlink,delete,formatBlock,forwardDelete,indent,insertHorizontalRule,insertHTML,insertImage,insertLineBreak,insertOrderedList,insertParagraph,insertText,insertUnorderedList,justifyCenter,justifyFull,justifyLeft,justifyRight,outdent,copy,cut,paste,selectAll,styleWithCSS,useCSS".split(","),execCommand:function(a,b,c){this.noSpans();try{j.execCommand(a,b,c)}catch(h){return null}},
isMakeCommand:function(a){return a in this.make},isValidExecCommand:function(a){return-1<f.inArray(a,this.validCommands)},queryCommandState:function(a){if(a in this.is)return this.is[a]();try{return j.queryCommandState(a)}catch(b){return null}},selectionIsWithin:function(a){var b=g.Element.getPhraseElements(),c=!1,h=a.split(","),e=h.length,d=window.getSelection(),i=d.anchorNode,d=d.focusNode;if(i&&i.nodeType&&3==i.nodeType&&""==i.nodeValue)i=i.nextSibling;if(!i)return!1;if(f.browser.mozilla){for(;e--;)if(-1!=
f.inArray(h[e],b)){c=!0;break}if(c&&1==i.nodeType&&-1==f.inArray(i.nodeName.toLowerCase(),b)&&(e=i.firstChild)){if(""==e.nodeValue)e=e.nextSibling;1==e.nodeType&&(i=e)}}for(;i&&d&&1!=i.nodeType&&1!=d.nodeType;){if(1!=i.nodeType)i=i.parentNode;if(1!=d.nodeType)d=d.parentNode}return!(!f(i).closest(a).length&&!f(d).closest(a).length)},getSelectedStyles:function(){var a=window.getSelection(),a=f(a.getNode()),b={},c;for(c in this.styleSelectors)b[c]=a.css(this.styleSelectors[c]);return b},replaceElement:function(a,
b){if(!a.hasClass(g.name+"-editor")){for(var c=a.get(0),d=f("<"+b+"/>").html(c.innerHTML),c=c.attributes,e=c.length||0;e--;)d.attr(c[e].name,c[e].value);a.replaceWith(d);return d}},deleteElement:function(a){a=f(a);a.replaceWith(a.html())},stripFormattingElements:function(){function a(c,e){var g=f(e);g.children().each(a);d(g)&&b.deleteElement(g)}for(var b=this,c=window.getSelection(),d=g.Element.isFormatter,e=c.rangeCount,k=[],i;e--;)i=c.getRangeAt(e),k.push(i),this.getRangeElements(i,this._blockElements).each(a);
this.restoreRanges(k)},manipulateSelection:function(){for(var a=window.getSelection(),b=a.rangeCount,c=[],d=arguments,e=d[0],f;b--;)f=a.getRangeAt(b),c.push(f),d[0]=f,e.apply(this,d);this.restoreRanges(c)},getRangeElements:function(a,b){var c=f(a.startContainer).closest(b),d=f(a.endContainer).closest(b),e=f("nullset");c.parents(".WysiHat-editor").length&&d.parents(".WysiHat-editor").length&&(e=c,c.filter(d).length||(e=c.nextAll().filter(d).length?c.nextUntil(d).andSelf().add(d):c.prevUntil(d).andSelf().add(d)));
return e},getRanges:function(){for(var a=window.getSelection(),b=a.rangeCount,c=[],d;b--;)d=a.getRangeAt(b),c.push(d);return c},restoreRanges:function(a){var b=window.getSelection(),c=a.length;for(b.removeAllRanges();c--;)b.addRange(a[c])},changeContentBlock:function(a){for(var b=window.getSelection(),c=this,d=f(c),e=b.rangeCount,g=[],i;e--;)i=b.getRangeAt(e),g.push(i),this.getRangeElements(i,this._blockElements).each(function(){c.replaceElement(f(this),a)}).data("WysiHat-replaced",!0);d.children(a).removeData("WysiHat-replaced");
this.restoreRanges(g)},unformatContentBlock:function(){this.changeContentBlock("p")},unlinkSelection:function(){this.manipulateSelection(function(a){this.getRangeElements(a,"[href]").each(this.clearElement)})},wrapHTML:function(){var a=window.getSelection(),b=a.getRangeAt(0),c=a.getNode(),d=arguments.length;b.collapsed&&(b=j.createRange(),b.selectNodeContents(c),a.removeAllRanges(),a.addRange(b));for(b=a.getRangeAt(0);d--;)a=f("<"+arguments[d]+"/>"),b.surroundContents(a.get(0))},toggleHTML:function(a){var b=
a.$editor,a=a.$element,c=b.data("field"),d=a.siblings(),e=a.data("text");b.is(":visible")?(a.find("b").text(a.data("toggle-text")),d.hide(),b.hide(),c.show()):(a.find("b").text(e),d.show(),c.hide(),b.show())},insertHTML:function(a){if(f.browser.msie){var b=j.selection.createRange();b.pasteHTML(a);b.collapse(!1);b.select()}else this.execCommand("insertHTML",!1,a)},quoteSelection:function(){this.manipulateSelection(function(a,b){var c=b.clone(),d=this.getRangeElements(a,this._blockElements),e=d.length-
1,k=f();d.each(function(a){var b=f(this),d=!1;g.Element.isSubContainer(b)&&(d=!0);!a&&d&&a==e?(d=f("<p/>").html(b.html()),b.html("").append(d),k=k.add(d)):k=d?k.add(b.closest(g.Element.getContainers().join(","))):k.add(b);a==e&&k.wrapAll(c)})},f("<blockquote/>"))},unquoteSelection:function(){this.manipulateSelection(function(a){this.getRangeElements(a,"blockquote > *").each(function(){var a=this,c=f(a),d=c.closest("blockquote"),e=d.clone().html(""),d=d.children(),k=d.length-1,i=f();c.unwrap("blockquote");
0<k&&d.each(function(c){this!=a&&(i=i.add(this));if(c==k||this==a)i.wrapAll(e.clone()),i=f()});d=c.parent();g.Element.isSubContainer(d)&&1==d.children().length&&d.html(c.html())})})}});f.extend(g.Commands.make,{blockquote:function(){g.Commands.is.indented()?g.Commands.unquoteSelection():g.Commands.quoteSelection()},alignment:function(a){g.Commands.execCommand("justify"+a)},backgroundColor:function(a){g.Commands.execCommand(f.browser.mozilla?"hilitecolor":"backcolor",!1,a)}});var l={is:function(a){return g.Commands.is[a]()},
make:function(a,b){return g.Commands.make[a](b)},toggle:function(a,b){return g.Commands.make[a](b)}};f.extend(g.Editor.prototype,l);g.Formatting={_bottomUp:function(a,b,c){a=a.find(b);a=f.makeArray(a).reverse();f.each(a,c)},cleanup:function(a){var b=g.Commands.replaceElement,c=g.Commands.deleteElement;a.contents().filter(function(){return this.nodeType==Node.COMMENT_NODE}).remove();this._bottomUp(a,"span",function(){var a=f(this),c=a.css("font-weight"),c="bold"==c||500<c,d="italic"==a.css("font-style");
a.hasClass("Apple-style-span")&&a.removeClass("Apple-style-span");a.removeAttr("style");d&&c?(a.wrap("<b>"),b(a,"i")):c?b(a,"b"):d&&b(a,"i")});a.children("div").each(function(){this.attributes.length||b(f(this),"p")}).end().find("strong").each(function(){b(f(this),"b")}).end().find("em").each(function(){b(f(this),"i")}).end().find("strike").each(function(){b(f(this),"del")}).end().find("u").each(function(){b(f(this),"ins")}).end().find("p:empty,script,noscript,style").remove();a.find("b > b, i > i").each(function(){c(this)})},
cleanupPaste:function(a,b){this.cleanup(a);this._bottomUp(a,"*",function(){var a=this.nodeName.toLowerCase(),b=j.createElement(a);switch(a){case "a":b.href=this.href;b.title=this.title;break;case "img":b.src=this.src,b.alt=this.alt}b.innerHTML=this.innerHTML;f(this).replaceWith(b)});a.find("br").replaceWith("\n");a.html(function(a,b){b=f.trim(b);b=b.replace(/<\/p>\s*<p>/g,"\n\n").replace(/^(<p>)+/,"").replace(/(<\/p>)+$/,"").replace(/<\!--[^>]*--\>/g,"");if(-1==b.indexOf("\n"))return b;b=b.replace(/\n/,
"<p>").replace(/\n/g,"\n</p><p>");return f.trim(b)+"</p>"});a.find("span").children(g.Element.getBlocks()).unwrap();a.find(":empty").remove();"p"!=b.toLowerCase()&&a.find(b).replaceWith(function(a,b){return b});var c,d=[];for(a.find("p ~ p").each(function(){var a=f(this),b=a.prev();c?f.trim(b.html())||(c.after("\n"),c=d.pop()):c=b;c.html(function(b,c){var d=f.trim(a.html());(c=f.trim(c))&&d&&(c+="<br>");return c+d});d.push(a)});c=d.pop();)c.remove();a.before("\n").find("br").replaceWith("<br>\n")},
reBlocks:RegExp("(</(?:ul|ol)>|</(?:"+g.Element.getBlocks().join("|")+")>)","g"),format:function(a){var b=this;a.html(function(a,d){return d.replace(/<\/?[A-Z]+/g,function(a){return a.toLowerCase()}).replace(/(\t|\n| )+/g," ").replace(/[ ]*(<|>)[ ]*/g,"$1").replace("<p>&nbsp;</p>","").replace(/<br\/?><\/p>/,"</p>").replace(/<p>\n+<\/p>/,"").replace(b.reBlocks,"$1\n\n").replace(/<br\/?>/g,"<br>\n").replace(/><li>/g,">\n<li>").replace(/<\/li>\n+</g,"</li>\n<").replace(/<li>/g,"    <li>").replace(/>\s*(<\/?tr>)/g,
">$1").replace(/(<\/?tr>)\s*</g,"$1<").replace(/<(\/?(table|tbody))>/g,"<$1>\n").replace(/<\/tr>/g,"</tr>\n").replace(/<tr>/g,"    <tr>")})},getBrowserMarkupFrom:function(a){var a=f("<div>"+a.val().replace(/\n/,"")+"</div>"),b;this.cleanup(a);b=a.html();(""==b||"<br>"==b||"<br/>"==b)&&a.html("<p>&#x200b;</p>");return a.html()},getApplicationMarkupFrom:function(a){var a=a.clone(),b,a=f("<div/>").html(a.html());b=a.html();(""==b||"<br>"==b||"<br/>"==b)&&a.html("<p>&#x200b;</p>");this.cleanup(a);this.format(a);
return a.html().replace(/<\/?[A-Z]+/g,function(a){return a.toLowerCase()})}};var d={init:function(a,b){this.name=a;this.$editor=b;this.$field=b.data("field");return this},setElement:function(a){this.$element=f(a);return this},getHandler:function(){if(this.handler)return f.proxy(this,"handler");var a=this;return g.Commands.isMakeCommand(this.name)?function(){return g.Commands.make[a.name]()}:g.Commands.isValidExecCommand(this.name)?function(){return g.Commands.execCommand(a.name)}:f.noop},getStateHandler:function(){if(this.query)return f.proxy(this,
"query");if(g.Commands.isValidExecCommand(this.name)){var a=this;return function(b){return b.data("wysihat").Commands.queryCommandState(a.name)}}return f.noop},setOn:function(){this.$element.addClass("selected").attr("aria-pressed","true").find("b").text(this["toggle-text"]?this["toggle-text"]:this.label);return this},setOff:function(){this.$element.removeClass("selected").attr("aria-pressed","false").find("b").text(this.label);return this}};g.Toolbar=function(a,b){this.suspendQueries=!1;this.$editor=
a;this.$toolbar=f('<div class="'+g.name+'-editor-toolbar" role="presentation"></div>');a.before(this.$toolbar);var c=b.length,d;for(d=0;d<c;d++)this.addButton(b[d])};g.Toolbar.prototype={addButton:function(a){var b=this.$editor.data("wysihat"),c=g.inherit(d,g._buttons[a]).init(a,b.$editor);f.extend(c,l);c.Editor=b;c.Event=b.Event;c.Commands=b.Commands;c.Selection=b.Selection;c.setElement(this.createButtonElement(c));c.Event.add(a,c.getHandler());this.observeButtonClick(c);this.observeStateChanges(c)},
createButtonElement:function(a){var b;if(a.type&&"select"==a.type){var c=a.options,d=c.length,e=0;for(b=f('<select class="button"/>');e<d;e++)b.append('<option value="'+c[e][0]+'">'+c[e][1]+"</option>");b.appendTo(this.$toolbar).wrap('<div class="button select-container"/>')}else b=f('<button aria-pressed="false" tabindex="-1"></button>'),b.append("<b>"+a.label+"</b>").addClass("button "+a.name).hover(function(){this.title=f(this).find("b").text()},function(){f(this).removeAttr("title")}).appendTo(this.$toolbar);
a.cssClass&&b.addClass(a.cssClass);a.title&&b.attr("title",a.title);b.data("text",a.label);a["toggle-text"]&&b.data("toggle-text",a["toggle-text"]);return b},observeButtonClick:function(a){var b=this;a.$element.on(a.type&&"select"==a.type?"change":"click",function(){b.suspendQueries=!0;var c=a.$editor;c.is(":focus")||c.focus();a.Event.fire(a.name);return b.suspendQueries=!1})},observeStateChanges:function(a){var b=this,c=a.getStateHandler(),d;b.$editor.on("WysiHat-selection:change",function(){if(!b.suspendQueries){var e=
c(a.$editor,a.$element);e!=d&&(d=e,b.updateButtonState(a,e))}})},updateButtonState:function(a,b){b?a.setOn():a.setOff()}};g.Toolbar.constructor=g.Toolbar})(document,jQuery);jQuery.fn.wysihat=function(j){var f=this.data("wysihat");return f?-1!=jQuery.inArray(j,["Event","Selection","Toolbar","Undo"])?f[j]:f:this.each(function(){f=WysiHat.attach(this,j);$(this).data("wysihat",f)})};
(function(j,f){"undefined"==typeof Node&&function(){window.Node=new function(){return{ATTRIBUTE_NODE:2,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_FRAGMENT_NODE:11,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,ELEMENT_NODE:1,ENTITY_NODE:6,ENTITY_REFERENCE_NODE:5,NOTATION_NODE:12,PROCESSING_INSTRUCTION_NODE:7,TEXT_NODE:3}}}();j.getSelection?(window.Selection={},window.Selection.prototype=window.getSelection().__proto__):function(){function m(){}function g(){this._reset();this._selection=j.selection}function n(d,
a){this.node=d;this.offset=a}m.prototype={setStart:function(d,a){this.startContainer=d;this.startOffset=a;if(d==this.endContainer&&a==this.endOffset)this.collapsed=!0},setEnd:function(d,a){this.endContainer=d;this.endOffset=a;if(d==this.startContainer&&a==this.startOffset)this.collapsed=!0},collapse:function(d){d?(this.endContainer=this.startContainer,this.endOffset=this.startOffset):(this.startContainer=this.endContainer,this.startOffset=this.endOffset)},getNode:function(){var d=j.selection.createRange();
return l.getParentElement(d)},selectNode:function(d){this.setStart(d.parentNode,l.getNodeIndex(d));this.setEnd(d.parentNode,l.getNodeIndex(d)+1)},insertNode:function(d){l.insertNode(d,this.startContainer,this.startOffset)},selectNodeContents:function(d){var a=l.isCharacterDataNode(d)?d.length:d.childNodes.length;this.setStart(d,0);this.setEnd(d,a)},surroundContents:function(){},cloneRange:function(){var d=new m;d.setStart(this.startContainer,this.startOffset);d.setEnd(this.endContainer,this.endOffset);
return d},toString:function(){var d=l.rangeToTextRange(this);return d?d.text:""}};j.createRange=function(){return new m};g.prototype={_reset:function(){this.rangeCount=0;this.focusOffset=this.focusNode=this.anchorOffset=this.anchorNode=null;this._ranges=[]},addRange:function(d){var a=l.rangeToTextRange(d);a?(a.select(),this.rangeCount=1,this._ranges=[d],this.isCollapsed=d.collapsed,this._updateNodeRefs(d)):this.removeAllRanges()},removeAllRanges:function(){this.rangeCount&&this._selection.empty();
this._reset()},getRangeAt:function(d){return 0!==d?null:this._ranges[d]},toString:function(){return this.rangeCount?this._ranges[0].toString():""},_refresh:function(){var d=this._selection.createRange(),a=l.getParentElement(d),b;0==d.compareEndPoints("StartToEnd",d)?d=b=l.getBoundary(d,a,!0,!0):(b=l.getBoundary(d,a,!0,!1),d=l.getBoundary(d,a,!1,!1));a=new m;a.setStart(b.node,b.offset);a.setEnd(d.node,d.offset);this.rangeCount=1;this._ranges=[a];this.isCollapsed=a.collapsed;this._updateNodeRefs(a);
return this},_updateNodeRefs:function(d){this.anchorNode=d.startContainer;this.anchorOffset=d.startOffset;this.focusNode=d.endContainer;this.focusOffset=d.endOffset}};var o=new g;window.getSelection=function(){return o._refresh()};var l={isCharacterDataNode:function(d){d=d.nodeType;return 3==d||4==d||8==d},getNodeIndex:function(d){for(var a=0;d=d.previousSibling;)a++;return a},isAncestorOf:function(d,a,b){for(a=b?a:a.parentNode;a;){if(a===d)return!0;a=a.parentNode}return!1},getCommonAncestor:function(d,
a){var b=[],c;for(c=d;c;c=c.parentNode)b.push(c);for(c=a;c;c=c.parentNode)if(-1<f.inArray(c,b))return c;return null},insertNode:function(d,a,b){var c=11==d.nodeType?d.firstChild:d;this.isCharacterDataNode(a)?b==a.length?f(d).insertAfter(a):a.parentNode.insertBefore(d,0==b?a:this.splitDataNode(a,b)):b>=a.childNodes.length?a.appendChild(d):a.insertBefore(d,a.childNodes[b]);return c},splitDataNode:function(d,a){var b=d.cloneNode(!1);b.deleteData(0,a);d.deleteData(a,d.length-a);f(b).insertAfter(d);return b},
rangeToTextRange:function(d){var a;a=this.createBoundaryTextRange(new n(d.startContainer,d.startOffset),!0);if(d.collapsed)return a;d=this.createBoundaryTextRange(new n(d.endContainer,d.endOffset),!1);if(!a||!d)return!1;textRange=j.body.createTextRange();textRange.setEndPoint("StartToStart",a);textRange.setEndPoint("EndToEnd",d);return textRange},getParentElement:function(d){var a=d.parentElement(),b,c;c=d.duplicate();c.collapse(!0);b=c.parentElement();c=d.duplicate();c.collapse(!1);d=c.parentElement();
b=b==d?b:this.getCommonAncestor(b,d);return b==a?b:this.getCommonAncestor(a,b)},createBoundaryTextRange:function(d,a){var b=j,c=d.offset,g=b.body.createTextRange(),e=this.isCharacterDataNode(d.node),k,i;e?(k=d.node,i=k.parentNode):(k=d.node.childNodes,k=c<k.length?k[c]:null,i=d.node);b=b.createElement("span");b.innerHTML="&#feff;";k?i.insertBefore(b,k):i.appendChild(b);if(!f.contains(j.body,b))return i.removeChild(b),null;g.moveToElementText(b);g.collapse(!a);i.removeChild(b);if(e)g[a?"moveStart":
"moveEnd"]("character",c);return g},getBoundary:function(d,a,b,c){var f=d.duplicate(),e;f.collapse(b);e=f.parentElement();this.isAncestorOf(a,e,!0)||(e=a);if(!e.canHaveHTML)return new n(e.parentNode,this.getNodeIndex(e));var a=j.createElement("span"),g=b?"StartToStart":"StartToEnd",i;do e.insertBefore(a,a.previousSibling),f.moveToElementText(a);while(0<(i=f.compareEndPoints(g,d))&&a.previousSibling);g=a.nextSibling;if(-1==i&&g&&this.isCharacterDataNode(g)){f.setEndPoint(b?"EndToStart":"EndToEnd",
d);if(/[\r\n]/.test(g.data)){e=f.duplicate();b=e.text.replace(/\r\n/g,"\r").length;for(b=e.moveStart("character",b);-1==e.compareEndPoints("StartToEnd",e);)b++,e.moveStart("character",1)}else b=f.text.length;e=new n(g,b)}else g=(c||!b)&&a.previousSibling,e=(b=(c||b)&&a.nextSibling)&&this.isCharacterDataNode(b)?new n(b,0):g&&this.isCharacterDataNode(g)?new n(g,g.length):new n(e,this.getNodeIndex(a));a.parentNode.removeChild(a);return e}};window.Range=m;window.Selection=g}();f.extend(Range.prototype,
{equalRange:function(f){return!f||!f.compareBoundaryPoints?!1:this.collapsed&&f.collapsed?0==this.compareBoundaryPoints(this.START_TO_START,f):0==this.compareBoundaryPoints(this.START_TO_START,f)&&1==this.compareBoundaryPoints(this.START_TO_END,f)&&0==this.compareBoundaryPoints(this.END_TO_END,f)&&-1==this.compareBoundaryPoints(this.END_TO_START,f)}});f.extend(window.Selection.prototype,{getNode:function(){return 0<this.rangeCount?this.getRangeAt(0).getNode():null}})})(document,jQuery);
