$(document).ready(function() {
    // Bootstrap dropdown hover functionality
    var dropdowns = document.querySelectorAll('.dropdown, .dropdown-submenu');
    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
            var menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.add('show');
            }
        });
        dropdown.addEventListener('mouseleave', function () {
            var menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.remove('show');
            }
        });
    });

    // Properly initialize Bootstrap dropdowns
    $('.dropdown-toggle').dropdown();

    // Ensure dropdowns can be toggled
    $('.dropdown-toggle').on('click', function(e) {
        if ($(this).next('.dropdown-menu').hasClass('show')) {
            $(this).next('.dropdown-menu').removeClass('show');
        } else {
            $(this).next('.dropdown-menu').addClass('show');
        }
    });

    // Close dropdowns when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });
});







// // dodatak pocetak

let names_lang = 
[
	['Pohovani sladoled','Fried ice cream'], 
	['Banana split','Banana split'], 
	['Pohovane banane','Fried bananas'], 
	['Tart od limuna','Lemon tart'], 
	['Kolačić sreće','Happiness cookie'], 
	['Knedle sa šljivama','Dumplings with plums']
	];
let pricesM = ['300.00', '460.00', '320.00', '600.00', '360.00', '400.00'];
let pricesV = ['400.00', '680.00', '430.00', '750.00', '450.00', '600.00'];
let pricesNum = [300, 460, 320, 600, 360, 400];
let images = ['koriscene_slike/fried-ice-cream.jpg', 'koriscene_slike/banana-split.jpg', 'koriscene_slike/fried-bananas.jpg', 'koriscene_slike/lemon-tart.jpeg', 'koriscene_slike/Fortune-Cookies.jpg', 'koriscene_slike/plum-dumplings.jpeg'];
let ingredients_lang = 
[
	['sladoled od vanile/čokolade/jagode, mleveni keks, sezonsko voće, šlag','vanilla/chocolate/strawberry ice cream, ground biscuits, seasonal fruit, whipped cream'], 
	['banana, sladoled od vanile, sladoled od čokolade, sladoled od jagode','banana, vanilla ice cream, chocolate ice cream, strawberry ice cream'], 
	['banana, toping od čokolade','banana, chocolate topping'], 
	['limun, narandža, bela čokolada','lemon, orange, white chocolate'], 
	['vanila, limun','vanilla, lemon'], 
	['vanila, šljive','vanilla, plums']
];
let names = [];
let ingredients = [];
// // dodatak kraj
let namesSearch = [];
let pricesMSearch = [];
let pricesVSearch = [];
let pricesNumSearch = [];
let imagesSearch = [];
let ingredientsSearch = [];

// // dodatak pocetak

var stranica = window.location.pathname.split("/").pop();

var langindex;
if (stranica.includes('engleski'))
	langindex=1;
else
	langindex=0;

for(var i=0;i<names_lang.length;i++)
{
	names.push(names_lang[i][langindex]);
	ingredients.push(ingredients_lang[i][langindex]);

}
// // dodatak kraj

