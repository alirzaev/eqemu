import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setNetworkEnabled } from '../store/slices/vm';

export function NetworkSettings() {
    const {enabled} = useAppSelector(state => state.vm.network);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check">
                <input
                    id="networkingEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setNetworkEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="networkingEnabled">
                    Enable networking
                </label>
            </div>
        </div>
    );
}
