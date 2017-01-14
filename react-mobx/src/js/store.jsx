import { observable, action, asStructure } from 'mobx';
import uuid from 'node-uuid';
import $ from 'jquery';
import _ from 'lodash';


class Store {
    @observable panels = [];
    @observable windowHeight;
    @observable windowWidth;

    constructor() {
        $(window).resize(() => {
            this.updateWindowDimensions();
        });
    }

    updateWindowDimensions () {
        this.windowHeight = $(window).height();
        this.windowWidth = $(window).width();
    }

    addPanel (params) {
        this.panels.push(new Panel(this, params));
    }

    @action removePanel (panel) {
        this.panels.splice(this.panels.indexOf(panel), 1);
    }
}


class Panel {
    id = null; // immutable

    @observable currTab = '';

    @observable innerCircleSizePercentage = 50;
    @observable pointFromCenterPercentage = 50;
    @observable speed = 150;
    @observable lineThickness = 1;
    @observable lineTransparency = 0.5;
    @observable lineColorHex = '#0044cc';
    @observable lineColor = {
        r: 50,
        g: 150,
        b: 255
    };
    @observable outerRadiusInPixels = null;
    @observable innerRadiusInPixels = null;
    @observable pointFromCenterInPixels = null;

    constructor(store, params, id = uuid.v4()) {
        this.store = store;
        this.id = id;

        _.each(Object.keys(params), (key) => {
            console.log(key, ' = ', params[key]);
            this[key] = params[key];
        });
    }
}

// return a singleton store
export default new Store();
