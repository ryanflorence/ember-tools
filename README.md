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

**Current Version: 0.2.0**

Package versions:

- ember v1.0.0-RC.5
- ember-data revision 12
- handlebars v1.0.0-rc.4
- jQuery 1.9.1

## Quickstart

```
npm install -g ember-tools
ember create my-app
cd my-app
ember generate --scaffold person name:string age:number
ember build
open js/index.html
# visit #/people
```

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
| `--helper, -l all_caps` | `allCaps` | `helpers/all_caps.js` |
| `-mvcrt tacos` | `Taco` <br>`TacosView` <br>`TacosController` <br>`TacosRoute` | `models/taco.js` <br>`views/tacos_view` <br>`controllers/tacos_controller.js` <br>`routes/taco_route.js` <br>`templates/tacos.handlebars`|

_Notes:_

- Models will always be singular.
- Sub-directories will be created for you if they don't exist.

## License and Copyright

[MIT Style License](http://opensource.org/licenses/MIT)

Copyright &copy; 2013 [Ryan Florence](http://ryanflorence.com)

## Contributing

Run tests with:

`npm test`

and the browser sanity tests:

`npm run-script browser`

Its usually easiest to create a branch and send a pull request against that branch instead of master. Single commits are preferred (no big deal though, I can squash and cherry-pick).

Thanks for using ember-tools!

