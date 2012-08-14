var Tools = {};

(function () {
    'use strict';
    Tools.Collapsable = function (element) {
        this.element = element;
        this.children = element.childNodes;
        this.openerNode = 'LI';
        this.collapsableNode = 'UL';
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
                    this.bindElmement(element);
                }
            }
        },

        bindElmement: function (element) {
            var closure = (function (that) {
                return function (event) {
                    that.handleClick(this);
                }
            }(this));

            element.addEventListener(
                'click', 
                closure, 
                true
            );
        },

        handleClick: function (element) {
            var elementChildren = element.childNodes,
                i = 0,
                length = elementChildren.length,
                child = null;
            
            for (i = 0; i < length; i += 1) {
                child = elementChildren[i];
                
                if (child.nodeName === this.collapsableNode) {
                    this.toggleElement(child);
                }
            }
        },
        
        toggleElement: function (element) {
            if (element.className === this.closedText) {
                element.className = this.openText;
            }
            else {
                element.className = this.closedText;
            }
        } 
    }
}());