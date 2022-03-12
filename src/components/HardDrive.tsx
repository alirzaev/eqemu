import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setHardDriveEnabled, selectHardDrivePath } from '../store/slices/vm';
import { setWindowActiveView } from '../store/slices/window';

export function HardDrive() {
    const { enabled, path } = useAppSelector(state => state.vm.drive);
    const dispatch = useAppDispatch();

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
        </div>
    );
}
