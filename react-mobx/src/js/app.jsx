import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import store from './store';
import Header from './header';
import Panels from './panels';
import C from './constants';


class App extends React.Component {

    // populate the store with the default panels
    constructor (props) {
        super(props);

        _.each(C.DEFAULT_PANEL_CUSTOMIZATIONS, (panel) => {
            const settings = Object.assign({}, C.PANEL_DEFAULTS, panel);
            props.store.addPanel(settings);
        });
    }

    render () {
        const { store } = this.props;
        return (
            <div className="body-content">
                <Header store={store} />
                <Panels store={store} />
            </div>
        )
    }
}


// initialize the whole shebang
ReactDOM.render(<App store={store} />, document.getElementById('app'));

