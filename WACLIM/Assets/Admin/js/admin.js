jQuery(document).ready(function ($) {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


    $('.search-toggle').on('click', e => {
        $('.search-box, .search-input').toggleClass('active');
        $('.search-input input').focus();
        e.preventDefault();
    });


    //SIDEBAR
    $('.sidebar .sidebar-menu li a').on('click', function () {
        const $this = $(this);

        if ($this.parent().hasClass('open')) {
            $this
                .parent()
                .children('.dropdown-menu')
                .slideUp(200, () => {
                    $this.parent().removeClass('open');
                });
        } else {
            $this
                .parent()
                .parent()
                .children('li.open')
                .children('.dropdown-menu')
                .slideUp(200);

            $this
                .parent()
                .parent()
                .children('li.open')
                .children('a')
                .removeClass('open');

            $this
                .parent()
                .parent()
                .children('li.open')
                .removeClass('open');

            $this
                .parent()
                .children('.dropdown-menu')
                .slideDown(200, () => {
                    $this.parent().addClass('open');
                });
        }
    });

    const sidebarLinks = $('.sidebar').find('.sidebar-link');

    sidebarLinks
        .each((index, el) => {
            $(el).removeClass('active');
        })
        .filter(function () {
            const href = $(this).attr('href');
            const pattern = href[0] === '/' ? href.substr(1) : href;
            return pattern === (window.location.pathname).substr(1);
        })
        .addClass('active');

    $('.sidebar-toggle').on('click', e => {
        $('.app').toggleClass('is-collapsed');
        e.preventDefault();
    });

    $('#sidebar-toggle').click(e => {
        e.preventDefault();
        setTimeout(() => {
            window.dispatchEvent(window.EVENT);
        }, 300);
    });


    $('.datepicker').datepicker();

    $('.datepicker').on('changeDate', function (ev) {
        $(this).datepicker('hide');
    });

    const scrollables = $('.scrollable');
    if (scrollables.length > 0) {
        scrollables.each((index, el) => {
            new PerfectScrollbar(el);
        });
    }

    $('.list-view-custom .peers').click(function (e) {
        e.preventDefault();
        $that = $(this);
        $that.parent().find('.peers').removeClass('active').addClass('bgcH-grey-50');
        $that.addClass('active').removeClass('bgcH-grey-50');
    });


    $('.card-columns .card-select').click(function (e) {
        e.stopPropagation();
        $that = $(this);
        $that.parent().find('.card-select').removeClass('selected');
        $that.addClass('selected');
    });

    $(window).click(function () {
        $('.card-columns').find('.card-select').removeClass('selected');
    });

})