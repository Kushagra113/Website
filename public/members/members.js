$(document).find('.button, .close').on('click', function (e) {
    e.preventDefault();
    $(document).find("#update_string").toggleClass("d-none");
    $(document).find('.detail, html, body').toggleClass('open');
});