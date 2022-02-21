$(document).ready(function () {
  let cate_no = get_url_info("cate_no");
  let sec = get_url_info("sec");

  load_items(cate_no, sec, ITEM_LIST[cate_no].length);

  // 슬라이드
  const item_sec = document.getElementsByClassName("item_sec");
  const prev = document.getElementsByClassName("prev")[0];
  const btn_next = document.getElementsByClassName("btn_next")[0];
  const btn_prev = document.getElementsByClassName("btn_prev")[0];
  const next = document.getElementsByClassName("next")[0];
  let item_index = 0;
  let item_count = item_sec.length;
  let item_wid = item_sec[0].clientWidth;
  let left = 0;

  // 초기화
  for (let i = 0; i < item_count; i++) {
    item_sec[i].style.left = (i - 1) * item_wid + "px";
  }
  window.addEventListener("resize", function () {
    window.location.reload();
  });

  let count = -1;
  let tmp_sec = sec - 2; // url의 sec의 값
  let length = $(".item_sec").length;
  if (tmp_sec < 0) {
    tmp_sec += length;
  }
  item_index = tmp_sec;

  for (let i = tmp_sec; i < tmp_sec + length; i++) {
    $(".item_sec")
      .eq(i % length)
      .css({
        left: count * item_wid,
      });
    count++;

    if (count > length - 2) {
      count = -1;
    }
  }

  item_sec[sec].style.padding = "3%";
  item_sec[sec].children[1].classList.add("txt_active");
  item_sec[sec].children[2].classList.add("btn_active");
  item_sec[sec].children[3].classList.add("img_active");

  function prev_chk() {
    item_index -= 1;
    if (item_index == -1) {
      item_index = item_count - 1;
    }

    item_sec[item_index % item_count].style.transition = "all 0s";
    item_sec[item_index % item_count].style.left = -2 * item_wid + "px";

    setTimeout(function () {
      item_sec[item_index % item_count].style.transition = "all .5s";
    }, 30);

    for (let i = 0; i < item_sec.length; i++) {
      left = Number(item_sec[i].style.left.split("px")[0]);

      item_sec[i].style.left = item_wid + left + "px";

      if (item_sec[i].style.left == item_wid + "px") {
        item_sec[i].style.padding = "3%";
        item_sec[i].children[1].classList.add("txt_active");
        item_sec[i].children[2].classList.add("btn_active");
        item_sec[i].children[3].classList.add("img_active");
      } else {
        item_sec[i].style.padding = "3% 9%";
        item_sec[i].children[1].classList.remove("txt_active");
        item_sec[i].children[2].classList.remove("btn_active");
        item_sec[i].children[3].classList.remove("img_active");
      }
    }
  }
  function next_chk() {
    if (item_index >= 5) {
      item_index = 0;
    }

    item_sec[item_index % item_count].style.transition = "all 0s";

    setTimeout(function () {
      item_sec[(item_index - 1) % item_count].style.transition = "all .5s";
    }, 10);

    item_sec[item_index % item_count].style.left =
      item_wid * (item_count - 1) + "px";

    for (let i = 0; i < item_sec.length; i++) {
      left = Number(item_sec[i].style.left.split("px")[0]);

      item_sec[i].style.left = left - item_wid + "px";

      if (item_sec[i].style.left == item_wid + "px") {
        item_sec[i].style.padding = "3%";
        item_sec[i].children[1].classList.add("txt_active");
        item_sec[i].children[2].classList.add("btn_active");
        item_sec[i].children[3].classList.add("img_active");
      } else {
        item_sec[i].style.padding = "3% 9%";
        item_sec[i].children[1].classList.remove("txt_active");
        item_sec[i].children[2].classList.remove("btn_active");
        item_sec[i].children[3].classList.remove("img_active");
      }
    }
    item_index += 1;
  }

  prev.addEventListener("click", prev_chk);

  next.addEventListener("click", next_chk);

  // 버튼 호버
  prev.addEventListener("mouseenter", function () {
    btn_prev.setAttribute("d", "M 40 10 Q 10 65 40 140");
  });
  prev.addEventListener("mouseleave", function () {
    btn_prev.setAttribute("d", "M 40 10 Q 40 65 40 140");
  });

  next.addEventListener("mouseenter", function () {
    btn_next.setAttribute("d", "M 10 10 Q 40 65 10 140");
  });
  next.addEventListener("mouseleave", function () {
    btn_next.setAttribute("d", "M 10 10 Q 10 65 10 140");
  });

  // 모달
  // 정보를 불러올때 불러오고나서 addeventlistener를 실행시키기 (방향버튼 처리)
  let m_img = document.getElementsByClassName("m_img");
  let m_indi = document.getElementsByClassName("m_indi");

  let m_index = 0;

  let modal = document.getElementById("modal");
  let btn_more = document.getElementsByClassName("btn_more");
  let m_close = document.getElementById("btn_close");
  let m_chk = false;

  for (let i = 0; i < btn_more.length; i++) {
    btn_more[i].addEventListener("click", function () {
      if (!m_chk) {
        modal_info(cate_no, sec, i);
        modal.style.display = "flex";
        document.body.style.overflowY = "hidden";
        m_chk = true;
      }
    });
    m_close.addEventListener("click", function () {
      if (m_chk) {
        modal.style.display = "none";
        document.body.style.overflowY = "auto";
        m_chk = false;
      }
    });
  }

  let indi_count = $(".m_indi").length;
  function modal_chk(num) {
    if (indi_count < 3) {
      if (num == -1) {
        num = 1;
      }
      if (num == 2) {
        num = 0;
      }
      for (let i = 0; i < 2; i++) {
        m_img[i].style.opacity = 0;
        m_indi[i].classList.remove("m_indi_active");
      }
      m_img[num % 2].style.opacity = 1;
      m_indi[num % 2].classList.add("m_indi_active");
    } else {
      for (let i = 0; i < m_img.length; i++) {
        m_img[i].style.opacity = 0;
        m_indi[i].classList.remove("m_indi_active");
      }
      m_img[num % 3].style.opacity = 1;
      m_indi[num % 3].classList.add("m_indi_active");
    }
  }

  if (!m_chk) {
    $(document).on("click", ".m_indi", function () {
      let indi_index = $(this).index();
      indi_count = $(".m_indi").length;
      modal_chk(indi_index, 0);
      m_index = indi_index;
    });

    $(document).on("click", ".m_prev", function () {
      indi_count = $(".m_indi").length;
      m_index -= 1;
      if (indi_count < 3 && m_index == -1) {
        m_index = 1;
      }
      if (indi_count > 2 && m_index == -1) {
        m_index = 2;
      }
      modal_chk(m_index);
    });

    $(document).on("click", ".m_next", function () {
      indi_count = $(".m_indi").length;
      if (indi_count < 3 && m_index == 2) {
        m_index = 0;
      }
      if (indi_count > 2 && m_index >= 3) {
        m_index = 0;
      }
      m_index += 1;
      modal_chk(m_index);
    });
  }
});
