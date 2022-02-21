$(document).ready(function () {
  let url = location.href;
  url = url.split("picogram")[1];

  // main_area
  const BN = document.getElementsByClassName("banner");
  const TXT = document.getElementsByClassName("txt_box");
  const prev = document.getElementsByClassName("prev")[0];
  const next = document.getElementsByClassName("next")[0];
  const indi_box = document.getElementsByClassName("indi_box")[0];
  const indi_h1 = indi_box.children[0];
  const indi_span = indi_h1.children[0];

  let bang_no = 0; // 현재 보고있는판
  let pos_x = 0;
  let interval = "";
  let bn_count = BN.length;
  let timer = 1000;

  // 버튼 누르면 판 움직이는 기능
  prev.addEventListener("click", function () {
    btn_init(prev);
    slide("prev");
  });
  next.addEventListener("click", function () {
    btn_init(next);
    slide("next");
  });

  function slide(direction) {
    let out_bang = 0;
    let out_pos = 0;
    let coming_bang = 0;
    let coming_pos = 0;
    let tmp_bang = 0;

    clearInterval(auto_interval);
    clearInterval(interval);

    interval = setInterval(function () {
      if (direction == "next") {
        out_bang = bang_no % 3;
        out_pos = -1 * pos_x;
        coming_bang = (bang_no + 1) % 3;
        coming_pos = 100 - pos_x;
        tmp_bang = coming_bang;
      } else if (direction == "prev") {
        out_bang = bang_no % bn_count;
        out_pos = pos_x;
        coming_bang = (bang_no - 1 + 3) % bn_count;
        coming_pos = -1 * (100 - pos_x);

        let tmp = (bang_no - 1) % bn_count;
        tmp_bang = bang_no - 1 < 0 ? tmp + bn_count : tmp;
      }

      // 나갈판
      BN[out_bang].style.top = out_pos + "%";
      // 들어올판
      BN[coming_bang].style.top = coming_pos + "%";
      
      // 움직임멈출 조건    
      if (pos_x >= 100) {
        clearInterval(interval);
        bang_no = tmp_bang;
        pos_x = 0;
      }
      pos_x++;

      TXT[out_bang].style.transition = "all 0.3s";
      TXT[out_bang].style.opacity = 0;

      setTimeout(function () {
        TXT[out_bang].style.top = "100%";
      }, timer);

      TXT[coming_bang].style.transition = "all 1s";
      TXT[coming_bang].style.top = 0;
      TXT[coming_bang].style.opacity = 1;

      indi_span.innerText = "0" + (coming_bang + 1);
    }, 2);
  }

  let auto_interval = "";
  // // 1초마다 오른쪽 버튼이 눌린다.
  function auto_slide() {
    clearInterval(interval);
    clearInterval(auto_interval);
    auto_interval = setInterval(function () {
      slide("prev");
    }, timer * 10);
  }

  function btn_init(el) {
    el.style.pointerEvents = "none";

    setTimeout(() => {
      el.style.pointerEvents = "auto";
    }, timer);
  }

  // 마우스 올리면 멈춤, 나가면 다시 자동 실행
  const c_area = document.getElementsByClassName("c_area")[0];
  c_area.addEventListener("mouseover", function () {
    clearInterval(auto_interval);
  });
  c_area.addEventListener("mouseout", function () {
    auto_slide();
  });

  auto_slide();


  // pureal area
  let s_top;
  let s_bot;

  // svg
  let paths = $(".list_box").find("path");
  let paths2 = $(".list_box").find("polyline");
  let paths3 = $(".list_box").find("line");
  let paths4 = $(".list_box").find("circle");
  let paths5 = $(".list_box").find("ellipse");
  let svg_count = 0;

  function act_move_bot(el, this_o_top) {
    if (s_bot - 150 >= this_o_top && svg_count < 1) {
      // top_move
      for (let j = 0; j < el.length; j++) {
        el[j].classList.add("top_active");
        el[j].style.transitionDelay = 0.5 * j + "s";
      }

      // svg
      setTimeout(function () {
        paths.each(function (i, path) {
          m_svg_move(i, path);
        });
        paths2.each(function (i, polyline) {
          m_svg_move(i, polyline);
        });
        paths3.each(function (i, line) {
          m_svg_move(i, line);
        });
        paths4.each(function (i, circle) {
          m_svg_move(i, circle);
        });
        paths5.each(function (i, ellipse) {
          m_svg_move(i, ellipse);
        });
      }, 500);
      svg_count += 1;
    }
  }
  // svg
  function m_svg_move(i, tag) {
    total_length = tag.getTotalLength();

    // 점선 길이
    tag.style.strokeDasharray = total_length;

    // 시작 위치
    tag.style.strokeDashoffset = total_length;

    $(tag).animate(
      {
        strokeDashoffset: 0,
      },
      2000
    );
  }

  // pureal
  const top_move = document.getElementsByClassName("top_move");
  const pureal = document.getElementsByClassName("pureal")[0];


  // 모바일//////////////////////////////////////////////////////////////////////////////////////////////
  if (url == "/m.index.html") {
    for (let j = 0; j < top_move.length; j++) {
      top_move[j].classList.add("top_active");
    }

    paths.each(function (i, path) {
      m_svg_move(i, path);
    });
    paths2.each(function (i, polyline) {
      m_svg_move(i, polyline);
    });
    paths3.each(function (i, line) {
      m_svg_move(i, line);
    });
    paths4.each(function (i, circle) {
      m_svg_move(i, circle);
    });
    paths5.each(function (i, ellipse) {
      m_svg_move(i, ellipse);
    });
  }
  
  // product
  const product = document.getElementsByClassName("product")[0];

  // news
  const title_txt = document.getElementsByClassName("title_txt")[0];
  const news = document.getElementsByClassName("news")[0];
  let bot_half = news.offsetTop + news.clientHeight / 2;
  let news_gap = 0;

  // big_banner
  const bg_move = document.getElementsByClassName("bg_move")[0];
  const bg_b = document.getElementsByClassName("big_b")[0];
  let tmp_bot = 0;
  let width = 90;

  // wave
  const wave = document.getElementsByClassName("wave");
  const p_wave = document.getElementsByClassName("p_wave")[0];
  let bg_x1 = 0;
  let bg_x2 = 300;

  window.addEventListener("scroll", function () {
    s_top = window.scrollY;
    s_bot = s_top + window.innerHeight;
    if (url == "/index.html" || url == "/") {
      // pureal
      act_move_bot(top_move, pureal.offsetTop);
    }
    // news
    if (s_bot >= news.offsetTop) {
      if (url == "/index.html" || url == "/") {
        bot_half = news.offsetTop + news.clientHeight / 2;

        news_gap = bot_half - s_bot;
        news_gap = news_gap * 0.1 - 100;
        if (news_gap >= -100) {
          title_txt.style.left = news_gap + "%";
        }
      } else if (url == "/m.index.html") {
        news_gap = bot_half - s_bot;
        news_gap = news_gap * 0.1 - 80;
        if (news_gap >= -200) {
          title_txt.style.left = news_gap + "%";
        }
      }
    }

    // big_banner
    if (window.innerWidth < 900) {
      s_bot = s_bot + 100;
    }
    if (s_bot - 500 >= bg_b.offsetTop) {
      for (let i = 0; i < 5; i++) {
        if (tmp_bot - i > s_bot && width >= 90) {
          width -= 2;
        } else if (tmp_bot + i < s_bot && width <= 100) {
          width += 2;
        }
        bg_move.style.width = width + "%";
      }
    }

    tmp_bot = s_bot;

    // 공통 wave
    for (let i = 0; i < wave.length; i++) {
      bg_x1 += 8;
      bg_x2 += 8;
      wave[i].style.backgroundPositionX = bg_x1 + "px";
      p_wave.style.backgroundPositionX = bg_x2 + "px";
    }
  });

  // product area
  const p_img = document.getElementsByClassName("p_img");
  const info_box = document.getElementsByClassName("info_box");
  const p_txt = document.getElementsByClassName("p_txt");
  const in_menu = document.getElementsByClassName("in_menu");
  let menu_count = in_menu.length;

  let out_bang = 0;
  let out_pos = 0;
  let coming_bang = 0;
  let coming_pos = 0;
  let btn_chk = true;
  function getElementIndex(element, range) {
    // 추가
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
  }
  if (url == "/m.index.html") {
    in_menu[0].children[0].style.width = "100%";
  }

  for (let i = 0; i < in_menu.length; i++) {
    in_menu[i].addEventListener("click", function (e) {
      // 현재 클릭한거
      coming_bang = getElementIndex(
        document.querySelectorAll(".in_menu"),
        this
      );

      if (coming_bang != out_bang) {
        if (btn_chk) {
          clearInterval(interval);
          btn_chk = false;
          let tmp_gap =
            coming_bang - out_bang < 0
              ? coming_bang - out_bang + menu_count
              : coming_bang - out_bang;
          let tmp_count = 0;
          slide2(0, tmp_gap, tmp_count);
          if (url == "/m.index.html") {
            in_menu[coming_bang].children[0].style.width = "100%";
          }

          p_txt[coming_bang].style.opacity = 1;
          info_box[coming_bang].style.top = 0;
          info_box[out_bang].style.top = 100 + "%";
          p_txt[out_bang].style.opacity = 0;

          setTimeout(() => {
            btn_chk = true;
          }, 700);
        }
      }
      if (url == "/m.index.html") {
        in_menu[out_bang].children[0].style.width = 0;
      }
    });
  }

  function slide2(pos_x2, tmp_gap, tmp_count) {
    clearInterval(interval);
    interval = setInterval(function () {
      out_pos = -1 * pos_x2;
      coming_pos = 100 - pos_x2;

      // 나갈판
      p_img[out_bang].style.left = out_pos + "%";

      // 들어올판
      p_img[(out_bang + 1) % menu_count].style.left = coming_pos + "%";

      pos_x2++;

      if (pos_x2 >= 100) {
        clearInterval(interval);
        out_bang = (out_bang + 1) % menu_count;
        tmp_count++;
        if (tmp_count < tmp_gap) {
          clearInterval(interval);
          slide2(0, tmp_gap, tmp_count);
        }
      }
    }, 2);
  }
});
