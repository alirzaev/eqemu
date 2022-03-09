import * as React from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadSettings, updateQemuPath } from '../../store/slices/settings';
import { setWindowActiveView } from '../../store/slices/window';

import './index.css';

export function Settings() {
    const { loaded, qemu } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadSettings());
    }, []);

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
                            onClick={() => dispatch(updateQemuPath())}
                            disabled={qemu.status === 'pending'}
                        >
                            Select
                        </button>
                    </div>
                    {qemu.status === 'valid' && <span className="text-success">qemu-system-x86_64: OK</span>}
                    {qemu.status === 'invalid' && <span className="text-danger">qemu-system-x86_64: Doesn't work</span>}
                    {qemu.status === 'pending' && (
                        <span className="text-secondary">qemu-system-x86_64: Checking...</span>
                    )}
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
