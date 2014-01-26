/* ========================================================================
 * bootstrap.pophover.js
 * https://github.com/z38/bootstrap-pophover
 * Strongly influenced by Bootstrap Popover
 * ========================================================================
 * Copyright (c) 2014 z38
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * ======================================================================== */


function ($) { "use strict";

  // POPHOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Pophover = function (element, options) {
    this.init('pophover', element, options);
    
    this.$element.on('mouseenter.' + this.type, this.options.selector, $.proxy(this.elementEnter, this))
    this.$element.on('mouseleave.' + this.type, this.options.selector, $.proxy(this.elementLeave, this))
  }

  if (!$.fn.popover) throw new Error('Pophover requires popover.js')

  Pophover.DEFAULTS = $.extend({} , $.fn.popover.Constructor.DEFAULTS, {
    trigger: 'manual',
    html: true
  })


  // NOTE: POPHOVER EXTENDS popover.js
  // =================================

  Pophover.prototype = $.extend({}, $.fn.popover.Constructor.prototype)

  Pophover.prototype.constructor = Pophover

  Pophover.prototype.getDefaults = function () {
    return Pophover.DEFAULTS
  }
  
  Pophover.prototype.elementEnter = function() {
    if(!this.tip().hasClass('in')) {
      this.show();
    }
  }
  
  Pophover.prototype.elementLeave = function() {
    setTimeout($.proxy(function () {
      if(!this.tip().hasClass('in')) {
        this.hide()
      }
    }, this), 100);
  }
  
  Pophover.prototype.tipLeave = function() {
    setTimeout($.proxy(function () {
      if (!this.$element.is(':hover')) {
        this.hide();
      }
    }, this), 100);
  }

  Pophover.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      this.$tip.on('mouseleave.' + this.type, $.proxy(this.tipLeave, this));
    }
    
    return this.$tip
  }


  // POPHOVER PLUGIN DEFINITION
  // ==========================

  var old = $.fn.pophover

  $.fn.pophover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.pophover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.pophover', (data = new Pophover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.pophover.Constructor = Pophover


  // POPHOVER NO CONFLICT
  // ====================

  $.fn.pophover.noConflict = function () {
    $.fn.pophover = old
    return this
  }

}(jQuery);
