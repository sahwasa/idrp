$(function () {
  jqgridInit();
  
  // 로그인 팝업
  $('.btn_login_modal').on('click', function () {
    $('.login_body').toggleClass('on');
  })
  // 지도 드래그
  $('#draggable').draggable()

  // accordion
  $('[role="acc"] > div').accordion({
    header: 'h4',
    collapsible: true,
    heightStyle: 'content',
    icons: {
      header: 'ui-icon-caret-1-e',
      activeHeader: 'ui-icon-caret-1-s',
    },
    // active: true
  })

  function tblBtn(cellValue, options, rowdata, action) {
    var html,
      txt = ''
    switch (cellValue) {
      case 'edit':
        txt = 'edit'
        break
      case 'del':
        txt = 'del'
        break
      case 'dtl':
        txt = 'dtl'
        break
      case 'down':
        txt = 'down'
        break
      case 'file':
        txt = 'file'
        break
      default:
        txt = 'none'
    }
    html = '<button type="button" class="axi btn_' + txt + '"></button>'
    return html
  }

  // calendar
  $.datetimepicker.setLocale('kr')
  $('#datetimepicker').datetimepicker()
  $('#date_timepicker_start').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
      this.setOptions({
        maxDate: $('#date_timepicker_end').val()
          ? $('#date_timepicker_end').val()
          : false,
      })
    },
    timepicker: false,
  })

  $('#date_timepicker_end').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
      this.setOptions({
        minDate: $('#date_timepicker_start').val()
          ? $('#date_timepicker_start').val()
          : false,
      })
    },
    timepicker: false,
  })

  // pop
  var popBtn = $('[openpop]')
  popBtn.on('click', function () {
    var target = $(this).attr('openpop')
    $('#' + target).show()
  })
  var closePop = $('.btn_pop_close')
  closePop.on('click', function () {
    $(this).parents('.pop_overlay').hide()
  })

  $('.con_list .more').on('click', function () {
    $(this).toggleClass('on')
    $(this).parent('p').nextAll('ul').slideToggle('fast')
  })

  // tab
  var tab_conts = $('.tab_conts'),
    tab_list = $('.tab_list'),
    tab_btn = $('.tab_list li')

  tab_conts.find('.tab_cont').hide()
  tab_conts.find('.tab_cont:first').show()
  tab_list.find('li:first').find('a').addClass('on')
  tab_btn.on('click', 'a', function (e) {
    e.preventDefault()
    var getId = $(this).prop('href').split('#')[1]
    $(this).parents('.tab').next('.tab_conts').find('.tab_cont').hide()
    $(this).parents('.tab_list').find('a').removeClass('on')
    $(this).addClass('on')
    $('#' + getId).show()
  })

  // mobile gnb
  $('.allMenuOpen').on('click', function (e) {
    e.preventDefault()
    $(this).toggleClass('close')
    $('#allMenuBox').toggle(0).attr('tabindex', 0)
    $('#allMenuBox').toggleClass('active')
  })
  $('#allMenuBox').removeClass('active').attr('tabindex', -1)
  $('#allMenuBox > ul > li').each(function () {
    $(this)
      .children('a')
      .on('click', function (e) {
        if ($(this).siblings().length > 0) {
          e.preventDefault()
          $(this).parent().addClass('active').siblings().removeClass('active')
        }
      })
  })
  $('#allMenuBox > ul > li > a').each(function () {
    if (!$(this).next().length) {
      $(this).addClass('empty')
    }
  })
  $('.m_con > li').each(function () {
    $(this).children('a').on('click', function (e) {
        if ($(this).siblings().length > 0) {
          e.preventDefault()
          $(this).parent().addClass('active').siblings().removeClass('active')
        }
      })
  })
  $('.m_con > li > a').each(function () {
    if (!$(this).next().length) {
      $(this).addClass('empty')
    }
  })
  // toggle button
  $('.btn_toggle').on('click', function (e) {
    e.preventDefault()
    var cur = $(this).attr('datavalue')
    if ($(this).attr('disabled') == 'disabled') return false
    if (cur == 'on') {
      $(this).attr('datavalue', 'off')
    } else {
      $(this).attr('datavalue', 'on')
    }
  })
})

function jqgridInit() {
  $('.jq-grid').each(function () {
    $(this).setGridWidth($(this).parents('.tbl_wrap').width() - 2)
  })
}
$(window).on('resize', function () {
  jqgridInit()
})