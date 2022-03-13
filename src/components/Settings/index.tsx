import * as React from 'react';
import { useEffect } from 'react';

import { QEMU_IMG, QEMU_SYSTEM_X86_64 } from '../../consts/system';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadSettings, setQemuPath } from '../../store/slices/settings';
import { setWindowActiveView } from '../../store/slices/window';
import { QemuCheckStatus } from '../../types';

import './index.css';

export function QemuStatus({ title, status }: { title: string; status: QemuCheckStatus }) {
    return (
        <div>
            {status === 'valid' && <span className="text-success">{title}: OK</span>}
            {status === 'invalid' && <span className="text-danger">{title}: Doesn't work</span>}
            {status === 'pending' && <span className="text-secondary">{title}: Checking...</span>}
        </div>
    );
}

export function Settings() {
    const { loaded, qemu } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadSettings());
    }, []);

    const selectQemuPath = async () => {
        const result = await electron.dialog.showOpenDialog({
            properties: ['openDirectory'],
        });

        if (!result.canceled) {
            const path = result.filePaths[0];

            dispatch(setQemuPath(path));
        }
    };

    return (
        <div className="settings">
            <div className="settings-header">
                <h1>Settings</h1>
            </div>
            {!loaded && (
                <div className="settings-spinner">
                    <div className="spinner-border text-primary">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {loaded && (
                <div className="settings-main">
                    <label htmlFor="settingsQemuPath" className="form-label">
                        The path to the QEMU folder
                    </label>
                    <div className="input-group mb-2">
                        <input id="settingsQemuPath" className="form-control" type="text" value={qemu.path} readOnly />
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={selectQemuPath}
                            disabled={qemu.status.qemuSystem === 'pending' || qemu.status.qemuImg === 'pending'}
                        >
                            Select
                        </button>
                    </div>
                    <QemuStatus title={QEMU_SYSTEM_X86_64} status={qemu.status.qemuSystem} />
                    <QemuStatus title={QEMU_IMG} status={qemu.status.qemuImg} />
                </div>
            )}
            <div className="settings-footer">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch(setWindowActiveView('main'))}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
