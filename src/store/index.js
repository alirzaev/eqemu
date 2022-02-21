import { createStore } from 'vuex';
import { VM } from './modules/vm';

export const store = createStore({
    state: () => ({}),
    modules: {
        vm: VM,
    }
});
