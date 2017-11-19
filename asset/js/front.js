(function ($) {
    //Fix navbar multiple level
    var navbar = $('.pi-navbar-nav');
    var hasBrand = navbar.parents('.navbar').find('.navbar-brand').length;
    navbar.find('>li').each(function () {
        var $this = $(this);
        var caretStr = '<span class="pi-navbar-caret"></span>';
        caretStr += '<span class="pi-navbar-caret pi-navbar-caret-outer"></span>';
        if ($this.find('li').length) {
            $this.append(caretStr);
        }
    });
    navbar.find('ul').addClass('dropdown-menu');

    if (!hasBrand) {
        navbar.css('marginLeft', '-15px');
    }
})(jQuery)


/* =============================================================
 * bootstrap-myCollapse.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#myCollapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* myCollapse PUBLIC CLASS DEFINITION
     * ================================ */

    var myCollapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.myCollapse.defaults, options)

        if (this.options.parent) {
            this.$parent = $(this.options.parent)
        }

        this.options.toggle && this.toggle()
    }

    myCollapse.prototype = {

        constructor: myCollapse

        , dimension: function () {
            var hasWidth = this.$element.hasClass('width')
            return hasWidth ? 'width' : 'height'
        }

        , show: function () {
            var dimension
                , scroll
                , actives
                , hasData

            if (this.transitioning || this.$element.hasClass('in')) return

            dimension = this.dimension()
            scroll = $.camelCase(['scroll', dimension].join('-'))
            actives = this.$parent && this.$parent.find('> .accordion-group > .in')

            if (actives && actives.length) {
                hasData = actives.data('myCollapse')
                if (hasData && hasData.transitioning) return
                actives.myCollapse('hide')
                hasData || actives.data('myCollapse', null)
            }

            this.$element[dimension](0)
            this.transition('addClass', $.Event('show'), 'shown')
            $.support.transition && this.$element[dimension](this.$element[0][scroll])
        }

        , hide: function () {
            var dimension
            if (this.transitioning || !this.$element.hasClass('in')) return
            dimension = this.dimension()
            this.reset(this.$element[dimension]())
            this.transition('removeClass', $.Event('hide'), 'hidden')
            this.$element[dimension](0)
        }

        , reset: function (size) {
            var dimension = this.dimension()

            this.$element
                .removeClass('myCollapse')
                [dimension](size || 'auto')
                [0].offsetWidth

            this.$element[size !== null ? 'addClass' : 'removeClass']('myCollapse')

            return this
        }

        , transition: function (method, startEvent, completeEvent) {
            var that = this
                , complete = function () {
                if (startEvent.type == 'show') that.reset()
                that.transitioning = 0
                that.$element.trigger(completeEvent)
            }

            this.$element.trigger(startEvent)

            if (startEvent.isDefaultPrevented()) return

            this.transitioning = 1

            this.$element[method]('in')

            $.support.transition && this.$element.hasClass('myCollapse') ?
                this.$element.one($.support.transition.end, complete) :
                complete()
        }

        , toggle: function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']()
        }

    }


    /* myCollapse PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.myCollapse

    $.fn.myCollapse = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('myCollapse')
                , options = $.extend({}, $.fn.myCollapse.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('myCollapse', (data = new myCollapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.myCollapse.defaults = {
        toggle: true
    }

    $.fn.myCollapse.Constructor = myCollapse


    /* myCollapse NO CONFLICT
     * ==================== */

    $.fn.myCollapse.noConflict = function () {
        $.fn.myCollapse = old
        return this
    }


    /* myCollapse DATA-API
     * ================= */

    $(document).on('click.myCollapse.data-api', '[data-toggle=myCollapse]', function (e) {
        var $this = $(this), href
            , target = $this.attr('data-target')
            || e.preventDefault()
            || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
            , option = $(target).data('myCollapse') ? 'toggle' : $this.data()
        $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('myCollapsed')
        $(target).myCollapse(option)
    })

}(window.jQuery);