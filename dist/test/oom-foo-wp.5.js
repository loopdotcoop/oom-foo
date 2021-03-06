//// Oom.Foo //// 1.3.8 //// May 2018 //// http://oom-foo.loop.coop/ ///////////

"use strict";
!function(ROOT) {
  'use strict';
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo (wp)', function() {
    describe('B.R.E.A.D. Oom.Foo instances', function() {
      var Class = ROOT.Oom.Foo,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          unchanged = new Class(),
          username = $('#wp-username').val().trim(),
          password = $('#wp-password').val().trim(),
          nameCPT = 'oom_foo';
      var wpBase = $('#wp-base').val().trim();
      wpBase += '/' === wpBase[wpBase.length - 1] ? '' : '/';
      var urlCPT = wpBase + 'wp-json/wp/v2/' + nameCPT;
      it(urlCPT + ' is recognised', function(done) {
        this.timeout(5000);
        pingPlugin();
        function pingPlugin() {
          $.ajax(wpBase + 'wp-content/plugins/oom-foo/wp-plugin.php?ping').done(function(data, textStatus, jqXHR) {
            eq(data, 'pong', 'The oom-foo plugin should ‘pong’ when you ping it');
            if ('pong' === data)
              recogniseCpt();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail', textStatus, errorThrown, jqXHR);
            done(Error('fail: ' + textStatus));
          });
        }
        function recogniseCpt() {
          $.ajax(urlCPT).done(function(data, textStatus, jqXHR) {
            is(Array.isArray(data), 'Getting wp/v2/' + nameCPT + ' should return an array');
            done();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail', textStatus, errorThrown, jqXHR);
            done(Error('fail: ' + errorThrown));
          });
        }
      });
      it(("Create an " + nameCPT + " via WP API, " + username + ":" + password), function(done) {
        this.timeout(5000);
        var title = 'A cyan Oom.Foo, unit test random = ' + Math.random();
        var goodAuth = window.btoa(username + ":" + password);
        var goodSettings = {
          contentType: 'application/json',
          method: 'POST',
          url: urlCPT,
          crossDomain: true,
          beforeSend: function(xhr) {
            return xhr.setRequestHeader('Authorization', 'Basic ' + goodAuth);
          },
          data: JSON.stringify({
            title: title,
            status: 'publish',
            hilite: '#00ccdd'
          })
        };
        var badSettings = Object.assign({}, goodSettings, {beforeSend: function(xhr) {}});
        unauthorizedCreate();
        function unauthorizedCreate() {
          $.ajax(badSettings).done(function(data, textStatus, jqXHR) {
            done(Error('Incorrect success: should have failed'));
          }).fail(function(jqXHR, textStatus, errorThrown) {
            eq(errorThrown, 'Unauthorized', 'POSTing without authorization gets a WP API error');
            if ('Unauthorized' === errorThrown)
              createCpt();
          });
        }
        function createCpt() {
          $.ajax(goodSettings).done(function(data, textStatus, jqXHR) {
            console.log('in Done');
            eq(data.title.raw, title, 'Created a CPT with title ' + title);
            eq(data.hilite, '#00ccdd', 'Created a CPT with hilite #00ccdd');
            done();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            if ('Unauthorized' === errorThrown)
              console.warn(errorThrown, '\n1. Check username and password', '\n2. Check the ‘JSON Basic Authentication’ plugin is activated', '\n3. Check the ‘Application Passwords’ plugin is activated', '\n4. in .htaccess after ‘RewriteEngine On’, add:', '\n  RewriteRule .* - [E=REMOTE_USER:%{HTTP:Authorization}]', '\n  (see https://goo.gl/2sWYAA)', jqXHR);
            done(Error('fail: ' + errorThrown + '\n'));
          });
        }
      });
    });
  });
}(window);
!function(ROOT) {
  'use strict';
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo.Post (wp)', function() {
    describe('B.R.E.A.D. Oom.Foo.Post instances', function() {
      var Class = ROOT.Oom.Foo.Post,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          unchanged = new Class(),
          username = $('#wp-username').val().trim(),
          password = $('#wp-password').val().trim(),
          nameCPT = 'oom_foo_post';
      var wpBase = $('#wp-base').val().trim();
      wpBase += '/' === wpBase[wpBase.length - 1] ? '' : '/';
      var urlCPT = wpBase + 'wp-json/wp/v2/' + nameCPT;
      it(urlCPT + ' is recognised', function(done) {
        this.timeout(5000);
        pingPlugin();
        function pingPlugin() {
          $.ajax(wpBase + 'wp-content/plugins/undefined/wp-plugin.php?ping').done(function(data, textStatus, jqXHR) {
            eq(data, 'pong', 'The undefined plugin should ‘pong’ when you ping it');
            if ('pong' === data)
              recogniseCpt();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail', textStatus, errorThrown, jqXHR);
            done(Error('fail: ' + textStatus));
          });
        }
        function recogniseCpt() {
          $.ajax(urlCPT).done(function(data, textStatus, jqXHR) {
            is(Array.isArray(data), 'Getting wp/v2/' + nameCPT + ' should return an array');
            done();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail', textStatus, errorThrown, jqXHR);
            done(Error('fail: ' + errorThrown));
          });
        }
      });
      it(("Create an " + nameCPT + " via WP API, " + username + ":" + password), function(done) {
        this.timeout(5000);
        var title = 'A cyan Oom.Foo.Post, unit test random = ' + Math.random();
        var goodAuth = window.btoa(username + ":" + password);
        var goodSettings = {
          contentType: 'application/json',
          method: 'POST',
          url: urlCPT,
          crossDomain: true,
          beforeSend: function(xhr) {
            return xhr.setRequestHeader('Authorization', 'Basic ' + goodAuth);
          },
          data: JSON.stringify({
            title: title,
            status: 'publish',
            hilite: '#00ccdd'
          })
        };
        var badSettings = Object.assign({}, goodSettings, {beforeSend: function(xhr) {}});
        unauthorizedCreate();
        function unauthorizedCreate() {
          $.ajax(badSettings).done(function(data, textStatus, jqXHR) {
            done(Error('Incorrect success: should have failed'));
          }).fail(function(jqXHR, textStatus, errorThrown) {
            eq(errorThrown, 'Unauthorized', 'POSTing without authorization gets a WP API error');
            if ('Unauthorized' === errorThrown)
              createCpt();
          });
        }
        function createCpt() {
          $.ajax(goodSettings).done(function(data, textStatus, jqXHR) {
            console.log('in Done');
            eq(data.title.raw, title, 'Created a CPT with title ' + title);
            eq(data.hilite, '#00ccdd', 'Created a CPT with hilite #00ccdd');
            done();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            if ('Unauthorized' === errorThrown)
              console.warn(errorThrown, '\n1. Check username and password', '\n2. Check the ‘JSON Basic Authentication’ plugin is activated', '\n3. Check the ‘Application Passwords’ plugin is activated', '\n4. in .htaccess after ‘RewriteEngine On’, add:', '\n  RewriteRule .* - [E=REMOTE_USER:%{HTTP:Authorization}]', '\n  (see https://goo.gl/2sWYAA)', jqXHR);
            done(Error('fail: ' + errorThrown + '\n'));
          });
        }
      });
    });
  });
}(window);
!function(ROOT) {
  'use strict';
  if (false)
    return;
  var $__2 = ROOT.testify(),
      describe = $__2.describe,
      it = $__2.it,
      eq = $__2.eq,
      neq = $__2.neq,
      is = $__2.is,
      goodVals = $__2.goodVals,
      badVals = $__2.badVals;
  var $__3 = Oom.KIT,
      isConstant = $__3.isConstant,
      isReadOnly = $__3.isReadOnly,
      isReadWrite = $__3.isReadWrite;
  describe('Oom.Foo.Router (wp)', function() {
    describe('B.R.E.A.D. Oom.Foo.Router instances', function() {
      var Class = ROOT.Oom.Foo.Router,
          schema = Class.schema,
          instance = new Class(),
          attr = instance.attr,
          unchanged = new Class(),
          username = $('#wp-username').val().trim(),
          password = $('#wp-password').val().trim(),
          nameCPT = 'oom_foo_router';
      var wpBase = $('#wp-base').val().trim();
      wpBase += '/' === wpBase[wpBase.length - 1] ? '' : '/';
      var urlCPT = wpBase + 'wp-json/wp/v2/' + nameCPT;
      it(urlCPT + ' is recognised', function(done) {
        this.timeout(5000);
        pingPlugin();
        function pingPlugin() {
          $.ajax(wpBase + 'wp-content/plugins/undefined/wp-plugin.php?ping').done(function(data, textStatus, jqXHR) {
            eq(data, 'pong', 'The undefined plugin should ‘pong’ when you ping it');
            if ('pong' === data)
              recogniseCpt();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail', textStatus, errorThrown, jqXHR);
            done(Error('fail: ' + textStatus));
          });
        }
        function recogniseCpt() {
          $.ajax(urlCPT).done(function(data, textStatus, jqXHR) {
            is(Array.isArray(data), 'Getting wp/v2/' + nameCPT + ' should return an array');
            done();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('fail', textStatus, errorThrown, jqXHR);
            done(Error('fail: ' + errorThrown));
          });
        }
      });
      it(("Create an " + nameCPT + " via WP API, " + username + ":" + password), function(done) {
        this.timeout(5000);
        var title = 'A cyan Oom.Foo.Router, unit test random = ' + Math.random();
        var goodAuth = window.btoa(username + ":" + password);
        var goodSettings = {
          contentType: 'application/json',
          method: 'POST',
          url: urlCPT,
          crossDomain: true,
          beforeSend: function(xhr) {
            return xhr.setRequestHeader('Authorization', 'Basic ' + goodAuth);
          },
          data: JSON.stringify({
            title: title,
            status: 'publish',
            hilite: '#00ccdd'
          })
        };
        var badSettings = Object.assign({}, goodSettings, {beforeSend: function(xhr) {}});
        unauthorizedCreate();
        function unauthorizedCreate() {
          $.ajax(badSettings).done(function(data, textStatus, jqXHR) {
            done(Error('Incorrect success: should have failed'));
          }).fail(function(jqXHR, textStatus, errorThrown) {
            eq(errorThrown, 'Unauthorized', 'POSTing without authorization gets a WP API error');
            if ('Unauthorized' === errorThrown)
              createCpt();
          });
        }
        function createCpt() {
          $.ajax(goodSettings).done(function(data, textStatus, jqXHR) {
            console.log('in Done');
            eq(data.title.raw, title, 'Created a CPT with title ' + title);
            eq(data.hilite, '#00ccdd', 'Created a CPT with hilite #00ccdd');
            done();
          }).fail(function(jqXHR, textStatus, errorThrown) {
            if ('Unauthorized' === errorThrown)
              console.warn(errorThrown, '\n1. Check username and password', '\n2. Check the ‘JSON Basic Authentication’ plugin is activated', '\n3. Check the ‘Application Passwords’ plugin is activated', '\n4. in .htaccess after ‘RewriteEngine On’, add:', '\n  RewriteRule .* - [E=REMOTE_USER:%{HTTP:Authorization}]', '\n  (see https://goo.gl/2sWYAA)', jqXHR);
            done(Error('fail: ' + errorThrown + '\n'));
          });
        }
      });
    });
  });
}(window);




//// Made by Oomtility Make 1.3.8 //\\//\\ http://oomtility.loop.coop //////////
