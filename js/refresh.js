let universeIds = [
		1499870257, //grg
		326706417 //parkour tag
]



let tiles = []

let modals = []

function updateTiles() {
	for (var i = 0; i < universeIds.length; i++) {
		let tile = tiles[i]
		let modal = modals[i];
		let universeId = universeIds[i]

		let url = 'https://cors-anywhere.herokuapp.com/https://games.roblox.com/v1/games?universeIds='+universeId;
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if (xhttp.readyState == 4 && xhttp.status == 200)
			{
				let data = JSON.parse(xhttp.responseText).data[0];
				//tile.playerCount.innerHTML = data.playing;
				tile.totalVisits.innerHTML = data.visits;
				let desc = data.description;
				//desc.replace("\n", "<br>");
				desc = desc.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
				modal.gameDesc.innerHTML = desc;
			}
		}
		xhttp.open("GET", url, true);
		xhttp.send();
		// fetch(url)
		// .then(function(response) {
		// 	console.log(response);
		// });
	}
}

window.onload = function() {
	document.querySelectorAll(".game-tile").forEach((item, i) => {
		let tile = {
			//playerCount : item.querySelector(".player-count"),
			totalVisits : item.querySelector(".total-visits")
		}
		tiles.push(tile);
	});

	document.querySelectorAll(".tile-modal").forEach((item, i) => {
		let modal = {
			gameDesc : item.querySelector(".game-desc")
		}
		modals.push(modal);
	});
	console.log(modals);


	updateTiles();
	setInterval(updateTiles, 1000*60);
}
