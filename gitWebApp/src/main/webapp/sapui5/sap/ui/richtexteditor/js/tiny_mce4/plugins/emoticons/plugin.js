tinymce.PluginManager.add('emoticons',function(a,u){var b=[["cool","cry","embarassed","foot-in-mouth"],["frown","innocent","kiss","laughing"],["money-mouth","sealed","smile","surprised"],["tongue-out","undecided","wink","yell"]];function g(){var e;e='<table role="list" class="mce-grid">';tinymce.each(b,function(r){e+='<tr>';tinymce.each(r,function(i){var c=u+'/img/smiley-'+i+'.gif';e+='<td><a href="#" data-mce-url="'+c+'" data-mce-alt="'+i+'" tabindex="-1" '+'role="option" aria-label="'+i+'"><img src="'+c+'" style="width: 18px; height: 18px" role="presentation" /></a></td>';});e+='</tr>';});e+='</table>';return e;}a.addButton('emoticons',{type:'panelbutton',panel:{role:'application',autohide:true,html:g,onclick:function(e){var l=a.dom.getParent(e.target,'a');if(l){a.insertContent('<img src="'+l.getAttribute('data-mce-url')+'" alt="'+l.getAttribute('data-mce-alt')+'" />');this.hide();}}},tooltip:'Emoticons'});});
