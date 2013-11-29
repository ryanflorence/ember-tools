REWRITE: ember-tools
--------------------

This is the rewrite branch of ember-tools, rewritten with loom + grunt.

Quick Start:
------------

```sh
$ git clone https://github.com/rpflorence/ember-tools.git my-app
$ cd my-app
$ npm install -g bower
$ bower install
$ npm install
$ grunt
# open index.html
```

The output of all this is simply `build/application.js`. Include it into
your app however you want, the `index.html` is not intended to be used
in production, change it to suit your needs.

> Hey, what happened to `ember create my-app`?

It'll come back.

> Hey, how do I generate stuff?

```sh
# assuming node_modules/.bin/ is in your path
$ generate controller index

# if not...
$ node_modules/.bin/generate component x-foo
```

Ember tools now uses [loom][1], more specifically it uses
[loom-generators-ember][2], go there to see what generators are
available.

> Hey, what happened to all the other stuff?!

The good parts will come back (like the build options, etc.)

Also:

Whats next before release
-------------------------

- sort out the command line stuff
- write and include test generator set
- production build

  [1]:https://github.com/rpflorence/loom
  [2]:https://github.com/rpflorence/loom-generators-ember

