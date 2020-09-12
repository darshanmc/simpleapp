const initState = {
    configUpdated: false,
    output: '',
    configuration: {
        ISEPAddress: '127.0.0.1',
        ISEPPort: '38292',
        ROT: 'TEE',
        RotPublicUid: '0002000005b52001',
        SCLlogLevel: 'DEBUG',
        Status: 'Done',
        deviceProfilePublicUid: 'http://example.t',
        deviceSerialNumber: '000000003d2d1c3a',
        firmwareVersion: 'L0.0.00.00.05.06',
        isIpv6: 'False',
        rotSealingSerialNumber: '123256789abcdefa',
        scReaderIndex: '0',
        sclProfilePublicUid: 'http://example.t',
        sclVersion: 'latest'
    },
    deviceIpAddress: null,
    devicePort: '9999'
}

const baseReducer = (state = initState, action) => {
    if (action.type === 'UPDATE_CONFIG') {
        let output = state.output;
        output += '\n' + action.output;
        return {
            ...state,
            output: output,
            configUpdated: true
        }
    } else if (action.type === 'UPDATE_OUTPUT') {
        let output = state.output;
        output += '\n'+ action.output;
        return {
            ...state,
            output: output
        }
    } else if (action.type === 'STOP_DEVICE') {
        return {
            ...state,
            configUpdated: false
        }
    } else if (action.type === 'UPDATE_CONFIG_STATE') {
        return {
            ...state,
            configuration: action.data
        }
    } else if (action.type === 'UPDATE_DEVICE_IP') {
        return {
            ...state,
            deviceIpAddress: action.data.deviceIpAddress,
            devicePort: action.data.devicePort
        }
    }

    return state;
}

export default baseReducer;