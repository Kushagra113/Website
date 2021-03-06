$(document).find('.button, .close').on('click', function (e) {
    e.preventDefault();
    $(document).find('.detail, html, body').toggleClass('open');
});