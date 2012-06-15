/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

var moment = require('/lib/moment.min');

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

var TS = {};

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	var xmlFile = Ti.Filesystem.getFile('xml/strings.xml');
	var xmlStr = xmlFile.read().text;
	TS.xml = Ti.XML.parseString(xmlStr);
	
	Ti.App.addEventListener('openURL', function(e){
		Ti.Platform.openURL(e.url);
	});

	var Window;
	Window = require('ui/handheld/ApplicationWindow');
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	TS.TabGroup = new ApplicationTabGroup(Window);
	TS.TabGroup.open();
})();
