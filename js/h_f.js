$(window).ready(function (e) {
  const header = document.getElementsByTagName("header")[0];
  const nav = document.getElementsByTagName("nav")[0];
  const logo = document.getElementsByClassName("logo")[0];
  const gnb_r = document.getElementsByClassName("gnb_r")[0];
  let s_top = 0;

  let url = location.href;
  url = url.split("picogram/")[1];
  url = url.split("?")[0];

  if (url == "index.html" || url == "second.html" || url == "") {
    header.addEventListener("mouseenter", function () {
      nav.classList.add("nav_active");
    });
    header.addEventListener("mouseleave", function () {
      nav.classList.remove("nav_active");
    });

    // 스크롤 이벤트
    window.addEventListener("scroll", function () {
      s_top = window.scrollY;

      if (s_top >= 0) {
        header.classList.add("header_active");
        logo.classList.add("logo_active");
        gnb_r.children[1].classList.add("gnb_r_active");
        gnb_r.children[2].classList.add("gnb_r_active");
      }
      if (s_top == 0) {
        header.classList.remove("header_active");
        logo.classList.remove("logo_active");
        gnb_r.children[1].classList.remove("gnb_r_active");
        gnb_r.children[2].classList.remove("gnb_r_active");
      }
    });
  } else if (url == "third.html") {
    header.addEventListener("mouseenter", function () {
      nav.classList.add("nav_active");
      nav.classList.add("t_active");
    });
    header.addEventListener("mouseleave", function () {
      nav.classList.remove("nav_active");
      nav.classList.remove("t_active");
    });
  } else {
    const btn_bugger = document.getElementById("bugger");
    const b_line = document.getElementsByClassName("line");
    let bugger_menu_chk = false;
    const bugger_pan = document.getElementById("bugger_pan");
    const gnb = document.getElementsByClassName("gnb_in")[0];
    const gnb_in = document.getElementsByClassName("gnb_in");
    const menu = document.getElementsByClassName("menu");

    btn_bugger.addEventListener("click", function () {
      if (!bugger_menu_chk) {
        bugger_pan.style.left = "0%";
        b_line[0].style.transform = "rotate(45deg) translateY(10px)";
        b_line[0].style.width = 100 + "%";
        b_line[1].style.transform = "rotate(-45deg) translateY(-9px)";
        bugger_menu_chk = true;
      } else {
        bugger_pan.style.left = "-100%";
        b_line[0].style.transform = "rotate(0) translateY(0)";
        b_line[0].style.width = 70 + "%";
        b_line[1].style.transform = "rotate(0) translateY(0)";
        bugger_menu_chk = false;
      }
    });

    for (let i = 0; i < gnb_in.length; i++) {
      gnb_in[i].addEventListener("click", function () {
        for (let j = 0; j < menu.length; j++) {
          menu[j].style.display = "none";
        }
        this.children[0].style.display = "block";
      });
    }
  }
});
