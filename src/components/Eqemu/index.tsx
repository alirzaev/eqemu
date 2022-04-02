import * as React from 'react';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

import { VM_EXPORT_CONFIG_VALUE } from '../../ipc/signals';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setVmConfig } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { parseVmConfig, SystemInfoContext } from '../../utils';
import { View } from '../../enums';
import { SystemInfo } from '../../types';
import { CreateNewImage } from '../CreateNewImage';
import { VmView } from '../VmView';
import { Settings } from '../Settings';

import './index.css';

interface IProps {
    systemInfo: SystemInfo;
}

export function Eqemu({ systemInfo }: IProps) {
    const activeView = useAppSelector(state => state.window.activeView);
    const { getState } = useStore<RootState>();
    const dispatch = useAppDispatch();

    useEffect(() => {
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
                dispatch(setWindowActiveView(View.VM_VIEW));
            }
        });

        electron.settings.onOpenSettings(async () => {
            dispatch(setWindowActiveView(View.SETTINGS));
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
        case 'vm-view':
        default:
            view = <VmView />;
            break;
    }

    return (
        <SystemInfoContext.Provider value={systemInfo}>
            <div className="app">
                <div className="app-child-wrapper">{view}</div>
            </div>
        </SystemInfoContext.Provider>
    );
}
