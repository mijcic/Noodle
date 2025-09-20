function goToMenu(a) {
    window.location.href = a;
}

$(document).ready(function()
{
	var naruzbine = JSON.parse(localStorage.getItem('narudzbine')) || [];

	
	var table = document.getElementById('kanta_id');

	var stranica = window.location.pathname.split("/").pop();

	var langindex;
	if (stranica.includes('engleski'))
		langindex=1;
	else
		langindex=0;
	
	var ulogovankorisnik = JSON.parse(localStorage.getItem('korisnik')) || '';
	var ukupnacena=0;

	
	for(var i=0;i < naruzbine.length;i++)
	{
		var korisnik = naruzbine[i].korisnik;
		
		if (korisnik==ulogovankorisnik)
		{
			var slika = naruzbine[i].image;
			var name = naruzbine[i].name[langindex];
			var cena= Number(naruzbine[i].priceNum);
			var koliko= Number(naruzbine[i].koliko) || 1;
			

			var divokvir = document.createElement('div');
			divokvir.className = 'element-korpe';
			
			var divelement = document.createElement('div');
			divelement.className = 'col-md-4 slika-i-ime';
			
			divokvir.appendChild(divelement);
			
			
			var imgElem = document.createElement('img');
			imgElem.src = slika;
			divelement.appendChild(imgElem);
			
			var ime = document.createElement('p');
			ime.textContent = name;
			
			divelement.appendChild(ime);
			
			
			var divdugmad = document.createElement('div');
			divdugmad.className = 'col-md-4 dugmici';
			
			divokvir.appendChild(divdugmad);
			
			var dugmedole = document.createElement('button');
			dugmedole.className = 'decrease';
			dugmedole.textContent = '-';
			
			
			divdugmad.appendChild(dugmedole);
			
			var span = document.createElement('span');
			span.className = 'number';
			span.id ='span_' + i;
			span.textContent=koliko;
			
			divdugmad.appendChild(span);
			
			var dugmegore = document.createElement('button');
			dugmegore.className = 'increase';
			dugmegore.textContent = '+';
			
			divdugmad.appendChild(dugmegore);
			
			var dugmeremove = document.createElement('button');
			dugmeremove.className = 'remove';
			dugmeremove.textContent = 'x';
			
			(function(index){
				dugmedole.onclick = function() {
					smanji(index,'span_' + index );
				};
			})(i);
			
			(function(index){
				dugmegore.onclick = function() {
					povecaj(index,'span_' + index );
				};
			})(i);
			
			(function(index){
				dugmeremove.onclick = function() {
					ukloni(index );
				};
			})(i);
			
			divdugmad.appendChild(dugmeremove);
			
			table.appendChild(divokvir);
	
		}
	}
	
	var finalizacija = JSON.parse(localStorage.getItem('finalizacija')) || [];
	
	var final_okvir = document.getElementById('finalizacija_id');
	for(var i=0;i < finalizacija.length;i++)
	{
		let sledeca = finalizacija[i];
		
		var korisnik = sledeca[0].korisnik;
		
		if (korisnik==ulogovankorisnik)
		{
			var ukupnacena=0;
			var divfin = document.createElement('div');
			divfin.className = 'col-md-4 narudzbina';
			
			final_okvir.appendChild(divfin);
			
			for(var j=0;j<sledeca.length;j++)
			{
				var ime = sledeca[j].name[langindex];
				var cena = Number(sledeca[j].cena);
				var koliko = Number(sledeca[j].koliko);
				var elementtext = ime + " x " + koliko + "\t = " + ( cena*koliko);
				ukupnacena=ukupnacena + cena*koliko;
				
				var t = document.createElement('h4');
				t.textContent = elementtext;
				
				divfin.appendChild(t);
			}
			
			var ukupno = document.createElement('h2');
			ukupno.textContent = ukupnacena + ' RSD';
			divfin.appendChild(ukupno);
		}
					
	}
	
});



function smanji(index, id)
{
	var koliko = Number(document.getElementById(id).innerHTML);
	koliko = koliko -1;
	var narudzbine = JSON.parse(localStorage.getItem('narudzbine')) || [];
	if ( koliko ==0)
		narudzbine.splice(index,1);
	else
		narudzbine[index].koliko=koliko;
	localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
	location.reload(true);
}

function povecaj(index, id)
{
	var koliko = Number(document.getElementById(id).innerHTML);
	koliko = koliko +1;
	var narudzbine = JSON.parse(localStorage.getItem('narudzbine')) || [];
	narudzbine[index].koliko=koliko;
	localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
	location.reload(true);
	
}

function ukloni(index)
{
	var narudzbine = JSON.parse(localStorage.getItem('narudzbine')) || [];
	narudzbine.splice(index,1);
	localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
	location.reload(true);
}

function finalizuj()
{
	var narudzbine = JSON.parse(localStorage.getItem('narudzbine')) || [];
	var finalizacija = JSON.parse(localStorage.getItem('finalizacija')) || [];
	
	var ulogovankorisnik = JSON.parse(localStorage.getItem('korisnik')) || '';
	
	let nova= [];

	for(var i=0;i < narudzbine.length;i++)
	{
		var korisnik = narudzbine[i].korisnik;
		if (korisnik==ulogovankorisnik)
		{
			var name = narudzbine[i].name;
			var cena= Number(narudzbine[i].priceNum);
			var koliko= Number(narudzbine[i].koliko) || 1;
			
			nova.push({korisnik: ulogovankorisnik, name: name, cena:cena , koliko : koliko });
		}
	}
	if (nova.length>0)
	{
		finalizacija.push(nova);
		localStorage.setItem('finalizacija', JSON.stringify(finalizacija));
	}
	
	for(var i=narudzbine.length-1;i >=0;i--)
	{
		var korisnik = narudzbine[i].korisnik;
		if (korisnik==ulogovankorisnik)
		{
			narudzbine.splice(i,1);
		}
	}
	localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
	location.reload(true);
}

function odjava() {
	var stranica = window.location.pathname.split("/").pop();
	var lang;
	if (stranica.includes('engleski'))
		lang=1;
	else
		lang=0;
	
	localStorage.setItem('korisnik', JSON.stringify(""));
	
	if(lang==1)
		window.location.href = "prijavljivanje_engleski.html";
	else
		window.location.href = "prijavljivanje_srpski.html";
}