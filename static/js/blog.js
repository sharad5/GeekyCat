var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

function contactme(){
 $('#myModal').modal('toggle'); 
}

$(document).ready(function () {
    $("button#submit").click(function(){
        document.getElementById("submit").class="btn btn-success disabled"
        console.log($("form#contactme").serialize());
        var arr = {"name":$("input.myname").val(),"email":$("input.myemail").val(),"message":$("textarea.mymessage").val()}
        $.ajax({
            type: "POST",
            url: "/contact/", //process to mail
            data: JSON.stringify(arr),
            contentType: 'application/json; charset=utf-8',
            success: function(msg){
                $('#myModal').modal('toggle');
                $('#thanx').modal('toggle');
            },
            error: function(){
                alert("Could not send Email. Kindly Send the email at sharaddargan@gmail.com");
            }
        });
    });
});