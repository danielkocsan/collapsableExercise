(function (DOC) {
    'use strict';
    var Exercise = {
        init: function () {
            this.denyLinks();
            this.initCollapsable();
        },

        denyLinks: function () {
            var links = DOC.getElementsByTagName('a'),
                i = 0,
                length = links.length,
                link = null;
            
            for (i = 0; i < length; i += 1) {
                link = links[i];
                
                link.onclick = function (event) {
                    event.preventDefault();
                }
            }
        },

        initCollapsable: function () {
            var element = DOC.getElementById('collapsable');
            
            if (!element) {
                throw new Error('Collapsable element is not found');
            }

            new Tools.Collapsable(element);
        }
    },
    closure = (function (Exercise) {
        return function () {
            Exercise.init();
        }
    }(Exercise));
    
    DOC.body.onload = closure;
}(document));