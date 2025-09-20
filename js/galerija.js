
					
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

$(document).ready(function() {
    //Za prikazivanje prve u carousel-u1
    var carousel1Div = document.getElementsByClassName("carousel-inner")[0];
    var divItem = document.createElement('div');
    divItem.className = 'carousel-item active';

    var imgCarousel = document.createElement('img');
    imgCarousel.src = photosInCarousel1[0];
    imgCarousel.className="d-block w-100";
    divItem.appendChild(imgCarousel);

    carousel1Div.appendChild(divItem);
	
	//Za prikazivanje prve u carousel-u2
	var carousel2Div = document.getElementsByClassName("carousel-inner")[1];
    var divItem = document.createElement('div');
    divItem.className = 'carousel-item active';

    var imgCarousel = document.createElement('img');
    imgCarousel.src = photosInCarousel2[0];
    imgCarousel.className="d-block w-100";
    divItem.appendChild(imgCarousel);

    carousel2Div.appendChild(divItem);
	
});

let currentPhoto1 = 0;
photosInCarousel1 = ['slike/galerija_slika1.jpg', 'slike/galerija_slika2.jpeg', 'slike/galerija_slika3.jpeg'];
let currentPhoto2 = 0;
photosInCarousel2 = ['slike/galerija_slika4.jpeg', 'slike/galerija_slika5.jpg', 'slike/galerija_slika6.jpg', 
                    'slike/galerija_slika7.jpg', 'slike/galerija_slika8.jpg'];

    function prvolevo(){
        var carousel1Div = document.getElementsByClassName("carousel-inner")[0];
		var proslidiv = document.getElementsByClassName("carousel-item active")[0];
		carousel1Div.removeChild(proslidiv);
        var divItem = document.createElement('div');
        divItem.className = 'carousel-item active';

        if (currentPhoto1 == 0) currentPhoto1 = 2;
        else currentPhoto1 = (currentPhoto1 - 1) % 3;

        var imgCarousel = document.createElement('img');
        imgCarousel.src = photosInCarousel1[currentPhoto1];
        imgCarousel.className="d-block w-100";
        divItem.appendChild(imgCarousel);

        carousel1Div.appendChild(divItem);
    }

	function prvodesno(){
        var carousel1Div = document.getElementsByClassName("carousel-inner")[0];
		var proslidiv = document.getElementsByClassName("carousel-item active")[0];
		carousel1Div.removeChild(proslidiv);
        var divItem = document.createElement('div');
        divItem.className = 'carousel-item active';

        currentPhoto1 = (currentPhoto1 + 1) % 3;

        var imgCarousel = document.createElement('img');
        imgCarousel.src = photosInCarousel1[currentPhoto1];
        imgCarousel.className="d-block w-100";
        divItem.appendChild(imgCarousel);

        carousel1Div.appendChild(divItem);
    }


   function drugolevo(){
        var carousel2Div = document.getElementsByClassName("carousel-inner")[1];
		var proslidiv = document.getElementsByClassName("carousel-item active")[1];
		carousel2Div.removeChild(proslidiv);
        var divItem = document.createElement('div');
        divItem.className = 'carousel-item active';

        if (currentPhoto2 == 0) currentPhoto2 = 4;
        else currentPhoto2 = (currentPhoto2 - 1) % 5;

        var imgCarousel = document.createElement('img');
        imgCarousel.src = photosInCarousel2[currentPhoto2];
        imgCarousel.className="d-block w-100";
        divItem.appendChild(imgCarousel);

        carousel2Div.appendChild(divItem);
    }

    function drugodesno() {
        var carousel2Div = document.getElementsByClassName("carousel-inner")[1];
		var proslidiv = document.getElementsByClassName("carousel-item active")[1];
		carousel2Div.removeChild(proslidiv);
        var divItem = document.createElement('div');
        divItem.className = 'carousel-item active';

        currentPhoto2 = (currentPhoto2 + 1) % 5;

        var imgCarousel = document.createElement('img');
        imgCarousel.src = photosInCarousel2[currentPhoto2];
        imgCarousel.className="d-block w-100";
        divItem.appendChild(imgCarousel);

        carousel2Div.appendChild(divItem);
    } 