//// OomFoo //// 1.1.5 //// February 2018 //// http://oom-foo.loop.coop/ ///////

"use strict";
!function(ROOT) {
  'use strict';
  if ('function' !== typeof jQuery)
    throw Error('jQuery not found');
  jQuery(function($) {
    var outers = window.outers = [];
    Vue.component('property-table', {
      template: "\n  <table v-bind:class=\"{ hid: doHide }\">\n    <caption v-html=\"caption\"></caption>\n    <tr v-for=\"val, key in obj\">\n      <td>{{key}}</td>\n      <td>\n        <input v-if=\"isWritable(obj, key)\" v-model=\"obj[key]\">\n        <span v-else title=\"Read Only\">{{val}}</span>\n      </td>\n    </tr>\n  </table>",
      props: {
        doHide: Boolean,
        caption: String,
        obj: Object
      },
      methods: {isWritable: isWritable}
    });
    Vue.component('oom-oomfoo', {
      template: "\n<div class=\"oom-component oom-oomfoo container\">\n  <div class=\"row\">\n    <div class=\"col-sm-7 h4\">\n      {{static.NAME}}<em class=\"text-muted\">#{{instance.UUID}}</em>\n      {{instance.index+1}}&nbsp;of&nbsp;{{static.tally}}\n    </div>\n    <div class=\"col-sm-5 rr\">\n      <span class=\"btn btn-sm btn-primary\" @click=\"toggleHideData\">{{ui.hideData ? 'Show' : 'Hide'}} Data</span>\n    </div>\n  </div>\n  <property-table :obj=\"static\"   :do-hide=\"ui.hideData\"\n    :caption=\"static.NAME+' static data:'\"></property-table>\n  <property-table :obj=\"instance\" :do-hide=\"ui.hideData\"\n    :caption=\"static.NAME+'<em>#'+instance.UUID+'</em>&nbsp; instance data:'\"></property-table>\n</div>\n",
      data: function() {
        return {
          instance: outers[outers.length - 1].api,
          static: ROOT.OOM.OomFoo.api,
          ui: {
            hideData: false,
            hideInners: false
          }
        };
      },
      methods: {
        toggleHideData: toggleHideData,
        toggleHideInners: toggleHideInners
      },
      beforeCreate: function() {
        outers.push(new ROOT.OOM.OomFoo({
          firstProp: outers.length + 50,
          secondProp: new Date
        }));
      },
      created: function() {
        wrapApiGettersAndSetters(outers[outers.length - 1]);
        wrapApiGettersAndSetters(ROOT.OOM.OomFoo);
      }
    });
    new Vue({el: '#vue-only-demo'});
    function toggleHideData() {
      this.ui.hideData = !this.ui.hideData;
    }
    function toggleHideInners() {
      this.ui.hideInners = !this.ui.hideInners;
    }
    function isWritable(obj, key) {
      if (!obj.hasOwnProperty(key))
        console.log(obj, 'has no', key);
      return false !== Object.getOwnPropertyDescriptor(obj, key).writable;
    }
    function wrapApiGettersAndSetters(obj) {
      var $__4 = function(propName) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(obj.api, propName);
        var vueReactiveGetter = propertyDescriptor.get;
        var vueReactiveSetter = propertyDescriptor.set;
        if (!vueReactiveGetter) {
          return 0;
        }
        if ('wrappedGetter' === vueReactiveGetter.name)
          return 1;
        var wrappedGetter = function wrappedGetter() {
          var val = vueReactiveGetter();
          return val;
        };
        var wrappedSetter = function wrappedSetter(val) {
          if ('firstProp' === propName || 'index' === propName)
            val = +val;
          console.log('Set ' + propName + ' to ' + val);
          return vueReactiveSetter(val);
        };
        Object.defineProperty(obj.api, propName, {
          configurable: true,
          enumerable: true,
          get: wrappedGetter,
          set: wrappedSetter
        });
      },
          $__5;
      $__3: for (var propName in obj.api) {
        $__5 = $__4(propName);
        switch ($__5) {
          case 0:
            continue $__3;
          case 1:
            continue $__3;
        }
      }
    }
  });
}('object' === (typeof global === 'undefined' ? 'undefined' : $traceurRuntime.typeof(global)) ? global : this);




//// Made by Oomtility Make 1.1.5 //\\//\\ http://oomtility.loop.coop //////////
