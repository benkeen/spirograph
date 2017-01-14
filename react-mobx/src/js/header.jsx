import React from 'react';



class Header extends React.Component {
    render () {
        return (
            <header id="navbar">
                <div className="navbar">
                    <div className="navbar-inner">
                        <div style={{ width: 'auto' }} className="container">
                            <a href="#" className="brand">Spirograph <span>/</span> <span id="frameworkName">React, MobX</span></a>
                            <div className="nav-collapse">
                                <ul className="nav">
                                    <li className="active"><a href="#">Home</a></li>
                                    <li><a href="https://github.com/benkeen/spirograph">Github</a></li>
                                </ul>
                                <ul className="nav pull-right">
                                    <li className="divider-vertical" />
                                    <li><a href="#" id="drawAll">Draw all</a></li>
                                    <li><a href="#" id="addSpirograph">Add &raquo;</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
