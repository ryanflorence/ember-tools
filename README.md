Ember Tools
-----------

![demo](http://cl.ly/image/2G0x323u150m/ember.gif)

## Installation

`npm install -g ember-tools`

## Features

- prescribed file organization for sanity
- scaffolding for learning curve mitigation
- template precompilation for performance
- single file application build for convenience
- generators for faster application development
- commonjs (node) style modules for js community <3 and isolated testing

## Version Information

**Current Version: 0.1.1**

Package versions:

- ember 1.0.0-RC.2
- ember-data rev 11
- handlebars 1.0.0-rc.3
- jQuery 1.9.1

## Quickstart

```
npm install -g ember-tools
mkdir my-app && cd my-app
ember create js
ember generate --scaffold person name:string age:number
ember build
open js/index.html
# visit #/people
```

**IMPORTANT**: Your ember application is a sub-directory of a bigger project directory. There is an `.ember` file that gets created in the directory from which `ember create` is called. Its used for other `ember` commands.

## Usage

```
  Usage: ember [command] [options]

  Command-Specific Help

    ember [command] --help

  Commands:

    create                 creates a new ember application
    build                  compiles templates and builds the app
    generate [options]     generates application files
    precompile [options]   precompile templates from src dir to target dir

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Generator Examples

| options | object name | file |
| --------|-------------|------|
| `--model, -m burrito` | `Burrito` | `models/burrito.js` |
| `--view, -v burrito` | `BurritoView` | `views/burrito.js` |
| `--controller, -c post/comments` | `PostCommentsController` | `controllers/post/comments.js` |
| `--template, -t post/comments` | n/a | `templates/post/comments.handlebars` |
| `--route, -r taco_cart` | `TacoCartRoute` | `routes/taco_cart.js` |
| `--mixin, -x tacoable` | `Tacoable` | `mixins/tacoable.js` |
| `-mvcrt tacos` | `Taco` <br>`TacosView` <br>`TacosController` <br>`TacosRoute` | `models/taco.js` <br>`views/tacos_view` <br>`controllers/tacos_controller.js` <br>`routes/taco_route.js` <br>`templates/tacos.handlebars`|

_Notes:_

- Models will always be singular.
- Sub-directories will be created for you if they don't exist.
- Files will be overwritten **without warning** (for now, anyway).


## Roadmap

- some refactoring and unit tests (its pretty much a bunch of integration tests right now)
- travis-ci
- baked in testing and generated tests
- support for custom application namespace (instead of just `App`)
- warn before overwriting a file
- build application.js to optional path
- emblem.js templates
- AMD generators/build
- ES6 module generators/build

## License and Copyright

[MIT Style License](http://opensource.org/licenses/MIT)

Copyright &copy; 2013 [Ryan Florence](http://ryanflorence.com)

## Contributing

Run tests with:

`npm test`

Or just use mocha:

`mocha test/build --watch`

Its usually easiest to create a branch and send a pull request against that branch instead of master. Single commits are preferred (no big deal though, I can squash and cherry-pick).
