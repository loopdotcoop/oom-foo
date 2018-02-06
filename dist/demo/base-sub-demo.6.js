//\\//\\ src/demo/Base.Sub-demo.6.js



//// OomFoo //// 1.1.5 //// February 2018 //// http://oom-foo.loop.coop/ ///////

!function (ROOT) { 'use strict'
if ('function' !== typeof jQuery) throw Error('jQuery not found')
jQuery( function($) {




//// Instance containers.
const outers = window.outers = []
const inners = window.inners = []





//// Register <property-table>, used by all Oom components in this demo.
Vue.component('property-table', {
    template: `
  <table v-bind:class="{ hid: doHide }">
    <caption v-html="caption"></caption>
    <tr v-for="val, key in obj">
      <td>{{key}}</td>
      <td>
        <input v-if="isWritable(obj, key)" v-model="obj[key]">
        <span v-else title="Read Only">{{val}}</span>
      </td>
    </tr>
  </table>`
  , props: {
        doHide: Boolean
      , caption: String
      , obj: Object
    }
  , methods: {
        isWritable
    }
})




//// Register <oom-oomfoo>, a Vue component version of OomFoo.
Vue.component('oom-oomfoo', {
    template: `
<div class="oom-component oom-oomfoo container">
  <div class="row">
    <div class="col-sm-7 h4">
      {{static.NAME}}<em class="text-muted">#{{instance.UUID}}</em>
      {{instance.index+1}}&nbsp;of&nbsp;{{static.tally}}
    </div>
    <div class="col-sm-5 rr">
      <span class="btn btn-sm btn-primary" @click="toggleHideData">{{ui.hideData ? 'Show' : 'Hide'}} Data</span>
      <span class="btn btn-sm btn-primary" @click="toggleHideInners">{{ui.hideInners ? 'Show' : 'Hide'}} Inners</span>

    </div>
  </div>
  <property-table :obj="static"   :do-hide="ui.hideData"
    :caption="static.NAME+' static data:'"></property-table>
  <property-table :obj="instance" :do-hide="ui.hideData"
    :caption="static.NAME+'<em>#'+instance.UUID+'</em>&nbsp; instance data:'"></property-table>
  <div v-bind:class="{ hid: ui.hideInners }">
    <oom-base-sub v-bind="instance"></oom-base-sub>
    <oom-base-sub v-bind="instance"></oom-base-sub>
  </div>

</div>
`
  , data: function () { return {
        instance: outers[outers.length-1].api
      , static: ROOT.OOM.OomFoo.api
      , ui: { hideData:false, hideInners:false }
    } }

  , methods: {
        toggleHideData
      , toggleHideInners
    }

    //// Generate an instance of OomFoo.
  , beforeCreate: function () {
        outers.push( new ROOT.OOM.OomFoo({
            firstProp: outers.length + 50
          , secondProp: new Date
        }) )
    }

    //// Xx.
  , created: function () {

        //// Wrap Vue’s reactive getters and setters with our own.
        wrapApiGettersAndSetters(outers[outers.length-1])
        wrapApiGettersAndSetters(ROOT.OOM.OomFoo)

    }

})




//// Register <oom-base-sub>, a Vue component version of OomFoo.Base.Sub.
Vue.component('oom-base-sub', {
    template: `
<div class="oom-component oom-base-sub container">
  <div class="row">
    <div class="col-sm-7 h4">
      {{static.NAME}}<em class="text-muted">#{{instance.UUID}}</em>
      {{instance.index+1}}&nbsp;of&nbsp;{{static.tally}}
    </div>
    <div class="col-sm-5 rr">
      <span class="btn btn-sm btn-primary" @click="toggleHideData">{{ui.hideData ? 'Show' : 'Hide'}} Data</span>
    </div>
  </div>
  <property-table :obj="static"   :do-hide="ui.hideData"
    :caption="static.NAME+' static data:'"></property-table>
  <property-table :obj="instance" :do-hide="ui.hideData"
    :caption="static.NAME+'<em>#'+instance.UUID+'</em>&nbsp; instance data:'"></property-table>
  <table v-bind:class="{ hid: ui.hideData }">
    <caption>Props, passed from outer components:</caption>
    <tr><td>firstProp</td><td>{{firstProp}}</td></tr>
    <tr><td>UUID</td><td>{{UUID}}</td></tr>
  </table>
</div>
`
  // <tr v-for="val, key in _props"><td>{{key}}</td><td>{{val}}</td></tr>

  , data: function () { return {
        instance: inners[inners.length-1].api
      , static: ROOT.OOM.OomFoo.Base.Sub.api
      , ui: { hideData:false }
    } }

  , props: {
        firstProp: Number
      , UUID: String
    }

  , methods: {
        toggleHideData
    }

    //// Generate an instance of OomFoo.Base.Sub.
  , beforeCreate: function () {
        inners.push( new ROOT.OOM.OomFoo.Base.Sub({
            thirdProp: 'inners.length: ' + inners.length
        }) )
    }

    //// Xx.
  , created: function () {

        //// Wrap Vue’s reactive getters and setters with our own.
        wrapApiGettersAndSetters(outers[outers.length-1])
        wrapApiGettersAndSetters(ROOT.OOM.OomFoo.Base.Sub)

    }
})





//// Create the root instance for the Vue-only demo.
new Vue({
    el: '#vue-only-demo'
})




//// COMPONENT METHODS


function toggleHideData () {
    this.ui.hideData = ! this.ui.hideData;
}
function toggleHideInners () {
    this.ui.hideInners = ! this.ui.hideInners;
}
function isWritable (obj, key) {
    // console.log(obj.NAME, key)
    if (! obj.hasOwnProperty(key)) console.log(obj, 'has no', key);
    return false !== Object.getOwnPropertyDescriptor(obj, key).writable
}




//// UTILITY


function wrapApiGettersAndSetters (obj) {
    for (let propName in obj.api) {
        const propertyDescriptor =
            Object.getOwnPropertyDescriptor(obj.api, propName)
        const vueReactiveGetter = propertyDescriptor.get
        const vueReactiveSetter = propertyDescriptor.set
        if (! vueReactiveGetter) { continue } // probably a non-writable property
        if ('wrappedGetter' === vueReactiveGetter.name) continue //@TODO more graceful way of avoiding double-wrap
        const wrappedGetter = function wrappedGetter () {
            const val = vueReactiveGetter()
            // console.log('get ' + propName + ' ' + val);
            return val
        }
        const wrappedSetter = function wrappedSetter (val) {
            if ('firstProp' === propName || 'index' === propName) val = +val //@TODO automate type casting from string
            console.log('Set ' + propName + ' to ' + val);
            return vueReactiveSetter(val)
        }
        // console.log('wrapped '+propName+' on '+obj.api.UUID)
        Object.defineProperty(obj.api, propName, {
            configurable:true, enumerable:true
          , get: wrappedGetter
          , set: wrappedSetter
        })
    }
}



})//jQuery()
}( 'object' === typeof global ? global : this ) // `window` in a browser




//// Made by Oomtility Make 1.1.5 //\\//\\ http://oomtility.loop.coop //////////
