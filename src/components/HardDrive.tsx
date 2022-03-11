import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setHardDriveEnabled, selectHardDrivePath } from '../store/slices/vm';
import { setWindowActiveView } from '../store/slices/window';

export function HardDrive() {
    const { enabled, path } = useAppSelector(state => state.vm.drive);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="drivePath" className="form-label">
                Hard drive
            </label>
            <div className="input-group mb-2">
                <input id="drivePath" className="form-control" type="text" value={path} disabled={!enabled} readOnly />
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => dispatch(selectHardDrivePath())}
                    disabled={!enabled}
                >
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
                            onClick={() => dispatch(setWindowActiveView('create-new-image'))}
                        >
                            New
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <div className="form-check">
                    <input
                        id="driveEnabled"
                        className="form-check-input"
                        type="checkbox"
                        checked={enabled}
                        onChange={event => dispatch(setHardDriveEnabled(event.target.checked))}
                    />
                    <label className="form-check-label" htmlFor="driveEnabled">
                        Enabled
                    </label>
                </div>
            </div>
        </div>
    );
}
