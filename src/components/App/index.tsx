import * as React from 'react';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

import { VM_EXPORT_CONFIG_VALUE } from '../../ipc/signals';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSystemInfo } from '../../store/slices/system';
import { setVmConfig } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { parseVmConfig } from '../../utils';
import { CreateNewImage } from '../CreateNewImage';
import { Main } from '../Main';
import { Settings } from '../Settings';

import './index.css';

export function App() {
    const activeView = useAppSelector(state => state.window.activeView);
    const { getState } = useStore<RootState>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        electron.system.getInfo().then(info => dispatch(setSystemInfo(info)));

        electron.vmConfig.onExportConfig(async event => {
            const { vm } = getState();
            event.sender.send(VM_EXPORT_CONFIG_VALUE, JSON.stringify(vm));
        });

        electron.vmConfig.onLoadConfig(async (_event, data) => {
            const config = parseVmConfig(data);

            if (!config) {
                await electron.dialog.showMessageBox({
                    title: 'Error',
                    message: 'Failed to load VM: invalid configuration file',
                });
            } else {
                dispatch(setVmConfig(config));
                dispatch(setWindowActiveView('main'));
            }
        });

        electron.settings.onOpenSettings(async () => {
            dispatch(setWindowActiveView('settings'));
        });
    }, []);

    let view;

    switch (activeView) {
        case 'create-new-image':
            view = <CreateNewImage />;
            break;
        case 'settings':
            view = <Settings />;
            break;
        case 'main':
        default:
            view = <Main />;
            break;
    }

    return (
        <div className="app">
            <div className="app-child-wrapper">{view}</div>
        </div>
    );
}
