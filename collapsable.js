var Tools = {};

(function () {
    'use strict';
    Tools.Collapsable = function (element) {
        this.element = element;
        this.children = element.childNodes;
        this.openerNode = 'LI';
        this.collapsableNode = 'DIV';
        this.closedText = 'closed',
        this.openText = 'open'

        this.init();
    }
    
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
                
                if (element.nodeName === this.openerNode) {
                    this.bindElement(element);
                }
            }
        },

        bindElement: function (element) {
            var elementChildren = element.childNodes,
                i = 0,
                length = elementChildren.length,
                child = null,
                closure = (function (that) {
                return function (event) {
                    that.handleClick(event, this);
                }
            }(this));
            
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
            }

            element.addEventListener(
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
            }
            else {
                child.style.height = '0px';
                element.className = this.closedText;
            }
            
            element.data.closed = !element.data.closed;
        } 
    }
}());