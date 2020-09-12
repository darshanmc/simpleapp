import React from 'react';
import { connect } from 'react-redux';

var validIpFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

class DeviceIP extends React.Component {
    state = {
        deviceIpAddress: '',
        devicePort: this.props.devicePort,
        errorMessage: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (validIpFormat.test(this.state.deviceIpAddress)) {
            this.setState({
                errorMessage: null
            })
            this.props.updateDeviceIP({
                deviceIpAddress: this.state.deviceIpAddress,
                devicePort: this.state.devicePort
            });
        } else {
            this.setState({
                errorMessage: 'Invalid IP Address!'
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        let errorAlert = '';
        if (this.state.errorMessage) {
            errorAlert = (
                <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                </div>
            )
        }

        return (
            <div className="container center">
                <div className="row">
                    <div className="col">
                        <div className="card custom-size">
                            <div className="card-header">
                                <h3>Please enter Device IP Address</h3>
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    <div className="form-section">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="deviceIpAddress">Device IP Address:</label>
                                                <input type="text" className="form-control" id="deviceIpAddress" onChange={this.handleChange} value={this.state.deviceIp} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="devicePort">Device IP Port:</label>
                                                <input type="text" className="form-control" id="devicePort" onChange={this.handleChange} value={this.state.devicePort} />
                                            </div>
                                            {errorAlert}
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
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
        deviceIpAddress: state.deviceIpAddress,
        devicePort: state.devicePort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDeviceIP: (data) => {
            dispatch({
                type: 'UPDATE_DEVICE_IP',
                data: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceIP);