import React from 'react';
import DeviceConfiguration from './DeviceConfiguration';
import DeviceIP from './DeviceIP';
import Controls from './Controls';
import { connect } from 'react-redux';

class App extends React.Component {
    state = {
        showConfig: false,
        deviceIP: ''
    }

    toggleConfig = () => {
        this.setState({
            showConfig: !this.state.showConfig
        })
    }

    renderDevice = () => {
        let content;
        if (this.state.showConfig) {
            content = <DeviceConfiguration toggleConfig={this.toggleConfig} />
        } else {
            content = <Controls />
        }

        return (
            <div className="container" >
                <div className="row" >
                    <div className="col" >
                        <div className="card custom-size" >
                            <div className="card-header" >
                                <h1> Device </h1> <h4>(Address: http:/ / {this.props.deviceIpAddress}: {this.props.devicePort}) </h4> </div>
                            <div className="card-header" >
                                <ul className="nav nav-tabs card-header-tabs" >
                                    <li className="nav-item">
                                        <button className={!this.state.showConfig ? 'nav-link active' : 'nav-link'} onClick={this.toggleConfig} > Controls </button>
                                    </li> <li className="nav-item" >
                                        <button className={this.state.showConfig ? 'nav-link active' : 'nav-link'} onClick={this.toggleConfig} > Configuration </button> </li> </ul>  </div> <div className="card-body" >
                                <div className="card-text" > {content} </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let mainContent;
        if (!this.props.deviceIpAddress) {
            mainContent = <DeviceIP />
        } else {
            mainContent = this.renderDevice();
        }

        return (
            <div className="App" > {mainContent} </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        deviceIpAddress: state.deviceIpAddress,
        devicePort: state.devicePort
    }
}

export default connect(mapStateToProps)(App);