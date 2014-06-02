# Bootstrapify 3.1.0

Bootstrapify is an open-source base theme for [Shopify](http://www.shopify.com?ref=lucid-design) that makes it super quick and easy for developers to start building amazing, responsive themes without having to do all the fiddly, repetitive setup work when starting from scratch.

You can view the Bootstrapify theme at http://bootstrapify-theme.myshopify.com.


## Getting started

Clone Bootstrapify using git or download the [zip file](https://github.com/luciddesign/bootstrapify/archive/master.zip).

    git clone git@github.com:luciddesign/bootstrapify.git

## Simple setup

If you wish to use the theme without touching the SASS or Bootstrap files then just remove everything except the theme folder. Create a zipped file of the theme folder and upload this to Shopify.

## Advanced setup

If you wish to develop locally and push your changes to Shopify you will need to use [Grunt.js](http://gruntjs.com/) and the [Shopify Theme gem](https://github.com/Shopify/shopify_theme).

### Workflow

There is one caveat with using SCSS with Shopify: They don't support `@import`... yet.
So to keep Bootstrap intact and updateable we have created a workflow for working with this theme.

Styles.scss is kept outside the theme directory and is compiled using Grunt into `assets/_base.css`.

We use the [Shopify Theme gem](https://github.com/Shopify/shopify_theme) to watch the theme directory and push any changes up to Shopify.

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


## Bugs, issues or feature requests

Please create an issue here on GitHub at https://github.com/luciddesign/bootstrapify/issues


## Contributing

Feel free to make pull requests.


## Change log

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
