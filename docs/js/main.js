$('table').removeClass('table-striped table-hover')
$('table').addClass('table-bordered')

$('button.close').click(function () {
     $("#support_us").slideUp("slow");
})

function support_us() {
    $("#support_us").slideDown("slow");
}

setInterval(support_us, 300000)