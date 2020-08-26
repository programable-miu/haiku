$(function () {
  let previous_position = 0;

  function calcate_background_position_y (diff) {
    const parallax_coefficient = 0.5;
    const image_height = 280;
    return (diff - image_height) * parallax_coefficient;
  }

  $('.image-window').each(function () {
    const current_position = $(window).scrollTop();
    const window_height = $(window).height();
    const image_offset = $(this).offset().top;
    const diff = current_position - image_offset;
    $(this).css('background-position-y', calcate_background_position_y(diff) + 'px');
  });

  $(window).scroll(function () {
    const current_position = $(this).scrollTop();
    const window_height = $(this).height();
    const border_position = $('#dark-changer').offset().top - window_height / 2;

    const to_dark = previous_position < border_position && border_position <= current_position;
    const to_light = current_position < border_position && border_position <= previous_position;

    if (to_dark) {
      $('#outer-wrapper').addClass('dark-mode');
    } else if (to_light) {
      $('#outer-wrapper').removeClass('dark-mode');
    }

    // 参考: http://www.yabi-blog.xyz/iphone_ios_background-attachment_fixed_jquery/
    $('.image-window').each(function () {
      const image_offset = $(this).offset().top;
      const diff = current_position - image_offset;
      $(this).css('background-position-y', calcate_background_position_y(diff)  + 'px');
    });

    previous_position = current_position;
  });
});
