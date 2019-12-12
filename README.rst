OMERO.web-apps-examples
=======================

This template repository contains examples of OMERO.web apps for the following setups:

1. minimal example (no JavaScript dependencies or build steps)
2. react (react.js, created using create-react-app)

We will run the simplest example app below. This is called ``minimal_webapp``.

See the ``react-webapp/README`` for details on building and installing that app.

Requirements
============

You can install and run the ``omero-web`` server in a Python
virtual environment or via Docker.

The ``react-webapp`` example app uses Node.js
to build the JavaScript app and requires Node.js 6 or higher.


Clone this repository
---------------------

Clone this examples repo to a location of your choice:

::

    $ git clone https://github.com/ome/omero-web-apps-examples.git


Run your app with locally-installed OMERO.web
---------------------------------------------

If you have installed OMERO.web locally in a virtual environment as
`recommended here <https://docs.openmicroscopy.org/latest/omero/developers/Web/Deployment.html>`_,
you can ``pip install`` the example apps. N.B. all examples apart from the ``minimal_webapp`` also
require a JavaScript install and build steps. See the README for each example for more details.

To install ``minimal_webapp``::

    # within your python venv:
    $ cd minimal-webapp
    $ pip install -e .

You also need to add your app to the :property:`omero.web.apps` setting:

N.B. Here we use single quotes around double quotes.

::

    $ omero config append omero.web.apps '"minimal_webapp"'

Now restart your ``omero-web`` server and go to
`http://localhost:4080/minimal_webapp/ <http://localhost:4080/minimal_webapp/>`_
in your browser.


Run your app with OMERO.web in a Docker container
-------------------------------------------------

The following walk-through uses `omero-web-docker <https://github.com/ome/omero-web-docker/>`_
to run the app. Here we add ``minimal_webapp`` to the installed apps and map the
app directory to the ``site-packages`` directory in the Docker instance so that
python can import the ``minimal_webapp`` module.

::

    # You need to be in the project directory for this to work.
    # cd omero-web-apps-examples/

    # The OMERO server we want to connect to.
    $ host=demo.openmicroscopy.org

    # Path to the Python module for the app.
    $ appdir=$(pwd)/minimal-webapp/minimal_webapp

    # Location within Docker instance we want to link the app, so it can be imported.
    $ docker_appdir=/opt/omero/web/venv3/lib/python3.6/site-packages/minimal_webapp

    # This example config file installs "minimal_webapp". See the file for more details.
    $ config=$(pwd)/config.omero

    # Location within Docker instance we want to mount the config.
    $ docker_config=/opt/omero/web/config/config.omero

    # Run Docker container.
    $ docker run -it --rm -e OMEROHOST=$host -p 4080:4080 -v $appdir:$docker_appdir -v $config:$docker_config openmicroscopy/omero-web-standalone:5.6.0-m4

This will run Docker in the foreground, showing the output in your terminal and allowing you to
kill the container with Ctrl-C. You should see the following lines in the output, indicating
that OMERO.web is starting and the static files from your app are being included.

::

    ...
    Copying '/opt/omero/web/venv3/lib/python3.6/site-packages/minimal_webapp/static/minimal_webapp/app.css'
    Copying '/opt/omero/web/venv3/lib/python3.6/site-packages/minimal_webapp/static/minimal_webapp/app.js'
    ...
    Starting OMERO.web...

Now go to `http://localhost:4080/minimal_webapp/ <http://localhost:4080/minimal_webapp/>`_
in your browser.


Build
=====

For building look at the READMEs of the respective setup/folder.
To use one of them as a basis for your own web app just copy its contents
into your project root and add/modify/delete accordingly.

In particular the following folders/files need adjustments/renames:

- the django plugin directories (XXXX_example)
- the django plugin files __init__.py, app.py, version.py and views.py
- add/remove/modify the used/unused css, java script and images
- add any additional js dependencies to package.json



Further Info
============

For more documentation on how to create a Django web app and development have a look at:

1. `CreateApp <https://docs.openmicroscopy.org/latest/omero/developers/Web/CreateApp.html>`_
2. `Deployment <https://docs.openmicroscopy.org/latest/omero/developers/Web/Deployment.html>`_

For further help/documentation on the frameworks used please consult their project sites:

- http://aurelia.io/
- http://backbonejs.org/, http://underscorejs.org/
- https://reactjs.org/
- https://gruntjs.com/
- https://webpack.js.org/
- https://babeljs.io/
