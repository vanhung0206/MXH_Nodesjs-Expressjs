$(document).ready(function () {
    
    $("#form-1").submit(function (e) {
        e.preventDefault();
    });
    
    $("#password").blur(function () {
        if ($("#password").val() == "") {
            $(this).next().text("Please enter this field");
        } else {
            $(this).next().text("");
        }
    });
    $("#password").keyup(function () {
        $(this).next().text("");
    });
    $("#password_confirmation").blur(function () {
        if ($("#password_confirmation").val() == "") {
            $(this).next().text("Please enter this field");
        } else {
            $(this).next().text("");
        }
    });
    $("#password_confirmation").keyup(function () {
        if ($(this).val() !== $("#password").val()) {
            $(this).next().text("Don't match with password");
        } else {
            $(this).next().text("");
        }
    });
    $(".form-submit").click(function (e) {
        if ($("#password").val() == "") {
            $("#password").next().text("Please enter this field");
        } else {
            $("#password").next().text("");
        }
        if ($("#password_confirmation").val() == "") {
            $("#password_confirmation").next().text("Please enter this field");
        } else {
            if ($("#password_confirmation").val() == $("#password").val()) {
                $("#password_confirmation").next().text("");
            } else {
                $("#password_confirmation").next().text("Password not correct");
            }
        }
        var boolean =
            $("#password").next().text() == "" &&
            $("#password_confirmation").next().text() == "";
        if (boolean) {
            $('form').unbind('submit').submit();
        }
    });
});
