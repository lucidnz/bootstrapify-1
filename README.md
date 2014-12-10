# Bootstrapify 3.1.1

Bootstrapify is an open-source base theme for [Shopify](http://www.shopify.com?ref=lucid-design) that makes it super quick and easy for developers to start building amazing, responsive themes without having to do all the fiddly, repetitive setup work when starting from scratch.

You can view the Bootstrapify theme at http://bootstrapify-theme.myshopify.com.


## Getting started

Clone Bootstrapify using git or download the [zip file](https://github.com/luciddesign/bootstrapify/archive/master.zip).

    git clone git@github.com:luciddesign/bootstrapify.git

## Simple setup

If you wish to use the theme without touching the SASS or Bootstrap files then just upload `Bootstrapify.zip` to Shopify.

## Advanced setup

If you wish to develop locally and push your changes to Shopify you will need to use [Grunt.js](http://gruntjs.com/) and the [Shopify Theme gem](https://github.com/Shopify/shopify_theme).

### Workflow

To use both Shopify and Bootstrap to their full potential we concatenate Bootstraps styles with a few of our own, add some liquid and then send it to Shopify to be compiled.
The benefit of doing it this way is that we can alter Bootstraps variables directly from the theme settings and we don't have to override a whole lot of stuff with our own styles.
Our own styles are kept outside the theme directory in `dist/scss/` and are built using Grunt into `assets/_base.scss.liquid`.

To add any new styles you can either add it directly to `dist/scss/bootstrapify_overrides.scss.liquid` or include your own files in the concatenation within [Gruntfile.js](https://github.com/luciddesign/bootstrapify/blob/master/Gruntfile.js#L54-L128).

However there are two caveats with using SCSS with Shopify:

1. They don't support `@import`... yet. So to keep Bootstrap intact and updateable we have created this workflow for working with the theme.
2. They don't allow SCSS in the checkout styles, so this still has to be compiled with SASS locally.

We then use the [Shopify Theme gem](https://github.com/Shopify/shopify_theme) to watch the theme directory and push any changes up to Shopify.

The theme settings that appear in the Shopify Admin (`config/settings.html`) are generated from the YAML files in the `settings` folder using the `grunt-shopify-theme-settings` plugin. 
You can discover more about this plugin and how it works from its [GitHub page](https://github.com/discolabs/grunt-shopify-theme-settings).

### Requirements

You will need to install both [Ruby](https://www.ruby-lang.org) and [Node.js](http://nodejs.org/).
The Shopify theme gem and SASS require Ruby. Grunt.js and Bower use Node.js. Once these are installed you can setup the project.

**Before you start!**

If you don't already have Grunt and Bower installed globally on your system you need to do this, otherwise you can jump to the project setup.
To install Grunt and Bower globally using npm:

    npm install -g bower

    npm install -g grunt-cli

### Project Setup
Install Grunt's dependancies:

    npm install

Install Bootstrap and other Bower dependancies:

    bower install

Install the SASS gem and the Shopify theme gem:

    bundle install
    
Or you can do this as a nifty one liner: `npm install && bower install && bundle install`

### Setup the Shopify theme gem

Inside the theme folder run:

    theme configure [api_key] [password] [store_url]
    
More detail can be found on the [Shopify theme gems readme](https://github.com/Shopify/shopify_theme#usage)

### Build

To build the project run:

    grunt    

This will do the following:

 * Compile the SCSS files into the themes asset directory.
 * Copy Bootstraps JS files into the themes asset directory.
 * Lint the Bootstrapify JS files.

To compile the SCSS files automaticly when they are saved run:

    grunt watch

### Common issues

#### Spawn issue on 64-bit Linux systems

If you're running the task on 64-bit Linux systems, you may get a `ENOENT spawn` error when the theme settings tasks is running.
See [here](https://github.com/discolabs/grunt-shopify-theme-settings/issues/17) for more details and an easy fix.

## Bugs, issues or feature requests

Please create an issue here on GitHub at https://github.com/luciddesign/bootstrapify/issues


## Contributing

Feel free to make pull requests.


## Change log

3.1.1

 * Upgrade to version 3.1.1 of Twitter Bootstrap Sass.
 * Major overhaul of how we deal with Bootstrap!

3.1.0

 * Upgrade to version 3.1.0 of Twitter Bootstrap.
 * Added Grunt for SASS compilation, JS linting and copying files. 
 * Added Gemfile and bower.json for dependancies.
 * Moved development SCSS files into sub directory.
 
3.0.2

 * Upgrade to version 3.0.2 of Twitter Bootstrap.
 * Complete overhaul of theme settings.
 
3.0

 * Upgrade to version 3.0 of Twitter Bootstrap.
 * Complete overhaul and refactor of theme files.


## Credits

Needless to say, we couldn't have done this without the awesome [Twitter Bootstrap](http://twitter.github.com/bootstrap) project which this is based on.
Huge huge respect and many thanks for what these guys have created!


## Copyright and license

Copyright 2013 Lucid Design Limited, Nelson, New Zealand | www.luciddesign.co.nz

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
