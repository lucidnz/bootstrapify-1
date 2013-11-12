Bootstrapify 3.0
=================

**Note:** 3.0 is a refactoring of 2.0 to convert to [Bootstrap 3](http://twitter.github.com/bootstrap). Feel free to fork and submit pull-requests or submit an issue if you find something not working.

Bootstrapify is an open-source base theme for [Shopify](http://www.shopify.com?ref=lucid-design) that makes it super quick and easy for developers to start building amazing, responsive themes without having to do all the fiddly, repetitive setup work when starting from scratch.

You can view the Bootstrapify theme at http://bootstrapify-theme.myshopify.com.

Quick start
-----------

Download the repo and install it in your Shopify site or, *better yet,* clone it and use the excellent [Shopify Theme gem](https://github.com/Shopify/shopify_theme).


Sass Bootstrap
--------------

Because [Shopify lets us use SCSS](http://ecommerce.shopify.com/c/ecommerce-design/t/you-can-now-use-scss-in-shopify-s-template-editor-133389) we are using a [SASS port of Bootstrap](https://github.com/jlong/sass-bootstrap).
This means that you can also use SCSS without having mixed languages in the same project.


Workflow
--------

There is one caveat with using SCSS with Shopify: They don't support `@import`... yet.
So to keep Bootstrap intact and updateable we have created a workflow for working with this theme.

Styles.scss is kept outside the theme directory and is compiled using your favourite [SASS compiler](http://incident57.com/codekit/) into `assets/_base.css`.

We use the [Shopify Theme gem](https://github.com/Shopify/shopify_theme) to watch the theme directory and push any changes up to Shopify.


Bootstrap and Bower
-------------------

To keep [Bootstrap](https://github.com/jlong/sass-bootstrap) up-to-date we have used the [Bower package manager](http://bower.io/) by Twitter.
This is simpiler than using crazy nested git repos.

If you want to keep Bootstrapify in the state that it is in when you get it then you don't need to do a thing.

If you wish to update Bootstrap then you will need to install Bower:
Bower depends on [Node](http://nodejs.org/) and [npm](https://npmjs.org/) so download and install Node if you haven't already.

Install Bower globally using npm:

    npm install -g bower
  
To update Bootstrap run:

    bower update sass-bootstrap
  

Bugs, issues or feature requests
-----------

Please create an issue here on GitHub at https://github.com/luciddesign/bootstrapify/issues


Contributing
------------

Feel free to make pull requests.

Credits
------------

Needless to say, we couldn't have done this without the awesome [Twitter Bootstrap](http://twitter.github.com/bootstrap) project which this is based on,
or the [SASS port of Bootstrap](https://github.com/jlong/sass-bootstrap).

Huge huge respect and many thanks for what these guys have created!


Copyright and license
---------------------

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
