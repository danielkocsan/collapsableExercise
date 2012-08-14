var Tools = {};

(function () {
    'use strict';
    Tools.Collapsable = function (element) {
        this.element = element;
        this.children = element.childNodes;
        this.openerNode = 'H3';
        this.containerNode = 'LI';
        this.collapsableNode = 'DIV';
        this.closedText = 'closed';
        this.openText = 'open';

        this.init();
    };

    Tools.Collapsable.prototype = {
        init: function () {
            this.setup();
        },

        setup: function () {
            var i = 0,
                length = this.children.length,
                element = null;

            for (i = 0; i < length; i += 1) {
                element = this.children[i];

                if (element.nodeName === this.containerNode) {
                    this.bindElement(element);
                }
            }
        },

        bindElement: function (element) {
            var elementChildren = element.childNodes,
                i = 0,
                length = elementChildren.length,
                child = null,
                opener = null,
                closure = (function (that, element) {
                    return function (event) {
                        that.handleClick(event, element);
                    };
                }(this, element));

            for (i = 0; i < length; i += 1) {
                child = elementChildren[i];

                if (child.nodeName === this.collapsableNode) {
                    if (!element.data) {
                        element.data = {};
                    }
                    if (!child.data) {
                        child.data = {};
                    }

                    child.data.originalHeight = child.clientHeight;
                    child.style.height = child.clientHeight + 'px';
                    element.data.closed = (element.className === this.closedText);
                    element.data.child = child;

                    if (element.data.closed) {
                        child.style.height = '0px';
                    }
                }

                if (child.nodeName === this.openerNode) {
                    opener = child;
                }
            }

            opener.addEventListener(
                'click',
                closure,
                true
            );
        },

        handleClick: function (event, element) {
            this.toggleElement(element, element.data.child);
        },

        toggleElement: function (element, child) {
            if (element.data.closed) {
                child.style.height = child.data.originalHeight + 'px';
                element.className = this.openText;
            } else {
                child.style.height = '0px';
                element.className = this.closedText;
            }

            element.data.closed = !element.data.closed;
        }
    };
}());