$(document).ready(function() {
    setRow(names, pricesM, pricesV, images, ingredients);

    var sortiranjeNaziv = document.getElementById('sortiranjeNaziv');
    var sortiranjeCena = document.getElementById('sortiranjeCena');
    var odabranoNaziv = sortiranjeNaziv.selectedIndex;
    var odabranoCena = sortiranjeCena.selectedIndex;
    
    sortiranjeNaziv.addEventListener('change', function() {
        odabranoNaziv = sortiranjeNaziv.selectedIndex;
        odabranoCena = sortiranjeCena.selectedIndex;

        if (odabranoNaziv == 1 && odabranoCena == 0) {
            nazivAsc();
        }
        else if (odabranoNaziv == 2 && odabranoCena == 0) {
            nazivDesc();
        }
        else if (odabranoNaziv == 1 && odabranoCena == 1) {
            cenaAscNazivAsc();
        }
        else if (odabranoNaziv == 2 && odabranoCena == 1) {
            cenaAscNazivDesc();
        }
        else if (odabranoNaziv == 1 && odabranoCena == 2) {
            cenaDescNazivAsc();
        }
        else if (odabranoNaziv == 2 && odabranoCena == 2) {
            cenaDescNazivDesc();
        }

        removeAllElements();
        setRow(names, pricesM, pricesV, images, ingredients);
    });

    sortiranjeCena.addEventListener('change', function() {
        odabranoNaziv = sortiranjeNaziv.selectedIndex;
        odabranoCena = sortiranjeCena.selectedIndex;

        if (odabranoNaziv == 0 && odabranoCena == 1) {
            cenaAsc();
        }
        else if (odabranoNaziv == 0 && odabranoCena == 2) {
            cenaDesc();
        }
        else if (odabranoNaziv == 1 && odabranoCena == 1) {
            nazivAscCenaAsc();
        }
        else if (odabranoNaziv == 2 && odabranoCena == 1) {
            nazivDescCenaAsc();
        }
        else if (odabranoNaziv == 1 && odabranoCena == 2) {
            nazivAscCenaDesc();
        }
        else if (odabranoNaziv == 2 && odabranoCena == 2) {
            nazivDescCenaDesc();
        }
        
        removeAllElements();
        setRow(names, pricesM, pricesV, images, ingredients);
    });

    var pretraga = document.getElementById('pretraga-input');
    pretraga.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            console.log("Uslo");
            var value = pretraga.value.toLowerCase().trim();
            namesSearch = []; pricesMSearch = []; pricesVSearch = []; pricesNumSearch = []; imagesSearch = []; ingredientsSearch = [];
            
            var valueNumber = parseFloat(value);
            if (!isNaN(valueNumber)) {
                for (var i = 0; i < pricesM.length; i++) {
                    if (pricesM[i] == valueNumber || pricesV[i] == valueNumber) {
                        console.log(i);
                        namesSearch.push(names[i]);
                        pricesMSearch.push(pricesM[i]);
                        pricesVSearch.push(pricesV[i]);
                        pricesNumSearch.push(pricesNum[i]);
                        imagesSearch.push(images[i]);
                        ingredientsSearch.push(ingredients[i]);
                    }
                }
            }
            else {
                for (var i = 0; i < names.length; i++) {
                    if (names[i].toLowerCase().includes(value)) {
                        console.log(i);
                        namesSearch.push(names[i]);
                        pricesMSearch.push(pricesM[i]);
                        pricesVSearch.push(pricesV[i]);
                        pricesNumSearch.push(pricesNum[i]);
                        imagesSearch.push(images[i]);
                        ingredientsSearch.push(ingredients[i]);
                    }
                }
            }

            removeAllElements();
            setRow(namesSearch, pricesMSearch, pricesVSearch, imagesSearch, ingredientsSearch);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var dropdowns = document.querySelectorAll('.dropdown, .dropdown-submenu');
        dropdowns.forEach(function (dropdown) {
            dropdown.addEventListener('mouseenter', function () {
                var menu = this.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.add('show');
                }
            });
            dropdown.addEventListener('mouseleave', function () {
                var menu = this.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.remove('show');
                }
            });
        });
    });
});

