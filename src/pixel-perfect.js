/*!
 * Pixel Perfect jQuery Plugin 
 * Author: @stefanoortisi
 * 
 * Licensed under the MIT license
 */

(function(e){"use strict";function t(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function s(e,t){var s=n(e,t)?i:r;s(e,t)}var n,r,i;if("classList"in document.documentElement){n=function(e,t){return e.classList.contains(t)};r=function(e,t){e.classList.add(t)};i=function(e,t){e.classList.remove(t)}}else{n=function(e,n){return t(n).test(e.className)};r=function(e,t){if(!n(e,t)){e.className=e.className+" "+t}};i=function(e,n){e.className=e.className.replace(t(n)," ")}}var o={hasClass:n,addClass:r,removeClass:i,toggleClass:s,has:n,add:r,remove:i,toggle:s};if(typeof define==="function"&&define.amd){define(o)}else{e.classie=o}})(window)
__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };


var pixelperfect = function() {

    var defaults = {
        prefix: "pixelperfect",
        dat_gui: true,
        visible: false,
        align: "center",
        opacity: 0.8
    };

    var image, toggle_button, original_overflow;

    function merge_options(obj1,obj2){

        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    function create_gui( ) {
        var DatConf = function() {
          this.opacity = defaults.opacity;
          this.show = false;
        };
    
        var conf = new DatConf();
        var gui = new dat.GUI();
        gui.add(conf, 'opacity', 0, 1).onChange( pixelperfect.set_opacity );
        gui.add(conf, 'preview').onChange( pixelperfect.toggle );
        var element_dat = document.querySelectorAll( ".dg.ac" )[0];
        classie.addClass( element_dat, defaults.prefix + "-dat" );

    }

    function add_ui( callback ) {
        
        if( typeof dat == "undefined" ){
            add_button();
        }
        
        
        add_image( defaults.image, callback );

        original_overflow = document.body.style.overflow;

    }

    function add_image( src, callback ) {
        var img = new Image()
        img.onload = function() {
            image = document.createElement( "img" );
            image.setAttribute( "class", defaults.prefix + "-image" );
            image.src = src;
            document.body.appendChild( image );

            if( defaults.align === "center" ){
                classie.addClass( image, "align-center" );
                image.style.marginLeft = - ( image.width / 2 ) + "px"
            }

            callback();
        }

        img.src = src;
    }

    function add_button() {
        toggle_button = document.createElement( "a" );
        toggle_button.setAttribute('class', defaults.prefix + '-btn');
        toggle_button.setAttribute('href', 'javascript:pixelperfect.toggle();');

        var icon = document.createElement( "span" );
        icon.innerHTML = "on/off";
        icon.setAttribute('class', defaults.prefix + '-btn-span');
        toggle_button.appendChild( icon );

        document.body.appendChild( toggle_button );
    }

    function show( el ){
        el.style.display = "none";
    }

    function hide( el ){
        el.style.display = "block";
    }

    return {

        init: function(options) {

            this.toggle         = __bind(this.toggle, this);
            this.set_opacity    = __bind(this.set_opacity, this);


            defaults = merge_options( defaults, options );

            defaults.dat_gui = typeof dat != "undefined"

            if( defaults.dat_gui ){
                create_gui();
            }

            add_ui( function() { 
                pixelperfect.set_opacity( defaults.opacity );
            });
            
        },

        toggle: function( ) {
    
            classie.toggle( image, "activated");
            if( !defaults.dat_gui ){
                classie.toggle( toggle_button, "activated");    
            }
            

            if( defaults.visible ) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = original_overflow;
            }

        },

        set_opacity: function( value ) {
            image.style.opacity = value
        }

        
    };

}();
