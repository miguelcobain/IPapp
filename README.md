# Using IPapp #

IPapp is an [Instant Places](http://www.instantplaces.org/) application generator. It will create the basic application structure, contact points and will keep your manifest file updated in the process.

It is a recommended workflow as it will guide you and help you getting started with Instant Places Applications.

## Installation ##

IPapp is written in NodeJS, and as such it is cross-platform. Just grab a suitable copy for your platform from the [official site](http://nodejs.org/#download) and install it. The installer should include [npm](http://npmjs.org/), so you can run:

    npm install -g ipapp

And we're done. IPapp is installed. You should now have an `ipapp` executable available in your system.

## Application Initialization ##

The first thing you need is a project folder. Any folder will do the job.
Then, in the folder, run the initialization command:

    ipapp init

The generator will then ask you about some details of your application:

- **name**
- **description**
- **version** of the application as specified by [Semantic Versioning](http://semver.org/).
  It's important to keep track of your package versions [in a smart way](http://blog.nodejitsu.com/package-dependencies-done-right).
- **your name**
- **your e-mail**
- and some **keywords** that properly identify your application.



This information is required to generate the first version of your `manifest.json` file. This file should be in the root folder and contain the details you previously entered.

Additionally, a basic structure of your application should exist in your directory. Besides the `manifest.json`file, a common folder was also created. This is were you should put the files shared among contact points or configuration views.

## Generating Contact Points ##

Your application won't do much until you generate some contact points. At the moment, the generator supports the following contact points:

- Public display
- Mobile Device
- Place Web Page

To generate a contact point just run the following command in your project's root folder:

    ipapp contactpoint <type>

The `type` argument can be `display`, `mobile` or `web`.
Notice that the manifest file is updated with the corresponding contact point that was generated.
This command will check for the manifest file, so *it is mandatory to run it in a previously initialized project*.

## Configuration Views ##

Instant Places applications require 

## Serving Your Application ##

For development purposes, IPapp is bundled with a simple static http server. You can use it to quickly test your application, without any deployment process. To use it, you can run:

    ipapp server

This will start the http server in port 8888, by default. Optionally you can set a specific port:

    ipapp server 12345

## Future Work ##

- Application Build:
 - Minify CSS and javascripts
 - Compile Coffescript and Less
 - Maybe using [Collate](https://github.com/jmlewis/collate)

- Better support for configuration views generation.

- Support for publishing an application.

- Web frontend.

- IDE frontend.

## Regular Application Structure: ##

    +-AppName/
      +-display/
      | +-index.html
      | +-activation.html
      | +-style/
      | | +-style.css
      | +-script/
      |   +-lib/
      |     +-specific_lib.js
      |   +-main.js
      +-mobile/
      | +-index.html
      | +-activation.html
      | +-style/
      | | +-style.css
      | +-script/
      |   +-main.js
      +-common/
      | +-script/
      | | +-api.js
      | | +-scheduler.js
      | | +-presentation_units.js
      | | +-other_libraries.js
      | +-style/
      | | +-global.css
      | +-img/
      |   +-logo.png
      |   +-user.png
      +-subscription/
      |   +-index.html
      +-manifest.json