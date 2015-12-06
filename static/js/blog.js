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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

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