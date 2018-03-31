<?php //\\//\\ dist/main/oom-foo.6.js



$oomClasses = Array();



$oomClasses['Oom.Foo'] = new class {
    public static $schema = null;
    public static function init () {
        if (null === self::$schema) {
            self::$schema = json_decode('{
  "stat": {
    "NAME": {
      "name": "NAME",
      "default": "Oom.Foo",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "VERSION": {
      "name": "VERSION",
      "default": "1.3.7",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "HOMEPAGE": {
      "name": "HOMEPAGE",
      "default": "http://oom-foo.loop.coop/",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "REMARKS": {
      "name": "REMARKS",
      "default": "Initial test of the oom-hub architecture",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "inst_tally": {
      "name": "inst_tally",
      "default": 0,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "The number of Oom instantiations made so far"
    },
    "hilite": {
      "name": "hilite",
      "default": "#112233",
      "isFn": false,
      "type": "color",
      "typeStr": "color",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "General purpose, useful as a dev label or status"
    },
    "LOADED_FIRST": {
      "name": "LOADED_FIRST",
      "default": true,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Boolean",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A Boolean"
    }
  },
  "attr": {
    "UUID": {
      "name": "UUID",
      "default": "@TODO",
      "isFn": true,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "Every Oom instance gets a universally unique ID"
    },
    "INST_INDEX": {
      "name": "INST_INDEX",
      "default": "@TODO",
      "isFn": true,
      "type": "nnint",
      "typeStr": "nnint",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "Every Oom instance gets an instance index, which equals its class’s `inst_tally` at the moment of instantiation. As a side effect of recording `INST_INDEX`, `inst_tally` is incremented"
    },
    "hilite": {
      "name": "hilite",
      "default": "#445566",
      "isFn": false,
      "type": "color",
      "typeStr": "color",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "General purpose, useful as a dev label or status"
    },
    "fooBar": {
      "name": "fooBar",
      "default": 1000,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "A Number"
    }
  }
}', true);
        }
        //@TODO init the stat and attr objects
    }
};
$oomClasses['Oom.Foo']::init();




$oomClasses['Oom.Foo.Post'] = new class {
    public static $schema = null;
    public static function init () {
        if (null === self::$schema) {
            self::$schema = json_decode('{
  "stat": {
    "NAME": {
      "name": "NAME",
      "default": "Oom.Foo.Post",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A String"
    },
    "VERSION": {
      "name": "VERSION",
      "default": "1.3.7",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "HOMEPAGE": {
      "name": "HOMEPAGE",
      "default": "http://oom-foo.loop.coop/",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "REMARKS": {
      "name": "REMARKS",
      "default": "@TODO",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A String"
    },
    "inst_tally": {
      "name": "inst_tally",
      "default": 0,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "The number of Oom instantiations made so far"
    },
    "hilite": {
      "name": "hilite",
      "default": "#112233",
      "isFn": false,
      "type": "color",
      "typeStr": "color",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "General purpose, useful as a dev label or status"
    },
    "LOADED_FIRST": {
      "name": "LOADED_FIRST",
      "default": true,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Boolean",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A Boolean"
    },
    "prop_d": {
      "name": "prop_d",
      "default": 100,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A Number"
    },
    "propG": {
      "name": "propG",
      "default": 44.4,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A Number"
    }
  },
  "attr": {
    "UUID": {
      "name": "UUID",
      "default": "@TODO",
      "isFn": true,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "Every Oom instance gets a universally unique ID"
    },
    "INST_INDEX": {
      "name": "INST_INDEX",
      "default": "@TODO",
      "isFn": true,
      "type": "nnint",
      "typeStr": "nnint",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "Every Oom instance gets an instance index, which equals its class’s `inst_tally` at the moment of instantiation. As a side effect of recording `INST_INDEX`, `inst_tally` is incremented"
    },
    "hilite": {
      "name": "hilite",
      "default": "#445566",
      "isFn": false,
      "type": "color",
      "typeStr": "color",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "General purpose, useful as a dev label or status"
    },
    "fooBar": {
      "name": "fooBar",
      "default": 1000,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "A Number"
    },
    "OK": {
      "name": "OK",
      "default": 123,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A Number"
    },
    "prop_d": {
      "name": "prop_d",
      "default": 5.5,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A Number"
    },
    "propG": {
      "name": "propG",
      "default": 44.4,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Post",
      "perClass": true,
      "remarks": "A Number"
    }
  }
}', true);
        }
        //@TODO init the stat and attr objects
    }
};
$oomClasses['Oom.Foo.Post']::init();




$oomClasses['Oom.Foo.Router'] = new class {
    public static $schema = null;
    public static function init () {
        if (null === self::$schema) {
            self::$schema = json_decode('{
  "stat": {
    "NAME": {
      "name": "NAME",
      "default": "Oom.Foo.Router",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A String"
    },
    "VERSION": {
      "name": "VERSION",
      "default": "1.3.7",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "HOMEPAGE": {
      "name": "HOMEPAGE",
      "default": "http://oom-foo.loop.coop/",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A String"
    },
    "REMARKS": {
      "name": "REMARKS",
      "default": "@TODO",
      "isFn": false,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A String"
    },
    "inst_tally": {
      "name": "inst_tally",
      "default": 0,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "The number of Oom instantiations made so far"
    },
    "hilite": {
      "name": "hilite",
      "default": "#112233",
      "isFn": false,
      "type": "color",
      "typeStr": "color",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "General purpose, useful as a dev label or status"
    },
    "LOADED_FIRST": {
      "name": "LOADED_FIRST",
      "default": true,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Boolean",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo",
      "perClass": true,
      "remarks": "A Boolean"
    },
    "prop_d": {
      "name": "prop_d",
      "default": 100,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A Number"
    },
    "propG": {
      "name": "propG",
      "default": 44.4,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A Number"
    }
  },
  "attr": {
    "UUID": {
      "name": "UUID",
      "default": "@TODO",
      "isFn": true,
      "type": "@TODO",
      "typeStr": "String",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "Every Oom instance gets a universally unique ID"
    },
    "INST_INDEX": {
      "name": "INST_INDEX",
      "default": "@TODO",
      "isFn": true,
      "type": "nnint",
      "typeStr": "nnint",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "Every Oom instance gets an instance index, which equals its class’s `inst_tally` at the moment of instantiation. As a side effect of recording `INST_INDEX`, `inst_tally` is incremented"
    },
    "hilite": {
      "name": "hilite",
      "default": "#445566",
      "isFn": false,
      "type": "color",
      "typeStr": "color",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "General purpose, useful as a dev label or status"
    },
    "fooBar": {
      "name": "fooBar",
      "default": 1000,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom",
      "perClass": true,
      "remarks": "A Number"
    },
    "OK": {
      "name": "OK",
      "default": 123,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A Number"
    },
    "prop_d": {
      "name": "prop_d",
      "default": 5.5,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A Number"
    },
    "propG": {
      "name": "propG",
      "default": 44.4,
      "isFn": false,
      "type": "@TODO",
      "typeStr": "Number",
      "definedIn": "@TODO",
      "definedInStr": "Oom.Foo.Router",
      "perClass": true,
      "remarks": "A Number"
    }
  }
}', true);
        }
        //@TODO init the stat and attr objects
    }
};
$oomClasses['Oom.Foo.Router']::init();




//// Made by Oomtility Make 1.3.7 //\\//\\ http://oomtility.loop.coop //////////
?>