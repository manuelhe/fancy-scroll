/* ===========================================================
 * jquery-fancy-scroll.js v1.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Add Overflow Scroll Effect like on iOS/Android
 * but for your website
 *
 * https://github.com/peachananr/fancy-scroll
 *
 * Changelog
 *
 * V1.1 (https://github.com/manuelhe)
 * - Added support for horizontal scrolling through
 *   horizontal: true
 * - Minor style adjusts
 * ========================================================== */

!function ($) {

  var defaults = {
    animation: "bounce",
    bounceDistance: 50,
    glowColor: "#02A1FA",
    animDuration: "0.2s",
    animEasing: "cubic-bezier(0.175, 0.885, 0.420, 1.310)",
    innerWrapper: document,
    horizontal: false
  };

  $.fn.fancy_scroll = function (options) {
    var settings = $.extend({}, defaults, options),
      el = $(settings.innerWrapper),
      container = $(this),
      posWas = 0,
      status = "off";
    if (settings.innerWrapper !== document) {
      el = container.find($(settings.innerWrapper));
    }

    $.fn.bounceEffect = function (px, s, anim, settings) {
      var selector = settings.innerWrapper === document ? $(this).find("body") : $(this);
      var translate = settings.horizontal ?
          "translate3d(" + px + ", 0, 0)" :
          "translate3d(0, " + px + ", 0)";

      selector.css({
        "-webkit-transform": translate,
        "-webkit-transition": "all " + s + " " + anim,
        "-moz-transform": translate,
        "-moz-transition": "all " + s + " " + anim,
        "-ms-transform": translate,
        "-ms-transition": "all " + s + " " + anim,
        "transform": translate,
        "transition": "all " + s + " " + anim
      });
    };

    $.fn.glowEffect = function (shadow, s, anim, settings) {
      var selector = settings.innerWrapper === document ? $(this).find("body") : $(this);

      selector.css({
        "box-shadow": shadow,
        "-webkit-transition": "all " + s + " " + anim,
        "-moz-transition": "all " + s + " " + anim,
        "-ms-transition": "all " + s + " " + anim,
        "transition": "all " + s + " " + anim,
      });
    };

    container.scroll(function () {
      var pos = settings.horizontal ? container.scrollLeft() : container.scrollTop();
      var transitionEnd = "webkitTransitionEnd otransitionend oTransitionEnd transitionend";
      var cond = settings.horizontal ?
          (container.scrollLeft() + container.width() >= el.width()) && status === "off" :
          (container.scrollTop() + container.height() >= el.height()) && status === "off";
      if (pos > posWas) { //if the user is scrolling down...
        if (cond) {
          status = "on";
          switch (settings.animation) {
          case "bounce":
            el.bounceEffect(settings.bounceDistance * -1 + "px", settings.animDuration, settings.animEasing, settings);
            el.one(transitionEnd, function () {
              el.bounceEffect("0", settings.animDuration, settings.animEasing, settings);
              el.one(transitionEnd, function () {
                status = "off";
              });
            });
            break;
          case "glow":
            el.glowEffect(settings.glowColor + " 0 -30px 50px -30px inset", settings.animDuration, settings.animEasing, settings);
            el.one(transitionEnd, function () {
              el.glowEffect("none", settings.animDuration, settings.animEasing, settings);
              el.one(transitionEnd, function () {
                status = "off";
              });
            });
            break;
          }

        }
      }
      if (pos < posWas) { //if the user is scrolling up...
        cond = settings.horizontal ?
            (container.scrollLeft() + container.width() !== el.width()) && status === "off" :
            (container.scrollTop() + container.height() !== el.height()) && status === "off";
        if (cond) {
          if ((settings.horizontal ? container.scrollLeft() : container.scrollTop()) <= 0) {
            status = "on";
            switch (settings.animation) {
            case "bounce":
              el.bounceEffect(settings.bounceDistance + "px", settings.animDuration, settings.animEasing, settings);
              el.one(transitionEnd, function () {
                el.bounceEffect("0px", settings.animDuration, settings.animEasing, settings);
                el.one(transitionEnd, function () {
                  status = "off";
                });
              });
              break;
            case "glow":
              el.glowEffect(settings.glowColor + " 0 30px 50px -30px inset", settings.animDuration, settings.animEasing, settings);
              el.one(transitionEnd, function () {
                el.glowEffect("none", settings.animDuration, settings.animEasing, settings);
                el.one(transitionEnd, function () {
                  status = "off";
                });
              });
              break;
            }
          }
        }
      }
      posWas = pos;

    });

  };

}(window.jQuery);
