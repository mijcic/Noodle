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

var stranica = window.location.pathname.split("/").pop();
var langindex;
if (stranica.includes('engleski'))
	langindex=1;
else
	langindex=0;




$(document).ready(function() {
    var dugme = document.getElementById('dugme');
    dugme.addEventListener('click', function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        passwordAgain = document.getElementById('password-again').value;

        var korisnici = JSON.parse(localStorage.getItem('korisnici')) || [];
        var users = [];
        for (var i = 0; i < korisnici.length; i++) {
            users.push(korisnici[i]['username']);
        }

        if (username == '') {
			if(langindex==1)
				alert('You have to enter username!');
			else
				alert('Morate uneti korisničko ime!');
            resetAll();
            return;
        }
        else if (password != passwordAgain) {
			if(langindex==1)
				alert('Passwords do not match!');
			else
				alert('Lozinke se ne podudaraju!');
            resetAll();
            return;
        } 
        else if (users.includes(username)) {
			if(langindex==1)
				alert('Username already taken!');
			else
				alert('Korisnicko ime je već zauzeto!');
            resetAll();
            return;
        }
        
        korisnici.push({username: username, password: password});
        localStorage.setItem('korisnici', JSON.stringify(korisnici));
		if(langindex==1)
			window.location.href = "prijavljivanje_engleski.html";
		else
			window.location.href = "prijavljivanje_srpski.html";
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

function resetAll() {
    var username = document.getElementById('username');
    username.value = "";
    var password = document.getElementById('password');
    password.value = "";
    var passwordAgain = document.getElementById('password-again');
    passwordAgain.value = "";
}