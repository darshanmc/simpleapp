import React from 'react';
import { connect } from 'react-redux';

class DeviceConfiguration extends React.Component {
    state = {
        ISEPAddress: this.props.ISEPAddress,
        ISEPPort: this.props.ISEPPort,
        ROT: this.props.ROT,
        RotPublicUid: this.props.RotPublicUid,
        SCLlogLevel: this.props.SCLlogLevel,
        Status: this.props.Status,
        deviceProfilePublicUid: this.props.deviceProfilePublicUid,
        deviceSerialNumber: this.props.deviceSerialNumber,
        firmwareVersion: this.props.firmwareVersion,
        isIpv6: this.props.isIpv6,
        rotSealingSerialNumber: this.props.rotSealingSerialNumber,
        scReaderIndex: this.props.scReaderIndex,
        sclProfilePublicUid: this.props.sclProfilePublicUid,
        sclVersion: this.props.sclVersion
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateConfigState(this.state);
        this.props.toggleConfig();
    }

    handleChange = (e) => {
        let value = e.target.value;

        if (e.target.id === 'isIpv6') {
            value = e.target.checked ? 'True' : 'False';
        }

        this.setState({
            [e.target.id]: value
        })
    }

    render() {
        return (
            <div className="form-section">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ISEPAddress">ISEP Address:</label>
                        <input type="text" className="form-control" id="ISEPAddress" onChange={this.handleChange} value={this.state.ISEPAddress} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ISEPPort">ISEP Port:</label>
                        <input type="text" className="form-control" id="ISEPPort" onChange={this.handleChange} value={this.state.ISEPPort} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ROT">ROT:</label>
                        <input type="text" className="form-control" id="ROT" onChange={this.handleChange} value={this.state.ROT} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="RotPublicUid">Rot Public UID:</label>
                        <input type="text" className="form-control" id="RotPublicUid" onChange={this.handleChange} value={this.state.RotPublicUid} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SCLlogLevel">SCL Log Level:</label>
                        <input type="text" className="form-control" id="SCLlogLevel" onChange={this.handleChange} value={this.state.SCLlogLevel} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Status">Status:</label>
                        <input type="text" className="form-control" id="Status" onChange={this.handleChange} value={this.state.Status} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deviceProfilePublicUid">Device Profile Public UID:</label>
                        <input type="text" className="form-control" id="deviceProfilePublicUid" onChange={this.handleChange} value={this.state.deviceProfilePublicUid} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deviceSerialNumber">Device Serial Number:</label>
                        <input type="text" className="form-control" id="deviceSerialNumber" onChange={this.handleChange} value={this.state.deviceSerialNumber} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firmwareVersion">Firmware Version:</label>
                        <input type="text" className="form-control" id="firmwareVersion" onChange={this.handleChange} value={this.state.firmwareVersion} />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="isIpv6" onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="isIpv6">Is IPV6:</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rotSealingSerialNumber">Rot Sealing Serial Number:</label>
                        <input type="text" className="form-control" id="rotSealingSerialNumber" onChange={this.handleChange} value={this.state.rotSealingSerialNumber} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="scReaderIndex">SC Reader Index:</label>
                        <input type="text" className="form-control" id="scReaderIndex" onChange={this.handleChange} value={this.state.scReaderIndex} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sclProfilePublicUid">SCL Profile Public UID:</label>
                        <input type="text" className="form-control" id="sclProfilePublicUid" onChange={this.handleChange} value={this.state.sclProfilePublicUid} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sclVersion">SCL Version:</label>
                        <input type="text" className="form-control" id="sclVersion" onChange={this.handleChange} value={this.state.sclVersion} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ISEPAddress: state.configuration.ISEPAddress,
        ISEPPort: state.configuration.ISEPPort,
        ROT: state.configuration.ROT,
        RotPublicUid: state.configuration.RotPublicUid,
        SCLlogLevel: state.configuration.SCLlogLevel,
        Status: state.configuration.Status,
        deviceProfilePublicUid: state.configuration.deviceProfilePublicUid,
        deviceSerialNumber: state.configuration.deviceSerialNumber,
        firmwareVersion: state.configuration.firmwareVersion,
        isIpv6: state.configuration.isIpv6,
        rotSealingSerialNumber: state.configuration.rotSealingSerialNumber,
        scReaderIndex: state.configuration.scReaderIndex,
        sclProfilePublicUid: state.configuration.sclProfilePublicUid,
        sclVersion: state.configuration.sclVersion
    }
}

const mapDispatchToProps = (dispatch) =>  {
    return {
        updateConfigState: (data) => {
            dispatch({
                type: 'UPDATE_CONFIG_STATE',
                data: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceConfiguration);