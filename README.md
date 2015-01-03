# Versioned API Browser
This Ember Application allows you to browse API docs.


# Setup

1. Install Dependencies

  ```shell
  npm install && bower install
  ```

1. Start the app with with the following command args
  
  * `lib-dir` (path) local path to the library documented with YUIDoc
  e.g. `/usr/yourname/code/ember.js`

  * `default-index` (string) name of the class you'd like to redirect to
  when someone visits the root (`/`) of the documentation. e.g. `Ember`

  * `default-module` (string) name of the module where to look for module
  related data. YUIDoc stuffs all modules (even if you only have one) into
  `modules`: e.g. `ember`

  * `rev` (string, optional, defaults to 'master') name of the revision you are
  generating: e.g. `v1.1.0`

  * `sha` (String, optional, defaults to 'master') name of the SHA or tag. This is different
  than `rev` to allow you to publish new versions of a rev's docs that have been updated
  in future commits. So, if a spelling fixes occur in commits > v1.1.0 and < v1.1.1 you
  can publish the SHA to update: e.g. `decafbebad01` or `v1.0.0`

  * `github-url (url) github url of the project, no trailing slash: e.g. 'https://github.com/emberjs/ember.js'

  ```shell
  ember server --lib-dir=/path/to/ember.js --default-index=Ember --default-module=ember --rev=v1.0.0
  ```

1. View the app
  
  ```shell
  open http://0.0.0.0:4200
  ```
