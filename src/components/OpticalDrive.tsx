import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOpticalDriveEnabled, selectOpticalDrivePath } from '../store/slices/vm';

export function OpticalDrive() {
    const { enabled, path } = useAppSelector(state => state.vm.cdrom);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check mb-2">
                <input
                    id="cdromEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setOpticalDriveEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="cdromEnabled">
                    Optical drive
                </label>
            </div>
            <label htmlFor="cdromPath" className="d-none">
                Optical drive path
            </label>
            <div className="input-group">
                <input id="cdromPath" className="form-control" type="text" value={path} disabled={!enabled} readOnly />
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => dispatch(selectOpticalDrivePath())}
                    disabled={!enabled}
                >
                    Select
                </button>
            </div>
        </div>
    );
}
