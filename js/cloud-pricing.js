(function ($) {
  var $wrapper = $('.js-cloud-pricing');
  if ( $wrapper.length == 0 ) return;

  //
  //
  // .js-popover
  //
  var initPopovers = function(){
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
  var setUpPopovers = function(){
    var $popoverTemplate = $('.js-popover-template').clone().remove();
    // var $popoverContent = $('.js-popover-content').replaceWith($popoverTemplate);
    $('.js-popover-content').each(function(){
      var $t = $(this);
      var $popoverTemplateClone = $popoverTemplate.clone();
      var popoverText = $t.text();
      $popoverTemplateClone.find('.js-popover-text').text(popoverText);
      $t.replaceWith($popoverTemplateClone);
    });
    initPopovers();
  }

  //
  //
  // .js-comparison-tables-tabs
  //
  var comparisonTableTabs = function(){
    var $wrapper = $('.js-comparison-tables');
    var $tabs = $wrapper.find('.js-comparison-tables-tabs button');
    var $cells = $wrapper.find("[class*='js-price-lv-']");

    $tabs.on('click', function(){
      var $t = $(this);
      var cellTargetClass = $t.data('target');

      $cells.removeClass('is-active');
      $cells.filter( cellTargetClass ).addClass('is-active');

      $tabs.removeClass('is-active');
      $t.addClass('is-active')
    });
  }

  //
  //
  // .js-add-attention-icon
  //
  var addAttentionIconForHighlightedRow = function(){
    $('.js-add-attention-icon td').last().wrapInner('<div/>')
  }

  setUpPopovers();
  comparisonTableTabs();
  addAttentionIconForHighlightedRow();
}(jQuery));
