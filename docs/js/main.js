$(function () {
    $('table').removeClass('table-striped table-hover')
    $('table').addClass('table-bordered')
    $('button.close').click(function () {
        $("#ads").slideUp("slow");
    })

    function ads() {
        $("#ads").slideDown("slow");
    }

    setInterval(ads, 300000)
    // setInterval(ads, 2000)
    // 滚动公告start
    var num = $(".ul").find("li").length;
    if (num > 1) {
        setInterval(function () {
            $('.ul').animate({
                marginTop: "-30px"
            }, 500, function () {
                $(this).css({marginTop: "0"}).find("li:first").appendTo(this);
            });
        }, 4000);
    }
    // 滚动公告stop
})