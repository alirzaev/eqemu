import { createStore } from 'vuex';
import { System } from './modules/system';
import { VM } from './modules/vm';

export const store = createStore({
    modules: {
        vm: VM,
        system: System,
    },
});
