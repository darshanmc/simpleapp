import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Controls extends React.Component {
    state = {
        deviceInitialized: false,
        sclRefurbish: false,
        startup: false,
        seal: false,
        deviceStopped: true,
        REFURBISH_URL: 'http://' + this.props.deviceIpAddress + ':' + this.props.devicePort + '/scl/refurbish',
        CONFIGURATION_URL: 'http://' + this.props.deviceIpAddress + ':' + this.props.devicePort + '/scl/updateconfig',
        STARTUP_URL: 'http://' + this.props.deviceIpAddress + ':' + this.props.devicePort + '/scl/startup',
        SEAL_URL: 'http://' + this.props.deviceIpAddress + ':' + this.props.devicePort + '/scl/seal',
        STOP_URL: 'http://' + this.props.deviceIpAddress + ':' + this.props.devicePort + '/scl/close',
        BOOTSTRAP_URL: 'http://' + this.props.deviceIpAddress + ':' + this.props.devicePort + '/scl/bootstrap',
        loading: false
    }

    updateConfiguration = () => {
        this.setState({
            loading: true
        })
        axios.put(this.state.CONFIGURATION_URL, this.props.configuration)
            .then(res => {
                if (res.status === 200 && res.data.Status !== 'Error') {
                    this.props.updateConfiguration('Configuration Updated! \n' + JSON.stringify(res.data));
                } else {
                    this.props.updateOutput('Configuration Error: ' + res.data.Error);
                }
                this.scrollToEnd();
            })
            .catch(err => {
                this.props.updateOutput('Configuration Error: ' + err.message);
                this.scrollToEnd();
            })
    }

    stopDevice = () => {
        this.setState({
            loading: true
        })
        axios.post(this.state.STOP_URL)
            .then(res => {
                this.props.updateOutput('Stop device... \n' + JSON.stringify(res.data));
                if (res.status === 200) {
                    this.setState({
                        deviceInitialized: false,
                        sclRefurbish: false,
                        startup: false,
                        seal: false,
                        deviceStopped: true,
                    })
                    this.props.stopDevice();
                }
                this.scrollToEnd();
            })
            .catch(err => {
                this.props.updateOutput('Stop Device Error: ' + err.message);
                this.scrollToEnd();
            })
    }

    startupDevice = () => {
        this.setState({
            loading: true
        })
        axios.post(this.state.STARTUP_URL)
            .then(res => {
                this.props.updateOutput('Startup... \n' + JSON.stringify(res.data));
                if (res.status === 200) {
                    this.setState({ startup: true })
                }
                this.scrollToEnd();
            })
            .catch(err => {
                this.props.updateOutput('Startup Error: ' + err.message);
                this.scrollToEnd();
            })
    }

    sealDevice = () => {
        this.setState({
            loading: true
        })
        axios.post(this.state.SEAL_URL)
            .then(res => {
                this.props.updateOutput('Seal... \n' + JSON.stringify(res.data));
                if (res.status === 200) {
                    this.setState({
                        deviceInitialized: true,
                        seal: true,
                        deviceStopped: false
                    })
                }
                this.scrollToEnd();
            })
            .catch(err => {
                this.props.updateOutput('Seal Error: ' + err.message);
                this.scrollToEnd();
            })
    }

    refurbish = () => {
        this.setState({
            loading: true
        })
        axios.post(this.state.REFURBISH_URL)
            .then(res => {
                this.props.updateOutput('Refurbish... \n' + JSON.stringify(res.data));
                if (res.status === 200) {
                    this.setState({ sclRefurbish: true })
                }
                this.scrollToEnd();
            })
            .catch(err => {
                this.props.updateOutput('Refurbish Error: ' + err.message);
                this.scrollToEnd();
            })
    }

    bootstrapDevice = () => {
        this.setState({
            loading: true
        })
        axios.post(this.state.BOOTSTRAP_URL)
            .then(res => {
                this.props.updateOutput('Bootstrap... \n' + JSON.stringify(res.data));
                this.scrollToEnd();
            })
            .catch(err => {
                this.props.updateOutput('Bootstrap Error: ' + err.message);
                this.scrollToEnd();
            })

    }

    scrollToEnd = () => {
        var textarea = document.getElementById('output');
        textarea.scrollTop = textarea.scrollHeight;
        this.setState({
            loading: false
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-primary" disabled={!this.state.deviceInitialized} onClick={this.bootstrapDevice}>
                                        Bootstrap / Whatsup
                        </button>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-primary" onClick={this.stopDevice}> Stop Device </button>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col">
                                    <h3> Status </h3>
                                </div>
                                <div className="col-md-10">
                                    <div className={this.state.loading ? "spinner-border" : "d-none spinner-border"} role="status">
                                        <span className="sr-only"> Loading... </span>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-2">
                                    <button type="button" className={this.props.configUpdated ? 'btn btn-success' : 'btn btn-danger'} onClick={this.updateConfiguration}>
                                        Configuration
                        </button>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className={this.state.sclRefurbish ? 'btn btn-success' : 'btn btn-danger'} onClick={this.refurbish}>
                                        Refurbish
                        </button>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className={this.state.startup ? 'btn btn-success' : 'btn btn-danger'} onClick={this.startupDevice}>
                                        Startup
                        </button>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className={this.state.seal ? 'btn btn-success' : 'btn btn-danger'} onClick={this.sealDevice}>
                                        Seal
                        </button>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col">
                                    <h3> Display </h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    <textarea id="output" className="textarea" value={this.props.output} readOnly></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        output: state.output,
        configUpdated: state.configUpdated,
        configuration: state.configuration,
        deviceIpAddress: state.deviceIpAddress,
        devicePort: state.devicePort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateOutput: (output) => {
            dispatch({
                type: 'UPDATE_OUTPUT',
                output: output
            })
        },

        stopDevice: () => {
            dispatch({
                type: 'STOP_DEVICE'
            })
        },

        updateConfiguration: (output) => {
            dispatch({
                type: 'UPDATE_CONFIG',
                output: output
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);