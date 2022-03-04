import * as React from 'react';
import { useEffect } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { getInfo } from '../../store/slices/system';
import { loadVmConfig, sendConfigToMainProcess } from '../../store/slices/vm';
import { VmConfig } from '../VmConfig';
import { VmLauncher } from '../VmLauncher';

import './index.css';

export function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getInfo());

        electron.vmConfig.onRequestConfig(async (event) => {
            dispatch(sendConfigToMainProcess(event));
        });

        electron.vmConfig.onLoadConfig(async (_event, config) => {
            dispatch(loadVmConfig(config));
        });
    }, []);

    return (
        <div className="app">
            <div className="app-vm-config-wrapper">
                <VmConfig />
            </div>
            <div className="app-launcher-wrapper">
                <VmLauncher />
            </div>
        </div>
    );
}
