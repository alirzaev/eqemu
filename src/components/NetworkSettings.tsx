import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setNetworkEnabled } from '../store/slices/vm';

export function NetworkSettings() {
    const enabled = useAppSelector(state => state.vm.network.enabled);
    const dispatch = useAppDispatch();

    const onChangeEnabledHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setNetworkEnabled(value));
    };

    return (
        <div>
            <div className="form-check">
                <input
                    id="networkingEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={onChangeEnabledHandler}
                />
                <label className="form-check-label" htmlFor="networkingEnabled">
                    Enable networking
                </label>
            </div>
        </div>
    );
}
