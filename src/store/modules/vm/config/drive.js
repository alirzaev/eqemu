export const VmDrive = {
    namespaced: true,
    state: () => ({
        enabled: false,
        path: '',
    }),
    mutations: {
        load: (state, obj) => {
            Object.keys(state).forEach((key) => {
                state[key] = obj[key];
            });
        },
        setPath: (state, path) => {
            state.path = path;
        },
        setEnabled: (state, enabled) => {
            state.enabled = enabled;
        },
    },
};