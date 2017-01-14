import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';


class Spirograph extends React.Component {

    draw () {
        this.theta = 0;
        this.max = this._getMaxLoops(); // figure out when we need to stop looping

        var currView = this;
        this.interval = setInterval(function() { currView.nextLine(); }, 30);
    }

    render () {
        return (
            <section>
            </section>
        );
    }
}


export default Spirograph;
