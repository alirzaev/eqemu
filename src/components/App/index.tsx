import * as React from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSystemInfo } from '../../store/slices/system';
import { loadVmConfig, sendConfigToMainProcess } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { CreateNewImage } from '../CreateNewImage';
import { Main } from '../Main';
import { Settings } from '../Settings';

import './index.css';

export function App() {
    const { activeView } = useAppSelector(state => state.window);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSystemInfo());

        electron.vmConfig.onExportConfig(async event => {
            dispatch(sendConfigToMainProcess(event));
        });

        electron.vmConfig.onLoadConfig(async (_event, config) => {
            const result = await dispatch(loadVmConfig(config));

            if (result.payload) {
                dispatch(setWindowActiveView('main'));
            }
        });

        electron.settings.onOpenSettings(async () => {
            dispatch(setWindowActiveView('settings'));
        });
    }, []);

    return (
        <div className="app">
            <div className="app-child-wrapper">
                {activeView === 'main' && <Main />}
                {activeView === 'settings' && <Settings />}
                {activeView === 'create-new-image' && <CreateNewImage />}
            </div>
        </div>
    );
}
