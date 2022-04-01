import * as React from 'react';

import { View } from '../enums';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setHardDriveEnabled, setHardDrivePath } from '../store/slices/vm';
import { setWindowActiveView } from '../store/slices/window';

export function HardDrive() {
    const enabled = useAppSelector(state => state.vm.drive.enabled);
    const path = useAppSelector(state => state.vm.drive.path);
    const dispatch = useAppDispatch();

    const selectPath = async () => {
        const result = await electron.dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'QEMU disk image', extensions: ['qcow2'] },
                { name: 'VMware disk image', extensions: ['vmdk'] },
                { name: 'VirtualBox disk image', extensions: ['vdi'] },
            ],
        });

        if (!result.canceled) {
            const path = result.filePaths[0];

            dispatch(setHardDrivePath(path));
        }
    };

    return (
        <div>
            <div className="form-check mb-2">
                <input
                    id="driveEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setHardDriveEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="driveEnabled">
                    Hard drive
                </label>
            </div>
            <label htmlFor="drivePath" className="d-none">
                Hard drive path
            </label>
            <div className="input-group">
                <input id="drivePath" className="form-control" type="text" value={path} disabled={!enabled} readOnly />
                <button className="btn btn-outline-primary" type="button" onClick={selectPath} disabled={!enabled}>
                    Select
                </button>
                <button
                    className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    disabled={!enabled}
                ></button>
                <ul className="dropdown-menu">
                    <li>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => dispatch(setWindowActiveView(View.CREATE_NEW_IMAGE))}
                        >
                            New
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