function setRow(names, pricesM, pricesV, images, ingredients) {
	// // dodatak pocetak
	var ocene = JSON.parse(localStorage.getItem('ocene')) || [];
	dateocene ={};

	for (var i = 0; i < ocene.length; i++) {
		var name=ocene[i].name[langindex];
		dateocene[name] = Math.round((Number(ocene[i].zbir) / Number(ocene[i].koliko))*10)/10;
	}
	// dodatak kraj
    var table = document.getElementById('myTable');
    for (var i = 0; i < names.length; i++) {
        if (i % 3 == 0) {
            var tr = document.createElement('tr');
        }
        
        var kol1 = document.createElement('td');
        var kol2 = document.createElement('td');
        var kol3 = document.createElement('td');

        var cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        var imgElem = document.createElement('img');
        imgElem.src = images[i];

        var cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        var titleElem = document.createElement('h4');
        titleElem.className = 'card-title';

        var priceElem = document.createElement('div');
        priceElem.className = 'card-price';

        var ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'card-ingridient';
        
        var ingredientLabel = document.createElement('label');
        ingredientLabel.textContent = ingredients[i];

        var nameLabel = document.createElement('label');
        nameLabel.textContent = names[i];
		
		
		var priceDiv1 = document.createElement('div');
		if(langindex==1)
			priceDiv1.textContent = 'S ' + pricesM[i];
		else
			priceDiv1.textContent = 'M ' + pricesM[i];

        var priceDiv2 = document.createElement('div');
		if(langindex==1)
			priceDiv2.textContent = 'B ' + pricesV[i];
		else
			priceDiv2.textContent = 'V ' + pricesV[i];
				// dodatak pocetak
		
		// LABELA ZA PRIKAZ PROSECNE OCENE
		var OceniDiv = document.createElement('div');
		var procecnaocena = document.createElement('label');
		
        //dodato
        procecnaocena.classList.add("procecnaocena");
		
        var tekst = document.createElement('tekst');
        tekst.classList.add("tekst");
        var tekstValue = document.createElement('tekstValue');
        tekstValue.classList.add("tekstValue");

		if (names[i].length>0 &&names[i] in dateocene)
		{	// ako ima prosena ocena za ovo jelo, prikAZUJEMO JE 
            tekstValue.textContent = dateocene[names[i]];
			if (langindex==0)
				tekst.textContent = 'Prosečna ocena: ';
			else
            tekst.textContent = 'Average rate: ';
		}
		// combo
		procecnaocena.appendChild(tekst);
		procecnaocena.appendChild(tekstValue);
        
        OceniDiv.classList.add("OceniDiv");
		var sltOceni = document.createElement('select');
        sltOceni.classList.add("sltOceni");

        var sltOceniTekst = document.createElement('div');
        sltOceniTekst.classList.add("sltOceniTekst");
		if(langindex==1)
			sltOceniTekst.textContent = "Enter grade: ";
		else
			sltOceniTekst.textContent = "Unesite ocenu: ";

        var divSltOceni = document.createElement('div');
        divSltOceni.classList.add("divSltOceni");
        divSltOceni.append(sltOceniTekst);
        divSltOceni.append(sltOceni);
        //dodato
		
		// popunjavamo combo
		for(var j=1;j<=5;j++)
		{
			optionElement = document.createElement("option");
			optionElement.value = j;
			optionElement.text = j;
			sltOceni.appendChild(optionElement);
		}
		// dodajemo funkicju na izvbor iz combo-a
		sltOceni.id = 'sltOceni' + i;
		(function(index){sltOceni.addEventListener('change',
			function() { oceni(index, 'sltOceni' + index);}
			);
		})(i);
		
		// div gde cemo da stavimo dugme i combo
		var NaruciDiv = document.createElement('div');

		;
		// dugme
		var btnKupi = document.createElement('button');
		btnKupi.className = 'btn-purchase';
		if(langindex==1)
			btnKupi.textContent = 'Buy';
		else
			btnKupi.textContent = 'Kupi';
		// dodajemo funkciju onClick
		(function(index){
			btnKupi.onclick = function() {
                var korisnik = JSON.parse(localStorage.getItem('korisnik'));
                if (korisnik == '') {
					if(langindex==1)
					{
						window.alert('You have to be logged in to add a meal to your order');
						window.location.href = "prijavljivanje_engleski.html";
					}
					else{
						alert('Morate se ulogovati da biste dodali jelo u porudžbinu!');
						window.location.href = "prijavljivanje_srpski.html";
					}
                    return;
                }
				naruci(index);
			};
		})(i);
		// dodajemo laBELU, dugme i combo u div
		OceniDiv.appendChild(procecnaocena);
		OceniDiv.appendChild(divSltOceni); //dodato
		NaruciDiv.appendChild(btnKupi);
		
		
		// dodatak kraj
		

        titleElem.appendChild(nameLabel);
        priceElem.appendChild(priceDiv1);
        priceElem.appendChild(priceDiv2);
        ingredientDiv.appendChild(ingredientLabel);
        //dodatak
        var hrElement = document.createElement('hr');
        hrElement.style.width = '100%';
        hrElement.style.borderTop = '2px solid black';
        ingredientDiv.appendChild(hrElement);
        //kraj dodatak
        cardBodyDiv.appendChild(titleElem);
        cardBodyDiv.appendChild(priceElem);
        cardBodyDiv.appendChild(ingredientDiv);
		// dodatak pocetak
		// dodajemo div na parent
		cardBodyDiv.appendChild(OceniDiv);
		cardBodyDiv.appendChild(NaruciDiv);
		// dodatak kraj
        cardDiv.appendChild(imgElem);
        cardDiv.appendChild(cardBodyDiv);

        if (i % 3 == 0) {
            kol1.appendChild(cardDiv);
            tr.appendChild(kol1);
        } else if (i % 3 == 1) {
            kol2.appendChild(cardDiv);
            tr.appendChild(kol2);
        } else {
            kol3.appendChild(cardDiv);
            tr.appendChild(kol3);
            table.appendChild(tr);
        }
    }

    if (names.length % 3 != 0) {
        table.appendChild(tr);
    }
}

