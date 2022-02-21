const ITEM_LIST = [
  // countertop
  [
    {
      item_no: 1,
      src2: "01_3.jpg",
      src1: "01_2.jpg",
      src0: "01.jpg",
      title: "냉온 정수기",
      desc: "Hot and Cold",
    },
    {
      item_no: 2,
      src2: "01_3.jpg",
      src1: "02_2.jpg",
      src0: "02.jpg",
      title: "냉 정수기",
      desc: "Cold",
    },
    {
      item_no: 3,
      src2: "03_3.jpg",
      src1: "03_2.jpg",
      src0: "03.jpg",
      title: "온 정수기",
      desc: "Hot",
    },
    {
      item_no: 4,
      src2: "04_3.jpg",
      src1: "04_2.jpg",
      src0: "04.jpg",
      title: "수소 정수기",
      desc: "Hydrogen",
    },
    {
      item_no: 5,
      src2: "05_3.jpg",
      src1: "05_2.jpg",
      src0: "05.jpg",
      title: "프리미엄 정수기",
      desc: "Premium",
    },
    {
      item_no: 6,
      src2: "06_3.jpg",
      src1: "06_2.jpg",
      src0: "06.jpg",
      title: "유로 교체형 정수기",
      desc: "Euro Changer",
    },
    {
      item_no: 7,
      src4: "07_6.jpg",
      src2: "07_5.jpg",
      src1: "07_2.jpg",
      src0: "07.jpg",
      title: "직수형 정수기",
      desc: "Standard",
    },
  ],
  // under
  [
    {
      item_no: 1,
      src2: "01_3.jpg",
      src1: "01_2.jpg",
      src0: "01.jpg",
      title: "PnP 필터 시스템",
      desc: "PnP Filter system",
    },
    {
      item_no: 2,
      src2: "02_3.jpg",
      src1: "02_2.jpg",
      src0: "02.jpg",
      title: "Puri 필터 시스템",
      desc: "Puri series Filter system",
    },
    {
      item_no: 3,
      src2: "",
      src1: "02_2.jpg",
      src0: "03.jpg",
      title: "Eco 필터 시스템",
      desc: "Eco Filter system",
    },
    {
      item_no: 4,
      src2: "04_3.jpg",
      src1: "04_2.jpg",
      src0: "04.jpg",
      title: "맥스트림  필터 시스템",
      desc: "Maxtream Filter system",
    },
    {
      item_no: 5,
      src2: "",
      src1: "05_2.jpg",
      src0: "05.jpg",
      title: "맥스트림 하이브리드  필터 시스템",
      desc: "Maxtream Hybrid  Filter system",
    },
  ],
];

const SEC_TITLE = [
  "Pureal Brand",
  "카운터탑 정수기",
  "언더싱크 정수기",
  "피처 정수기",
  "정수 필터",
  "소재 및 부품",
];
const SEC = [
  "카운터탑 정수기",
  "언더싱크 정수기",
  "피처 정수기",
  "정수 필터",
  "소재 및 부품",
];
const T_IMG = ["brand_section02_img01", "brand_section02_img04"];
const file_addr = ["counter", "under"];
const file_name = ["pureal", "undersink"];
const img_addr = "img/second_product";

function get_url_info(key) {
  let url = location.href;
  url = url.split("?")[1];
  url = url.split("&");
  if (url.length > 1) {
    for (let i = 0; i < url.length; i++) {
      let tmp_url = url[i].split("=");
      if (key == tmp_url[0]) {
        return tmp_url[1];
      }
    }
    return null;
  } else {
    return null;
  }
}

