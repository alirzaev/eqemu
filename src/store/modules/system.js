export const System = {
    namespaced: true,
    state: () => ({
        platform: '',
        cpus: 1,
        memory: 1,
    }),
    mutations: {
        setInfo: (state, info) => {
            state.platform = info.platform;
            state.cpus = info.cpus;
            state.memory = info.memory;
        },
    },
    actions: {
        loadInfo: async (context) => {
            const info = await electron.system.requestInfo(); // eslint-disable-line

            context.commit('setInfo', info);
        },
    },
};