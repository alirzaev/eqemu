export const VmSpiceServer = {
    namespaced: true,
    state: () => ({
        enabled: false,
        port: 3000,
        password: 'password',
        ticketing: false,
        usbRedirection: false,
    }),
    mutations: {
        load: (state, obj) => {
            Object.keys(state).forEach((key) => {
                state[key] = obj[key];
            });
        },
        setEnabled: (state, enabled) => {
            state.enabled = enabled;
        },
        setPort: (state, port) => {
            state.port = port;
        },
        setPassword: (state, password) => {
            state.password = password;
        },
        setTicketing: (state, ticketing) => {
            state.ticketing = ticketing;
        },
        setUsbRedirection: (state, usbRedirection) => {
            state.usbRedirection = usbRedirection;
        },
    },
};