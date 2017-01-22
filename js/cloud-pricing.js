(function ($) {
  var $wrapper = $('.js-cloud-pricing');
  if ( $wrapper.length == 0 ) return;
  //
  //
  // .js-package-features
  //
  var togglePopover = function(){
    var $popovers = $('.js-popover');
    $popovers.on('click', function(e){
      e.stopPropagation();
    });
    $('.js-popover-close-btn, body').on('click', function(){
      $popovers.hide();
    });
    $('.js-popover-toggle-btn').on('click', function(e){
      e.stopPropagation();
      var $currentPopover = $(this).closest('.js-popover-container').find('.js-popover');
      $popovers.not($currentPopover).hide();
      $currentPopover.toggle();
    });

  }
  togglePopover();

  //
  //
  // .some-other-module
  //
}(jQuery));