function removeAllElements() {
    var table = document.getElementById('myTable');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function swapElements(i, min_i) {
    var tempName = names[min_i];
    names[min_i] = names[i];
    names[i] = tempName;

    var tempPrice = pricesM[min_i];
    pricesM[min_i] = pricesM[i];
    pricesM[i] = tempPrice;

    var tempPrice = pricesV[min_i];
    pricesV[min_i] = pricesV[i];
    pricesV[i] = tempPrice;

    var tempImage = images[min_i];
    images[min_i] = images[i];
    images[i] = tempImage;

    var tempNum = pricesNum[min_i];
    pricesNum[min_i] = pricesNum[i];
    pricesNum[i] = tempNum;
}

function nazivAsc() {
    var min_i;
    for (var i = 0; i < names.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < names.length; j++) {
            if (names[j] < names[min_i]) {
                min_i = j;
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function nazivAscCenaAsc() {
    var min_i;
    for (var i = 0; i < names.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < names.length; j++) {
            if (names[j] < names[min_i]) {
                min_i = j;
            }
            else if (names[j] == names[min_i]) {
                if (pricesNum[j] < pricesNum[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function nazivAscCenaDesc() {
    var min_i;
    for (var i = 0; i < names.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < names.length; j++) {
            if (names[j] < names[min_i]) {
                min_i = j;
            }
            else if (names[j] == names[min_i]) {
                if (pricesNum[j] > pricesNum[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function nazivDesc() {
    var min_i;
    for (var i = 0; i < names.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < names.length; j++) {
            if (names[j] > names[min_i]) {
                min_i = j;
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function nazivDescCenaAsc() {
    var min_i;
    for (var i = 0; i < names.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < names.length; j++) {
            if (names[j] > names[min_i]) {
                min_i = j;
            }
            else if (names[j] == names[min_i]) {
                if (pricesNum[j] < pricesNum[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function nazivDescCenaDesc() {
    var min_i;
    for (var i = 0; i < names.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < names.length; j++) {
            if (names[j] > names[min_i]) {
                min_i = j;
            }
            else if (names[j] == names[min_i]) {
                if (pricesNum[j] > pricesNum[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function cenaAsc() {
    var min_i;
    for (var i = 0; i < pricesNum.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < pricesNum.length; j++) {
            if (pricesNum[j] < pricesNum[min_i]) {
                min_i = j;
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function cenaAscNazivAsc() {
    var min_i;
    for (var i = 0; i < pricesNum.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < pricesNum.length; j++) {
            if (pricesNum[j] < pricesNum[min_i]) {
                min_i = j;
            }
            else if (pricesNum[j] == pricesNum[min_i]) {
                if (names[j] < names[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function cenaAscNazivDesc() {
    var min_i;
    for (var i = 0; i < pricesNum.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < pricesNum.length; j++) {
            if (pricesNum[j] < pricesNum[min_i]) {
                min_i = j;
            }
            else if (pricesNum[j] == pricesNum[min_i]) {
                if (names[j] > names[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function cenaDesc() {
    var min_i;
    for (var i = 0; i < pricesNum.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < pricesNum.length; j++) {
            if (pricesNum[j] > pricesNum[min_i]) {
                min_i = j;
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function cenaDescNazivAsc() {
    var min_i;
    for (var i = 0; i < pricesNum.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < pricesNum.length; j++) {
            if (pricesNum[j] > pricesNum[min_i]) {
                min_i = j;
            }
            else if (pricesNum[j] == pricesNum[min_i]) {
                if (names[j] < names[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}

function cenaDescNazivDesc() {
    var min_i;
    for (var i = 0; i < pricesNum.length - 1; i++) {
        min_i = i;
        for (var j = i + 1; j < pricesNum.length; j++) {
            if (pricesNum[j] > pricesNum[min_i]) {
                min_i = j;
            }
            else if (pricesNum[j] == pricesNum[min_i]) {
                if (names[j] > names[min_i]) {
                    min_i = j;
                }
            }
        }

        if (min_i != i) {
            swapElements(i, min_i);
        }
    }
}


// dodatak pocetak


function proveri()
{
	var korisnik = JSON.parse(localStorage.getItem('korisnik')) || '';
	if ( korisnik=='')
	{
		if(langindex==1)
			window.alert('You have to be logged in for this function');
		else
			window.alert('Morate se ulogovati za ovu funkcionalnost');
		return false;
	}
	return true;
}

function naruci(index)
{
	if (! proveri())
		return;
	var tekucikorisnik = JSON.parse(localStorage.getItem('korisnik')) || '';
	var narudzbine = JSON.parse(localStorage.getItem('narudzbine')) || [];
	narudzbine.push({korisnik: tekucikorisnik, name: names_lang[index], priceM: pricesM[index], priceV: pricesV[index],priceNum: pricesNum[index], image: images[index],ingredients: ingredients_lang[index], koliko : 1 });
	localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
	if(langindex==1)
		window.alert('Order added');
	else
		window.alert('Narudzbina je dodata');
}

function oceni(index,id)
{
	if (! proveri())
		return;
	var novizbir= Number(document.getElementById(id).value);
	var novikoliko=1;
	var ocene = JSON.parse(localStorage.getItem('ocene')) || [];
	
	for (var i = 0; i < ocene.length; i++) {
		if ( ocene[i].name[langindex]==names[index])
		{
			novizbir = novizbir + Number(ocene[i].zbir);
			novikoliko = novikoliko +  Number(ocene[i].koliko) ;
			
			ocene[i].zbir=novizbir;
			ocene[i].koliko=novikoliko;
			localStorage.setItem('ocene', JSON.stringify(ocene));
			if(langindex==1)
				window.alert('Grade added');
			else
				window.alert('Ocena je dodata');
			location.reload(true);
			return;
		}
	}
	
	ocene.push( {name: names_lang[index], priceM: pricesM[index], priceV: pricesV[index],priceNum: pricesNum[index], image: images[index],ingredient: ingredients_lang[index], zbir: novizbir, koliko: novikoliko });
	localStorage.setItem('ocene', JSON.stringify(ocene));
	if(langindex==1)
		window.alert('Grade added');
	else
		window.alert('Ocena je dodata');
	location.reload(true);
		
}
// dodatak KRAJ