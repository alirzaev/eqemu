import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSpiceAgentEnabled } from '../store/slices/vm';

export function SpiceAgent() {
    const enabled = useAppSelector(state => state.vm.spiceAgent.enabled);
    const dispatch = useAppDispatch();

    const onChangeEnabledHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setSpiceAgentEnabled(value));
    };

    return (
        <div>
            <div className="form-check">
                <input
                    id="spiceAgentEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={onChangeEnabledHandler}
                />
                <label className="form-check-label" htmlFor="spiceAgentEnabled">
                    Enable SPICE agent
                </label>
            </div>
            <div />
        </div>
    );
}
