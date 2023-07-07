$(function () {
  // 지도 드래그
  $("#draggable").draggable();

  function jqgridInit() {
    $('.jq-grid').each(function () {
      $(this).setGridWidth($(this).parents('.tbl_wrap').width() - 2);
    });
  }
  $(window).on('resize', function () {
    jqgridInit();
  });


  // accordion
  $('[role="acc"] > div').accordion({
    header: "h4",
    collapsible: true,
    heightStyle: "content",
    icons: {
      "header": "ui-icon-caret-1-e",
      "activeHeader": "ui-icon-caret-1-s"
    },
    // active: true
  });

function tblBtn(cellValue, options, rowdata, action) {
  var html, txt = "";
  switch (cellValue) {
    case "edit":
      txt = "edit";
      break;
    case "del":
      txt = "del";
      break;
    case "dtl":
      txt = "dtl";
      break;
    case "down":
      txt = "down";
      break;
    case "file":
      txt = "file";
      break;
    default:
      txt = "none";
  }
  html = '<button type="button" class="axi btn_' + txt + '"></button>';
  return html;
}

  // calendar
  $.datetimepicker.setLocale('kr');
  $('#datetimepicker').datetimepicker();

  $('#date_timepicker_start').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
      this.setOptions({
        maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
      })
    },
    timepicker: false
  });

  $('#date_timepicker_end').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
      this.setOptions({
        minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
      })
    },
    timepicker: false
  });

  // pop
  var popBtn = $('[openpop]');
  popBtn.on('click', function () {
    var target = $(this).attr('openpop');
    $('#' + target).show();
  })
  var closePop = $('.btn_pop_close');
  closePop.on('click', function () {
    $(this).parents('.pop_overlay').hide();
  })

  $('.con_list .more').on('click', function () {
    $(this).toggleClass('on');
    $(this).parent('p').nextAll('ul').slideToggle('fast');
  })

  // tab
  var tab_conts = $('.tab_conts'),
    tab_list = $('.tab_list'),
    tab_btn = $('.tab_list li');

  tab_conts.find('.tab_cont').hide();
  tab_conts.find('.tab_cont:first').show();
  tab_list.find('li:first').find('a').addClass('on');
  tab_btn.on('click', 'a', function (e) {
    e.preventDefault();
    var getId = $(this).prop('href').split('#')[1];
    $(this).parents('.tab').next('.tab_conts').find('.tab_cont').hide();
    $(this).parents('.tab_list').find('a').removeClass('on');
    $(this).addClass('on');
    $('#' + getId).show();
  });


})
  // toggle button
  $('.btn_toggle').on('click', function (e) {
    e.preventDefault();
    var cur = $(this).attr('datavalue');
    if ($(this).attr('disabled') == 'disabled') return false;
    if (cur == 'on') {
      $(this).attr('datavalue', 'off');
    } else {
      $(this).attr('datavalue', 'on');
    }
  })
  // jqgrid
  function jqgridInit(){
    $('.jq-grid').each(function(){
      var grids=$(this);
      grids.setGridWidth($(this).parents('.tbl_wrap').width() - 2);
    });
    // $('.tablediv').each(function(){
    //   var inner_grid=$(this);
    //   inner_grid.setGridWidth($(this).parents('.subgrid-data').width());
    // })

  }
$(window).on('resize', function() {
  jqgridInit();
});