function goToMenu(a) {
    window.location.href = a;
}

$(document).ready(function()
{
	var ocene = JSON.parse(localStorage.getItem('ocene')) || [];
	
	ocene.sort(function(a, b) {
			var prosecnaa = Math.round((Number(a.zbir) / Number(a.koliko))*10)/10;
			var prosecnab = Math.round((Number(b.zbir) / Number(b.koliko))*10)/10;
			return prosecnab - prosecnaa;
	});
	
	
	
	var table = document.getElementById('divrowid');
	
	//var tr = document.createElement('tr');
	
	var kols=[];
	
	for(var i=0;i<3;i++)
	{
		//kols[i]=document.createElement('td');
		kols[i]=document.createElement('div');
		kols[i].className = 'col-md-4 meal';
	}
	
	var stranica = window.location.pathname.split("/").pop();

	var langindex;
	if (stranica.includes('engleski'))
		langindex=1;
	else
		langindex=0;

	
	for(var i=0;i < 3 && i< ocene.length;i++)
	{
		var prosecna = Math.round((Number(ocene[i].zbir) / Number(ocene[i].koliko))*10)/10;
		var slika = ocene[i].image;
		var name = ocene[i].name[langindex];

		var cardDiv = document.createElement('div');
        cardDiv.className = 'card';
		
		var imgElem = document.createElement('img');
        imgElem.src = slika;
		imgElem.className="img-fluid";
		cardDiv.appendChild(imgElem);
		
		
		
		var nameLabel = document.createElement('h3');
		nameLabel.textContent = name;

		var rating = document.createElement('div');
		rating.classList.add('rating');
		
		//izmenjeno
		var procecnaocena = document.createElement('p');
		var tekst = document.createElement('tekst');
		tekst.classList.add("tekst");
		var tekstValue = document.createElement('tekstValue');
		tekstValue.classList.add("tekstValue");
		tekstValue.textContent = prosecna;

		if (langindex ==0)
			tekst.textContent = 'Prosečna ocena: ';
		else
			tekst.textContent = 'Average rate: ';
			
		procecnaocena.style.fontStyle = "italic";
		rating.appendChild(tekst);
		rating.appendChild(tekstValue);
		//izmenjeno

		cardDiv.appendChild(imgElem);
		cardDiv.appendChild(nameLabel);
		cardDiv.appendChild(rating);
		
		kols[i].appendChild(cardDiv);
	}
	table.appendChild(kols[0]);
	table.appendChild(kols[1]);
	table.appendChild(kols[2]);
});


