function ApplicationWindow(title, key) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor: 'white',
		barColor: '#005200'
	});
	
	if(key == 'chants') {
		var data = [];
		
		var chantsTag = TS.xml.getElementsByTagName('chants');
		var chantsEl = chantsTag.item(0);
		var chants = chantsEl.getChildNodes();
		for(x = 0; x < chants.length; x++) {
			var chant = chants.item(x);
			var chantName = chant.getElementsByTagName('name');
			var chantLyrics = chant.getElementsByTagName('lyrics');
			var chantVideo = chant.getElementsByTagName('video');
			if(chantName) {
				data[data.length] = {
					title: chantName.item(0).getText(),
					hasChild: true,
					lyrics: chantLyrics.item(0).getText(),
					video: ((chantVideo.length > 0) ? chantVideo.item(0).getText() : '')
				};
			}
		}
		
		var tableview = Titanium.UI.createTableView({
			data: data
		});
		
		tableview.addEventListener('click', function(e) {
			var win = Ti.UI.createWindow({
				title: e.rowData.title,
				backgroundColor: 'white',
				barColor: '#005200'
			});
			
			var web = Titanium.UI.createWebView();
			var lyrics = '<h1>' + e.rowData.title + '</h1>' + e.rowData.lyrics.trim().replace(/\n/g, '<BR>') + ((e.rowData.video) ? '<br><br><a onclick="Ti.App.fireEvent(\'openURL\', { url: \'' + e.rowData.video + '\'}); return false" href="' + e.rowData.video + '" target="_blank" class="video">Watch Chant Video &raquo;</a>' : '');
			web.setHtml('<html>' + 
			'<head>' +
			'<style type="text/css">' +
			'* { font-family: Verdana; color: #000; font-size: 14px; font-weight: normal; }' +
			'body { background-color: #fff; }' +
			'h1 { margin-bottom: 1.2em; font-size: 16px; font-weight: bold; }' +
			'a.video { text-decoration: none; color: #006600; font-weight: bold; font-size: 14px; }' +
			'</style>' +
			'</head>' + 
			'<body>' + lyrics + '</body>' +
			'</html>');
			win.add(web);
			
			var scrollView = Titanium.UI.createScrollView({
				contentWidth: 'auto',
				contentHeight: 'auto',
				top: 0,
				showVerticalScrollIndicator: true,
				showHorizontalScrollIndicator: true
			});
			
			TS.TabGroup.activeTab.open(win, {
				animated: true
			});
		});
		
		self.add(tableview);
	}

	return self;
};

module.exports = ApplicationWindow;
