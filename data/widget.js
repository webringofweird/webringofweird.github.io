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
		var innerHTML = '<table><tr>';
		var centerTD = '<td class="wow-center"><p><a href="https://webringofweird.github.io">[ webring of weird ]</a><br /><span>linking ' + sites.length + ' sites together</span></p><input type="button" class="wow-random" value="take me to a random site" /></td>';

		var index = findPosition(sites, ringURL);

		if(index === -1) {
			
			// render 'reduced' webring
			innerHTML += centerTD;

		} else {

			var prevIndex = --index < 0 ? sites.length - 1 : index;
			var nextIndex = ++index === sites.length ? 0 : index;

			var prevSite = sites[prevIndex];
			var nextSite = sites[nextIndex];

			innerHTML += 
				'<td class="wow-prev">&lt;&lt; <a href="' + prevSite.url + '">' + prevSite.title + '</a></td>' +
				centerTD +
				'<td class="wow-next"><a href="' + nextSite.url + '">' + nextSite.title + '</a> &gt;&gt;</td>'; // TODO ESCAPEEEE!!!

		}

		innerHTML += '</tr></table>';

		div.className = 'wow-root';
		div.innerHTML = innerHTML;

		var random = div.querySelector('.wow-random');
		random.addEventListener('click', function() {
			goRandom(sites);
		});

		
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

	function goRandom(sites) {
		var randIndex = Math.floor(Math.random() * sites.length);
		var site = sites[randIndex];
		document.location.href = site.url;
	}

	
})();
