$(document).ready(function () {
  const header = document.getElementsByTagName("header")[0];
  const main = document.getElementsByTagName("main")[0];
  const sec = document.getElementsByTagName("section");
  const logo = document.getElementsByClassName("logo")[0];

  let move_1 = document.getElementsByClassName("move_1");
  let move_2 = document.getElementsByClassName("move_2");
  let move_3 = document.getElementsByClassName("move_3");
  let mission_txt = document.getElementsByClassName("mission_txt");
  let move = document.getElementsByClassName("move");
  let logo_img = document.getElementsByClassName("logo_img");
  let eco_move = document.getElementsByClassName("eco_move");
  let c_b_move = document.getElementsByClassName("c_b_move");
  const line = document.getElementById("line");
  const el_move = [move_1, move_2, move_3, mission_txt, eco_move, c_b_move];

  let o_left = [];
  let main_wid = window.innerWidth * sec.length - 1;
  document.body.style.height = main_wid + "px";
  main.style.width = main_wid + "px";

  window.addEventListener("resize", function () {
    o_left = [];

    for (let i = 0; i < sec.length; i++) {
      o_left[i] = sec[i].offsetLeft;
    }
  });

  for (let i = 0; i < sec.length; i++) {
    o_left[i] = sec[i].offsetLeft;
  }

  let sec_chk = false;
  let sec_count = sec.length;

  let nt_index = 0;
  let pv_index = 0;
  let line_wid = 100 / sec.length;

  let pv_left = 0;
  let nt_left = 0;

  function getElementIndex(element, range) {
    // 추가
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
  }

  $("section").on("mousewheel DOMMouseScroll", function () {
    bang = getElementIndex(document.querySelectorAll("section"), this);

    if (!sec_chk) {
      sec_chk = true;
      setTimeout(function () {
        sec_chk = false;
      }, 500);

      let delta = event.wheelDelta;
      pv_left = -1 * o_left[bang - 1];
      nt_left = -1 * o_left[bang + 1];

      nt_index = sec_count - (bang + 1);
      pv_index = Math.abs(sec_count - bang);

      if (delta < 0 && nt_index > 0) {
        main.style.left = nt_left + "px";
        head_color(bang + 1);
        for (let j = 0; j < sec.length; j++) {
          if (bang == j) {
            act_move(el_move[j], bang);
          }
        }
        line.style.width = (bang + 1) * line_wid + "%";
      } else if (delta > 0 && pv_index > 0) {
        main.style.left = pv_left + "px";
        head_color(bang - 1);
        line.style.width = (bang - 1) * line_wid + "%";
      }
    }
  });

  function head_color(index) {
    if (index != -1) {
      if (sec[index].offsetLeft == o_left[index]) {
        if (index == 0 || index == 4) {
          header.style.color = "#fff";
          logo.style.background =
            "url(img/svg/logo_white.svg) no-repeat center / contain";
        } else {
          header.style.color = "#333";
          logo.style.background =
            "url(img/svg/logo.svg) no-repeat center / contain";
        }
      }
    }
  }
  header.addEventListener("mouseenter", function () {
    header.style.color = "#333";
    logo.style.background = "url(img/svg/logo.svg) no-repeat center / contain";
  });
  header.addEventListener("mouseleave", function () {
    let re_left = Number(main.style.left.split("px")[0]);

    for (let i = 0; i < sec.length; i++) {
      if (Math.abs(re_left) == o_left[i]) {
        if (i == 0 || i == 4 || i == 5) {
          header.style.color = "#fff";
          logo.style.background =
            "url(img/svg/logo_white.svg) no-repeat center / contain";
        } else {
          header.style.color = "#333";
          logo.style.background =
            "url(img/svg/logo.svg) no-repeat center / contain";
        }
      }
    }
  });

  function act_move(el, index) {
    if (sec[index].offsetLeft == o_left[index]) {
      for (let j = 0; j < el.length; j++) {
        el[j].style.transitionDelay = 0.3 * j + "s";
        el[j].classList.add("move_0");
      }
    }
  }
  function act_move2(el, index) {
    if (sec[index].offsetLeft == o_left[index]) {
      for (let j = 0; j < el.length; j++) {
        el[j].style.transitionDelay = 0.3 * j + "s";
        el[j].classList.add("move_50");
      }
    }
  }

  act_move(move, 0);
  act_move2(logo_img, 0);

  let paths = $(".logo_box").find("circle").eq(0);
  let paths2 = $(".logo_box").find("circle").eq(1);

  // svg
  setTimeout(function () {
    $(".logo_box").children("svg").css({ opacity: 1 });

    paths.each(function (i, circle) {
      svg_move(i, circle);
    });
    paths2.each(function (i, circle) {
      svg_move(i, circle);
    });
  }, 500);

  function svg_move(i, tag) {
    let total_length = tag.getTotalLength();

    // 점선 길이
    tag.style.strokeDasharray = total_length;

    // 시작 위치
    tag.style.strokeDashoffset = total_length;

    $(tag).animate(
      {
        strokeDashoffset: 0,
      },
      1000
    );
  }
});
