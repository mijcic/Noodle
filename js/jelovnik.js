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





function goToPredjela() {
    window.location.href = "predjela_srpski.html";
}

function goToGlavnaJela() {
    window.location.href = "glavna_jela_srpski.html";
}

function goToDezerti() {
    window.location.href = "dezerti_srpski.html";
}

function goToPredjela_eng() {
    window.location.href = "predjela_engleski.html";
}

function goToGlavnaJela_eng() {
    window.location.href = "glavna_jela_engleski.html";
}

function goToDezerti_eng() {
    window.location.href = "dezerti_engleski.html";
}