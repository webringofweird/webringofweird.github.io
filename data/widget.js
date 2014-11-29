(function() {
	var filename = 'widget.js';
	var dataFile = 'sites.json';
	var scr = document.scripts;
	var scriptElement;
	var scriptPath;

	for(var i = 0; i < scr.length; i++) {
		scriptElement = scr[i];
		
		var src = scriptElement.getAttribute('src');
		console.log(src);

		var sf = src.split('?')[0].split('/').pop();
		if (sf === filename) {
			console.log(src);
			scriptPath = src.replace(filename, '');
			console.log(scriptPath);
			break;
		}
	}

	loadData(scriptElement, scriptPath);


	function loadData(script, scriptPath) {
		var request = new XMLHttpRequest();
		request.open('get', scriptPath + '/' + dataFile, true);
		request.responseType = 'json';
		request.addEventListener('load', function() {
			var response = request.response;
			console.log(response);
			renderAndInsertAfter(response, script);
		});
		request.send();

	}


	function renderAndInsertAfter(data, script) {
		var div = document.createElement('div');
		var sites = data.sites;
		var ringURL = script.getAttribute('data-url');
		var innerHTML = '';

		var index = findPosition(sites, ringURL);

		if(index === -1) {
			// render 'reduced' webring?
			innerHTML = 'url missing, just have a random one';
		} else {
			var prevIndex = --index < 0 ? sites.length - 1 : index;
			var nextIndex = ++index === sites.length ? 0 : index;
			console.log(prevIndex, nextIndex);

			var prevSite = sites[prevIndex];
			var nextSite = sites[nextIndex];

			innerHTML = 
				'<table><tr>' +
				'<td class="wow-prev">&lt;&lt; <a href="' + prevSite.url + '">' + prevSite.title + '</a></td>' +
				'<td class="wow-center"><p><a href="">[ webring of weird ]</a></p></td>' +
				'<td class="wow-next"><a href="' + nextSite.url + '">' + nextSite.title + '</a> &gt;&gt;</td>' + // TODO ESCAPEEEE!!!
				'</tr></table>';
		}

		div.className = 'wow-root';
		div.innerHTML = innerHTML;
		document.body.insertBefore(div, script.nextSibling);
	}

	function findPosition(sites, url) {
		for(var i = 0; i < sites.length; i++) {
			var site = sites[i];
			if(site.url === url) {
				return i;
			}
		}
		return -1;
	}


	
})();
