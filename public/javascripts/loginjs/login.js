$(document).ready(function () {
    
    $("#form-1").submit(function (e) {
        e.preventDefault();
    });
    $(".resgiter").click(function () {
        $(this).addClass("active");
        $("#form-1").removeClass("hide-show");
        $(".login").removeClass("active");
        $("#form-2").addClass("hide-show");
    });
    $(".login").click(function () {
        $(this).addClass("active");
        $("#form-2").removeClass("hide-show");
        $(".resgiter").removeClass("active");
        $("#form-1").addClass("hide-show");
    });
    // xử lí lỗi resgiter
    $("#fullname").blur(function () {
        if ($("#fullname").val() == "") {
            $(this).next().text("Please enter this field");
        } else {
            $(this).next().text("");
        }
    });
    $("#fullname").keyup(function () {
        $(this).next().text("");
    });
    $("#email").blur(function () {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                $("#email").val()
            )
        ) {
            $(this).next().text("");
        } else {
            $(this).next().text("This field must be email");
        }
    });
    $("#email").keyup(function () {
        $(this).next().text("");
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
        if ($("#fullname").val() == "") {
            $("#fullname").next().text("Please enter this field");
        } else {
            $("#fullname").next().text("");
        }
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                $("#email").val()
            )
        ) {
            $("#email").next().text("");
        } else {
            $("#email").next().text("This field must be email");
        }
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
            $("#fullname").next().text() == "" &&
            $("#email").next().text() == "" &&
            $("#password").next().text() == "" &&
            $("#password_confirmation").next().text() == "";
        if (boolean) {
            let data = $("form[id=form-1]").serializeArray();
            let dataObj = {};
            data.forEach((item) => {
                dataObj[item.name] = item.value;
            });
            console.log(dataObj);
            $.post("/login/register", dataObj)
                .then((resData) => {
                    if (resData.err) {
                        $("#email").next().text(resData.err);
                    } else {
                        $("#exampleModal").modal("show");
                        $(".login").addClass("active");
                        $("#form-2").removeClass("hide-show");
                        $(".resgiter").removeClass("active");
                        $("#form-1").addClass("hide-show");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    // xử lí lỗi login
    $("#fullname-1").blur(function () {
        if ($("#fullname-1").val() == "") {
            $(this).next().text("Please enter this field");
        } else {
            $(this).next().text("");
        }
    });
    $("#fullname-1").keyup(function () {
        $(this).next().text("");
    });
    $("#email-1").blur(function () {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                $("#email-1").val()
            )
        ) {
            $(this).next().text("");
        } else {
            $(this).next().text("This field must be email");
        }
    });
    $("#email-1").keyup(function () {
        $(this).next().text("");
    });
    $("#password-1").blur(function () {
        if ($("#password-1").val() == "") {
            $(this).next().text("Please enter this field");
        } else {
            $(this).next().text("");
        }
    });
    $("#password-1").keyup(function () {
        $(this).next().text("");
    });
    $(".form-submit-1").click(function () {
        if ($("#fullname-1").val() == "") {
            $("#fullname-1").next().text("Please enter this field");
        } else {
            $("#fullname-1").next().text("");
        }
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                $("#email-1").val()
            )
        ) {
            $("#email-1").next().text("");
        } else {
            $("#email-1").next().text("This field must be email");
        }
        if ($("#password-1").val() == "") {
            $("#password-1").next().text("Please enter this field");
        } else {
            $("#password-1").next().text("");
        }
    });
});