function load_items(cate_no, sec, qty) {
  document.getElementsByClassName("item_title")[0].innerText = SEC_TITLE[sec];

  if (sec % 2 == 0) {
    document.getElementsByClassName("sec_title")[0].style.backgroundImage =
      "url(img/second_product/title/brand_section02_img01.jpg)";
  } else {
    document.getElementsByClassName("sec_title")[0].style.backgroundImage =
      "url(img/second_product/title/brand_section02_img04.jpg)";
  }

  for (let i = 0; i < qty; i++) {
    let IL = ITEM_LIST[cate_no];

    let list = "<li class='items'>";
    list += "<div class='img_box'>";
    list +=
      "<img src='img/second_product/" +
      file_addr[cate_no] +
      "/" +
      file_name[cate_no] +
      IL[i].src0 +
      "' alt='file_name[cate_no]'>";
    list +=
      "<img src='img/second_product/" +
      file_addr[cate_no] +
      "/" +
      file_name[cate_no] +
      IL[i].src1 +
      "' alt='file_name[cate_no]'>";
    list += "</div>";
    list += "<p class='p_name'>" + IL[i].title + "</p>";
    list += "<p class='desc'>" + IL[i].desc + "</p>";
    list += "<div class='btn_more'>+</div>";
    list += "</li>";

    document.getElementById("item_box").innerHTML += list;
  }
}

function modal_info(cate_no, sec, i) {
  let IL = ITEM_LIST[cate_no];

  let m_in = '<div id="img_area">';
  m_in += '<div id="m_img_box">';
  m_in +=
    '<img class="m_img" src="img/second_product/' +
    file_addr[cate_no] +
    "/" +
    file_name[cate_no] +
    IL[i].src0 +
    '" alt="file_name[cate_no]">';
  m_in +=
    '<img class="m_img" src="img/second_product/' +
    file_addr[cate_no] +
    "/" +
    file_name[cate_no] +
    IL[i].src1 +
    '" alt="file_name[cate_no]">';
  if (IL[i].src2 !== "") {
    m_in +=
      '<img class="m_img" src="img/second_product/' +
      file_addr[cate_no] +
      "/" +
      file_name[cate_no] +
      IL[i].src2 +
      '" alt="file_name[cate_no]">';
  }
  m_in += '<div id="m_arrow">';
  m_in += '<div id="prev" class="m_prev">';
  m_in +=
    '<svg viewBox="0 0 8.79 15.33"class="m_arrow"><polyline points="1.24 1 7.79 7.55 1 14.34"  style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:1px"/></svg>';
  m_in += "</div>";
  m_in += '<div id="next" class="m_next">';
  m_in +=
    '<svg viewBox="0 0 8.79 15.33"class="m_arrow"><polyline points="1.24 1 7.79 7.55 1 14.34"  style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:1px"/></svg>';
  m_in += "</div>";
  m_in += "</div>";
  m_in += "</div>";
  m_in += '<ul id="s_img_box" class="flex_container">';
  m_in += '<li class="m_indi m_indi_active">';
  m_in +=
    '<img src="img/second_product/' +
    file_addr[cate_no] +
    "/" +
    file_name[cate_no] +
    IL[i].src0 +
    '" alt="file_name[cate_no]">';
  m_in += "</li>";
  m_in += '<li class="m_indi">';
  m_in +=
    '<img src="img/second_product/' +
    file_addr[cate_no] +
    "/" +
    file_name[cate_no] +
    IL[i].src1 +
    '" alt="file_name[cate_no]">';
  m_in += "</li>";

  if (IL[i].src2 !== "") {
    m_in += '<li class="m_indi">';
    m_in +=
      '<img src="img/second_product/' +
      file_addr[cate_no] +
      "/" +
      file_name[cate_no] +
      IL[i].src2 +
      '" alt="file_name[cate_no]">';
    m_in += "</li>";
  }

  m_in += "</ul>";
  m_in += "</div> ";
  m_in += '<div id="desc_area">';
  m_in += '<h1 id="m_item_name">' + IL[i].title + "</h1>";
  m_in += "<p>순간 냉각/온수 정수 방식의 냉온 정수기</p>";
  m_in += '<div class="line"></div>';
  m_in += "<h3>필터 시스템</h3>";
  m_in += "<p>3필터 6단계</p>";
  m_in += "<p>PnP(Plug&Play) 방식의 원터치 필터 교체 시스템(자가 관리)</p>";
  m_in += "<h3>필터 구성</h3>";
  m_in += "<p>일반 필터 세트 1년 치 구성</p>";
  m_in += "<h3>제품 특징</h3>";
  m_in += "<p>저수조가 없는 직수형</p>";
  m_in += "<p>순간 냉각/온수 정수 방식으로 전기료 절약</p>";
  m_in += "<p>절전 기능으로 전기료 절약</p>";
  m_in += "</div>";

  document.getElementById("modal_in").innerHTML = m_in;
}
