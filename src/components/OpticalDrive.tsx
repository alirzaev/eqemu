import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOpticalDriveEnabled, setOpticalDrivePath } from '../store/slices/vm';

export function OpticalDrive() {
    const { enabled, path } = useAppSelector(state => state.vm.cdrom);
    const dispatch = useAppDispatch();

    const onChangeEnabledHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setOpticalDriveEnabled(value));
    };

    const onClickSelectHandler = () => {
        dispatch(setOpticalDrivePath());
    };

    return (
        <div>
            <label htmlFor="cdromPath" className="form-label">
                Optical drive
            </label>
            <div className="input-group mb-2">
                <input id="cdromPath" className="form-control" type="text" value={path} disabled={!enabled} readOnly />
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
                        id="cdromEnabled"
                        className="form-check-input"
                        type="checkbox"
                        checked={enabled}
                        onChange={onChangeEnabledHandler}
                    />
                    <label className="form-check-label" htmlFor="cdromEnabled">
                        Enabled
                    </label>
                </div>
            </div>
        </div>
    );
}
