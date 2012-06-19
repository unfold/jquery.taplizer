/* jquery.taplizer by Unfold */
/* Use -webkit-tap-highlight-color: transparent; to remove tap highlight */

window.hasOwnProperty('ontouchstart') && (function() {
    var moveThreshold = 10;

    var events = {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    };

    $.event.special.click = {
        add: function(handle) {
            var originalHandler = handle.handler;

            handle.handler = function(e, triggered) {
                if(!triggered) return false;
                originalHandler.call(this, e);
            };

            handle.startHandle = function() {
                start.apply(this, arguments);
            };

            $(this).on(events.start, handle.selector, handle.startHandle);
        },

        remove: function(handle) {
            $(this).off(events.start, handle.selector, handle.startHandle);
        }
    };

    var start = function(e) {
        var startX = e.originalEvent.touches[0].screenX;
        var startY = e.originalEvent.touches[0].screenY;

        var move = function(e) {
            var movedX = Math.abs(e.originalEvent.touches[0].screenX - startX) > moveThreshold;
            var movedY = Math.abs(e.originalEvent.touches[0].screenY - startY) > moveThreshold;

            (movedX || movedY) && unbind();
        };

        var end = function() {
            unbind();
            $(this).trigger('click', true);
        };

        var unbind = $.proxy(function() {
            $(this).off(events.move, $.proxy(move, this));
            $(this).off(events.end, $.proxy(end, this));
        }, this);

        $(this).on(events.move, $.proxy(move, this));
        $(this).on(events.end, $.proxy(end, this));
    };
})();