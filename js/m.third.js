$(document).ready(function () {
  const main = document.getElementsByTagName("main")[0];
  const sec = document.getElementsByTagName("section");

  let move_1 = document.getElementsByClassName("move_1");
  let move_2 = document.getElementsByClassName("move_2");
  let move_3 = document.getElementsByClassName("move_3");
  let mission_txt = document.getElementsByClassName("mission_txt");
  let move = document.getElementsByClassName("move");
  let logo_img = document.getElementsByClassName("logo_img");
  let eco_move = document.getElementsByClassName("eco_move");
  let c_b_move = document.getElementsByClassName("c_b_move");
  const line = document.getElementById("line");
  const el_move = ["", move_1, move_2, move_3, mission_txt, eco_move, c_b_move];

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
  let line_wid = 100 / sec.length;

  let x_gap = 0;

  function getElementIndex(element, range) {
    // 추가
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
  }

  let start_posx = 0;
  let posx = 0;
  let posy = 0;

  let s_posx = 0;
  let s_posy = 0;

  let l_gap = s_posx - posx;
  let r_gap = posx - s_posx;

  let touch_num = 0;
  let re_left = 0;

  $(document).on("touchstart", function (event) {
    main.style.transition = "none";

    start_posx = event.touches[0].pageX;

    re_left = main.getBoundingClientRect().left;

    posx = event.touches[0].pageX;
    posy = event.touches[0].pageY;

    s_posx = posx;
    s_posy = posy;

    s_posx = -1 * main.getBoundingClientRect().left + event.touches[0].pageX;
  });

  $(document).on("touchmove", function (event) {
    posx = event.touches[0].pageX;
    posy = event.touches[0].pageY;

    l_gap = s_posx - posx;
    r_gap = posx - s_posx;

    if (l_gap > 0 && touch_num < 6) {
      main.style.left = -1 * l_gap + "px";
    }
    // 우측으로
    else if (l_gap < 0 && touch_num > 0) {
      main.style.left = -1 * l_gap + "px";
    }
  });

  $(document).bind("touchend", function () {
    main.style.transition = "all 0.5s";

    x_gap = start_posx - posx;

    // 왼쪽으로 가는거
    if (x_gap > 0 && touch_num < 6) {
      touch_num += 1;
      main.style.left = -1 * o_left[touch_num] + "px";
    }
    // 오른쪽으로 가는거
    else if (x_gap < 0 && touch_num > 0) {
      touch_num -= 1;
      main.style.left = -1 * o_left[touch_num] + "px";
    }

    if (!sec_chk) {
      sec_chk = true;
      setTimeout(function () {
        sec_chk = false;
      }, 500);

      for (let j = 0; j < sec.length; j++) {
        if (touch_num == j) {
          act_move(el_move[j], touch_num);
        }
      }
      line.style.width = touch_num * line_wid + "%";
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
