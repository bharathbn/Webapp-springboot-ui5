/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/unified/Menu','sap/ui/unified/MenuItem','sap/ui/core/Popup','./library'],function(q,D,M,a,P,l){"use strict";var b={TableUtils:null,openContextMenu:function(t,e,h,f){if(t==null||e==null){return;}if(f==null){f=true;}var T=q(e);var $=b.TableUtils.getCell(t,T);if($===null){return;}var c=b.TableUtils.getCellInfo($);if(c.type===b.TableUtils.CELLTYPES.COLUMNHEADER){var C=b.TableUtils.getColumnHeaderCellInfo($).index;var d=$.find(".sapUiTableColDropDown").length>0;if(D.system.desktop||d){b.removeColumnHeaderCellMenu(t,C);var E=true;if(f){E=t.fireColumnSelect({column:t._getVisibleColumns()[C]});}if(E){b.openColumnContextMenu(t,C,h);}}else{b.applyColumnHeaderCellMenu(t,C);}}else if(c.type===b.TableUtils.CELLTYPES.DATACELL){var o=b.TableUtils.getDataCellInfo(t,$);var r=o.rowIndex;var C=o.columnIndex;var E=true;if(f){var R=b.TableUtils.getRowColCell(t,r,C,true);var g=R.row;var i;var j=t.getBindingInfo("rows");if(j!=null){i=g.getBindingContext(j.model);}var p={rowIndex:g.getIndex(),columnIndex:C,columnId:R.column.getId(),cellControl:R.cell,rowBindingContext:i,cellDomRef:$[0]};E=t.fireCellContextmenu(p);}if(E){b.openDataCellContextMenu(t,C,r,h);}}},openColumnContextMenu:function(t,c,h){if(t==null||c==null||c<0){return;}if(h==null){h=false;}var C=t.getColumns();if(c>=C.length){return;}var o=C[c];if(!o.getVisible()){return;}for(var i=0;i<C.length;i++){if(C[i]!==o){b.closeColumnContextMenu(t,i);}}o._openMenu(o.getDomRef(),h);},closeColumnContextMenu:function(t,c){if(t==null||c==null||c<0){return;}var C=t.getColumns();if(c>=C.length){return;}var o=C[c];var m=o.getMenu();m.close();},openDataCellContextMenu:function(t,c,r,h){if(t==null||c==null||c<0||r==null||r<0||r>=b.TableUtils.getNonEmptyVisibleRowCount(t)){return;}if(h==null){h=false;}var C=t.getColumns();if(c>=C.length){return;}var o=C[c];if(!o.getVisible()){return;}if(t.getEnableCellFilter()&&o.isFilterableByMenu()){var R=t.getRows()[r];if(t._oCellContextMenu==null){t._oCellContextMenu=new M(t.getId()+"-cellcontextmenu");var d=new a({text:t._oResBundle.getText("TBL_FILTER")});d._onSelect=function(o,r){var g=this.getContextByIndex(r);var F=o.getFilterProperty();var s=g.getProperty(F);if(this.getEnableCustomFilter()){this.fireCustomFilter({column:o,value:s});}else{this.filter(o,s);}};d.attachSelect(d._onSelect.bind(t,o,R.getIndex()));t._oCellContextMenu.addItem(d);t.addDependent(t._oCellContextMenu);}else{var m=t._oCellContextMenu.getItems()[0];m.mEventRegistry.select[0].fFunction=m._onSelect.bind(t,o,R.getIndex());}var e=R.getCells()[c];var $=b.TableUtils.getParentDataCell(t,e.getDomRef());if($!==null&&!b.TableUtils.Grouping.isInGroupingRow($)){var e=$[0];var f=t._oCellContextMenu.bOpen&&t._oCellContextMenu.oOpenerRef!==e;if(f){b.closeDataCellContextMenu(t);}t._oCellContextMenu.open(h,e,P.Dock.BeginTop,P.Dock.BeginBottom,e,"none none");}}},closeDataCellContextMenu:function(t){if(t==null){return;}var m=t._oCellContextMenu;var c=m!=null&&m.bOpen;if(c){m.close();}},applyColumnHeaderCellMenu:function(t,c){if(t==null||c==null||c<0){return;}var C=t.getColumns();if(c>=C.length){return;}var o=C[c];if(o.getVisible()&&(o.getResizable()||o._menuHasItems())){var $=o.$();var d=$.find(".sapUiTableColCell");var e=$.find(".sapUiTableColCellMenu").length>0;if(!e){d.hide();var s="";if(o._menuHasItems()){s="<div class='sapUiTableColDropDown'></div>";}var f="";if(o.getResizable()){f="<div class='sapUiTableColResizer''></div>";}var g=q("<div class='sapUiTableColCellMenu'>"+s+f+"</div>");$.append(g);$.on("focusout",function(t,c){b.removeColumnHeaderCellMenu(t,c);this.off("focusout");}.bind($,t,c));}}},removeColumnHeaderCellMenu:function(t,c){if(t==null||c==null||c<0){return;}var C=t.getColumns();if(c>=C.length){return;}var o=C[c];var $=o.$();var d=$.find(".sapUiTableColCellMenu");var e=d.length>0;if(e){var f=$.find(".sapUiTableColCell");f.show();d.remove();}}};return b;},true);