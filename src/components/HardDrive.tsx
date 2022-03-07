import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setHardDriveEnabled, setHardDrivePath } from '../store/slices/vm';

export function HardDrive() {
    const { enabled, path } = useAppSelector(state => state.vm.drive);
    const dispatch = useAppDispatch();

    const onChangeEnabledHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setHardDriveEnabled(value));
    };

    const onClickSelectHandler = () => {
        dispatch(setHardDrivePath());
    };

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
                    onClick={onClickSelectHandler}
                    disabled={!enabled}
                >
                    Select
                </button>
            </div>
            <div>
                <div className="form-check">
                    <input
                        id="driveEnabled"
                        className="form-check-input"
                        type="checkbox"
                        checked={enabled}
                        onChange={onChangeEnabledHandler}
                    />
                    <label className="form-check-label" htmlFor="driveEnabled">
                        Enabled
                    </label>
                </div>
            </div>
        </div>
    );
}
