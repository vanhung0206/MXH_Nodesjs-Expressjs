$(document).ready(function () {
    // Chuyển đổi nav
    var btn = $(".header-icon-slide-menu");
    btn.click(function () {
        $(".nav-long").toggleClass("hide-show");
        $(".nav-long").toggleClass("delay");
        $(".nav-short").toggleClass("hide-show-1");
        $(".nav-short").toggleClass("delay");
        $(".content").toggleClass("content-warp");
    });
    // Like
    $(".content-action.content-action__react").click(function () {
        $(this).toggleClass("color-blue");
    });
    $(".members-filters__grids-icon").click(function () {
        $(".members-filters__grids-icon").removeClass("active");
        $(this).addClass("active");
    });
    $(".big-grid").click(function () {
        $(".members .list-members").children().addClass("col-lg-4");
    });
    $(".small-grid").click(function () {
        $(".members .list-members").children().removeClass();
        $(".members .list-members").children().addClass("col-lg-3");
    });
    // Focus Iput
    $(".members .members-filters__input").focus(function () {
        $(".members-filters__placeholder").css("top", "-14px");
    });
    $(".members .members-filters__input").focusout(function () {
        if (!$(this).val())
            $(".members-filters__placeholder").css("top", "8px");
    });

    // sort Member

    var mylist = $(".members .list-members__name-link");
    var listitems = mylist.children(".members .list-members__name");
    listitems.sort(function (a, b) {
        return $(a)
            .text()
            .toUpperCase()
            .localeCompare($(b).text().toUpperCase());
    });
    listitems.each(function () {
        $(".members .list-members").append(
            $(this).parent().parent().parent().parent()
        );
    });
    $(".members-filters__section").change(function () {
        var chose = $(this).find(":selected").val();
        if (chose == 1) {
            var mylist = $(".members .list-members__name-link");
            var listitems = mylist.children(".members .list-members__name");
            listitems.sort(function (a, b) {
                return $(a)
                    .text()
                    .toUpperCase()
                    .localeCompare($(b).text().toUpperCase());
            });
            listitems.each(function () {
                $(".members .list-members").append(
                    $(this).parent().parent().parent().parent()
                );
            });
        }
        if (chose == 2) {
            var mylist = $(".members .list-members__post");
            var listitems = mylist.children(".members .posts-numbers");
            listitems.sort(function (a, b) {
                return +$(b).text() - +$(a).text();
            });
            listitems.each(function () {
                $(".members .list-members").append(
                    $(this).parent().parent().parent().parent()
                );
            });
        }
        if (chose == 3) {
            var mylist = $(".members .list-members__post");
            var listitems = mylist.children(".members .number-friend");
            listitems.sort(function (a, b) {
                return +$(b).text() - +$(a).text();
            });
            listitems.each(function () {
                $(".members .list-members").append(
                    $(this).parent().parent().parent().parent()
                );
            });
        }
    });
    //Chuyển đổi các trang trên thanh nav

    //   hiện trang chi tiết các nhân

    // Trang group
    $(".nav-short__item-groups").click(function () {
        $(".main").addClass("hidden");
        $(".groups").removeClass("hidden");
        $(".nav-short__item").removeClass("nav-short__item--active");
        $(this).addClass("nav-short__item--active");
        $(".nav-long__item").removeClass("nav-long__item--active");
        $(".nav-long__item-groups").addClass("nav-long__item--active");
        $("html").animate(
            {
                scrollTop: 0,
            },
            800
        );
    });
    $(".nav-long__item-groups").click(function () {
        $(".main").addClass("hidden");
        $(".groups").removeClass("hidden");
        $(".nav-long__item").removeClass("nav-long__item--active");
        $(this).addClass("nav-long__item--active");
        $(".nav-short__item").removeClass("nav-short__item--active");
        $(".nav-short__item-groups").addClass("nav-short__item--active");
        $("html").animate(
            {
                scrollTop: 0,
            },
            800
        );
    });
    // Lọc, sắp xếp tìm kiếm trang groups

    // Focus Input
    $(".groups .groups-filters__input").focus(function () {
        $(".groups .groups-filters__placeholder").css("top", "-14px");
    });
    $(".groups .groups-filters__input").focusout(function () {
        if (!$(this).val()) $(".groups-filters__placeholder").css("top", "8px");
    });

    // Seach
    $(".groups .groups-filters__input").on("keyup", function () {
        var values = $(this).val().toLowerCase();
        $(".groups .list-groups__member")
            .parent()
            .filter(function () {
                $(this).toggle(
                    $(this)
                        .children()
                        .children(".list-groups__info")
                        .text()
                        .toLowerCase()
                        .indexOf(values) > -1
                );

                if (
                    $(this)
                        .children()
                        .children(".list-groups__info")
                        .text()
                        .toLowerCase()
                        .indexOf(values) > -1
                ) {
                    $(this).unhighlight();
                    $(this)
                        .children()
                        .children(".list-groups__info")
                        .highlight(values);
                    return true;
                } else return false;
            });
    });

    // Lưới
    $(".groups-filters__grids-icon").click(function () {
        $(".groups-filters__grids-icon").removeClass("active");
        $(this).addClass("active");
    });
    $(".big-grid").click(function () {
        $(".groups .list-groups").children().addClass("col-lg-4");
    });
    $(".small-grid").click(function () {
        $(".groups .list-groups").children().removeClass();
        $(".groups .list-groups").children().addClass("col-lg-3");
    });
    // scroll header
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 50) {
            $(".btn-top").css("display", "flex");
        } else {
            $(".btn-top").css("display", "none");
        }
    });
    $(".btn-top").click(function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // hiển thị menu

    var idPage = $(".content").children().attr("id");
    var iconNavShort = $(`.nav-short__item-${idPage}`);
    var iconNavLong = $(`.nav-long__item-${idPage}`);
    iconNavShort.addClass("nav-short__item--active");
    iconNavLong.addClass("nav-long__item--active");
});
