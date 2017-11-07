// css, images and fonts
require('./../css/app.css');
require('./../css/images/ome-icon-opacity.png');

// deps
import $ from "jquery";
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    /**
     * the ajax request object
     * @memberof App
     * @type {Object}
     */
    request = null;

    /**
     * the component's state
     * @memberof App
     * @type {Object}
     */
    state = { projects : null, error: null };

    constructor() {
      super();
    }

    componentDidMount() {
        this.requestData();
    }

    componentWillUnmount() {
        if (this.request) this.request.abort();
    }

    requestData() {
        this.request =
            $.ajax({
                url: window.PARAMS.WEB_API + "/m/projects?limit=10",
                success:  (response) => {
                    if (response && Array.isArray(response.data)) {
                            this.setState({projects: response.data, error: null});
                    } else this.setState({error: "No Response"});
                },
                error: (error) => {
                    this.setState({"error": "failed to retrieve the project list."});
                    console.error(error);
                }
            });
    }

    render() {
        if (this.request === null) return null;
        if (typeof this.state.error === 'string') {
            return this.state.error;
        } else {
            if (this.state.projects.length === 0) return "Empty Project List";
            let rows = [];
            for (let d in this.state.projects) {
                let proj = this.state.projects[d];
                rows.push(
                    <tr>
                        <td>
                        { typeof proj['@id'] === 'number' ? proj['@id'] : '' }
                        </td>
                        <td>
                        { typeof proj.Name === 'string' ? proj.Name : '' }
                        </td>
                        <td>
                        { typeof proj.Description === 'string' ? proj.Description : '' }
                        </td>
                    </tr>
                );
            }

            return (
                <table>
                    <thead><tr><td>Id</td><td>Name</td><td>Desc</td></tr></thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            );
        }
    }
}

/* IMPORTANT:
 * we have to set the public path here to include any potential prefix
 * has to happen before the bootstrap!
 */
let prefix = typeof window.URI_PREFIX === 'string' || "";
__webpack_public_path__ = prefix + '/static/react_example/';

render(<App/>, $('#app').get(0));
