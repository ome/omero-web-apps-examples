OMERO.web-apps-examples
=============

This template repository contains examples of OMERO.web apps for the following setups:

1. aurelia (aurelia as MVC, webpack packaging and babel transpiling)
2. backbone (grunt for building, no ecma2015 and higher)
3. minimal example (no JavaScript dependencies or build steps)
4. react (react.js, created using create-react-app)
5. webpack (jquery only, webpack packaging and babel transpiling)

See README in each one for more details.

Below we describe how to run in a development setup using Docker
to run OMERO.web, connecting to a remote OMERO.server.


Requirements
============

* Docker or OMERO.web 5.4.x or newer.
* Node.js 6 or higher (except for the 'minimal' example)


Clone this repository
---------------------

Clone this examples repo to a location of your choice:

::

    $ git clone git@github.com:will-moore/omero-web-apps-examples.git

Run your app with OMERO.web in a Docker container
-------------------------------------------------

We will run the simplest example app. This is called ``minimal_webapp``.

The following walk-through uses `omero-web-docker <https://github.com/ome/omero-web-docker/>`_
to run the app. Here we add ``minimal_webapp`` to the installed apps and map the
app directory to the ``site-packages`` directory in the Docker instance so that
python can import our ``minimal_webapp`` module.

::

    # You need to be in the project directory for this to work.
    # cd omero-web-apps-examples/

    # The OMERO server we want to connect to.
    $ host=demo.openmicroscopy.org

    # Path to the python module for the app.
    $ appdir=$(pwd)/minimal-webapp/minimal_webapp

    # Location within Docker instance we want to link the app, so it can be imported.
    $ docker_appdir=/opt/omero/web/venv/lib/python2.7/site-packages/minimal_webapp

    # This example config file installs "minimal_webapp". See the file for more details.
    $ config=$(pwd)/config.omero

    # Location within Docker instance we want to mount the config.
    $ docker_config=/opt/omero/web/config/config.omero

    # Run docker container.
    $ docker run -it --rm -e OMEROHOST=$host -p 4080:4080 -v $appdir:$docker_appdir -v $config:$docker_config openmicroscopy/omero-web-standalone

This will run Docker in the foreground, showing the output in your terminal and allowing you to
kill the container with Ctrl-C. You should see the following lines in the output, indicating
that OMERO.web is starting and the static files from your app are being included.

::

    ...
    Copying '/opt/omero/web/venv/lib/python2.7/site-packages/minimal_webapp/static/minimal_webapp/app.css'
    Copying '/opt/omero/web/venv/lib/python2.7/site-packages/minimal_webapp/static/minimal_webapp/app.js'
    ...
    Starting OMERO.web...

Now go to `http://localhost:4080/minimal_webapp/ <http://localhost:4080/minimal_webapp/>`_
in your browser.
You should be redirected to the login screen and then back to the ``minimal_webapp``
page which will display your Name and list your Projects.

Run your app with locally-installed OMERO.web
---------------------------------------------

If you have installed OMERO.web locally in a virtual environment
(instead of using Docker), you can add a
`path configuration file <https://docs.python.org/2/install/index.html#modifying-python-s-search-path>`_
to the ``site-packages`` directory to allow the
``minimal_webapp`` module to be imported.

You need to specify the directory that *contains* ``minimal_webapp``
(in this case it is the parent ``minimal-webapp`` directory) to
be added to the ``sys.path``.

::

    # Find where your python is (run this within your venv)
    $ which python
    /absolute-path/to-your/Virtual/<env_name>/bin/python

    # Create a path configuration file .pth in site-packages
    $ echo /path/to/dir/omero-web-apps-examples/minimal-webapp >> /absolute-path/to-your/Virtual/<env_name>/lib/python2.7/site-packages/minimal_webapp.pth

You also need to add your app to the :property:`omero.web.apps` setting:

.. note::

    Here we use single quotes around double quotes.

::

    $ bin/omero config append omero.web.apps '"minimal_webapp"'


Build
============

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

For more documentation on how to create a django web app and development have a look at:

1. `CreateApp <https://docs.openmicroscopy.org/latest/omero/developers/Web/CreateApp.html>`_
2. `Deployment <https://docs.openmicroscopy.org/latest/omero/developers/Web/Deployment.html>`_

For further help/documentation on the frameworks used please consult their project sites:

- http://aurelia.io/
- http://backbonejs.org/, http://underscorejs.org/
- https://reactjs.org/
- https://gruntjs.com/
- https://webpack.js.org/
- https://babeljs.io/
