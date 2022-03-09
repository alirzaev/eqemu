import * as React from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getInfo } from '../../store/slices/system';
import { loadVmConfig, sendConfigToMainProcess } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { Main } from '../Main';
import { Settings } from '../Settings';

import './index.css';

export function App() {
    const activeView = useAppSelector(state => state.window.activeView);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getInfo());

        electron.vmConfig.onRequestConfig(async event => {
            dispatch(sendConfigToMainProcess(event));
        });

        electron.vmConfig.onLoadConfig(async (_event, config) => {
            dispatch(loadVmConfig(config));
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
            </div>
        </div>
    );
}
