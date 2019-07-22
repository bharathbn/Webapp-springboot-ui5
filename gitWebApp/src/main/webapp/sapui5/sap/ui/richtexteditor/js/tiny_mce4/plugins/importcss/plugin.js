tinymce.PluginManager.add('importcss',function(a){var s=this,b=tinymce.each;function r(u){var e=tinymce.Env.cacheSuffix;if(typeof u=='string'){u=u.replace('?'+e,'').replace('&'+e,'');}return u;}function i(e){var n=a.settings,o=n.skin!==false?n.skin||'lightgray':false;if(o){var p=n.skin_url;if(p){p=a.documentBaseURI.toAbsolute(p);}else{p=tinymce.baseURL+'/skins/'+o;}return e===p+'/content'+(a.inline?'.inline':'')+'.min.css';}return false;}function c(e){if(typeof e=="string"){return function(v){return v.indexOf(e)!==-1;};}else if(e instanceof RegExp){return function(v){return e.test(v);};}return e;}function g(n,o){var p=[],q={};function t(u,v){var w=u.href,x;w=r(w);if(!w||!o(w,v)||i(w)){return;}b(u.imports,function(u){t(u,true);});try{x=u.cssRules||u.rules;}catch(e){}b(x,function(y){if(y.styleSheet){t(y.styleSheet,true);}else if(y.selectorText){b(y.selectorText.split(','),function(z){p.push(tinymce.trim(z));});}});}b(a.contentCSS,function(u){q[u]=true;});if(!o){o=function(u,v){return v||q[u];};}try{b(n.styleSheets,function(u){t(u);});}catch(e){}return p;}function d(e){var n;var o=/^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(e);if(!o){return;}var p=o[1];var q=o[2].substr(1).split('.').join(' ');var t=tinymce.makeMap('a,img');if(o[1]){n={title:e};if(a.schema.getTextBlockElements()[p]){n.block=p;}else if(a.schema.getBlockElements()[p]||t[p.toLowerCase()]){n.selector=p;}else{n.inline=p;}}else if(o[2]){n={inline:'span',title:e.substr(1),classes:q};}if(a.settings.importcss_merge_classes!==false){n.classes=q;}else{n.attributes={"class":q};}return n;}function f(e,n){return tinymce.util.Tools.grep(e,function(o){return!o.filter||o.filter(n);});}function h(e){return tinymce.util.Tools.map(e,function(n){return tinymce.util.Tools.extend({},n,{original:n,selectors:{},filter:c(n.filter),item:{text:n.title,menu:[]}});});}function j(a,e){return e===null||a.settings.importcss_exclusive!==false;}function k(e,n,o){return!(j(a,n)?e in o:e in n.selectors);}function m(e,n,o){if(j(a,n)){o[e]=true;}else{n.selectors[e]=true;}}function l(p,e,n){var o,q=a.settings;if(n&&n.selector_converter){o=n.selector_converter;}else if(q.importcss_selector_converter){o=q.importcss_selector_converter;}else{o=d;}return o.call(p,e,n);}a.on('renderFormatsMenu',function(e){var n=a.settings,o={};var p=c(n.importcss_selector_filter),q=e.control;var t=h(n.importcss_groups);var u=function(v,w){if(k(v,w,o)){m(v,w,o);var x=l(s,v,w);if(x){var y=x.name||tinymce.DOM.uniqueId();a.formatter.register(y,x);return tinymce.extend({},q.settings.itemDefaults,{text:x.title,format:y});}}return null;};if(!a.settings.importcss_append){q.items().remove();}b(g(e.doc||a.getDoc(),c(n.importcss_file_filter)),function(v){if(v.indexOf('.mce-')===-1){if(!p||p(v)){var w=f(t,v);if(w.length>0){tinymce.util.Tools.each(w,function(y){var x=u(v,y);if(x){y.item.menu.push(x);}});}else{var x=u(v,null);if(x){q.add(x);}}}}});b(t,function(v){if(v.item.menu.length>0){q.add(v.item);}});e.control.renderNew();});s.convertSelectorToFormat=d;});
