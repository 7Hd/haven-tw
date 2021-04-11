'use strict';(function(){const input=document.querySelector('#book-search-input');const results=document.querySelector('#book-search-results');if(!input){return}
input.addEventListener('focus',init);input.addEventListener('keyup',search);document.addEventListener('keypress',focusSearchFieldOnKeyPress);function focusSearchFieldOnKeyPress(event){if(input===document.activeElement){return;}
const characterPressed=String.fromCharCode(event.charCode);if(!isHotkey(characterPressed)){return;}
input.focus();event.preventDefault();}
function isHotkey(character){const dataHotkeys=input.getAttribute('data-hotkeys')||'';return dataHotkeys.indexOf(character)>=0;}
function init(){input.removeEventListener('focus',init);input.required=true;loadScript('/haven-tw/flexsearch.min.js');loadScript('/haven-tw/zh-tw.search-data.min.f09cbbd93c7c571ce61b6e5f5835729d6b01c1f915aa12ae3edc5c853dc4c069.js',function(){input.required=false;search();});}
function search(){while(results.firstChild){results.removeChild(results.firstChild);}
if(!input.value){return;}
const searchHits=window.bookSearchIndex.search(input.value,10);searchHits.forEach(function(page){const li=element('<li><a href></a></li>');const a=li.querySelector('a'),small=element('<small></small>');a.href=page.href;a.textContent=page.title;const content=page.content;const index=content.indexOf(input.value)
const sub=content.substring(index<10?index:index-10,index+20);small.innerHTML=sub.replace(input.value,'<span style="color:red">'+input.value+'</span>');a.appendChild(element('</br>'));a.appendChild(small);results.appendChild(li);});}
function loadScript(src,callback){const script=document.createElement('script');script.defer=true;script.async=false;script.src=src;script.onload=callback;document.head.appendChild(script);}
function element(content){const div=document.createElement('div');div.innerHTML=content;return div.firstChild;}})();