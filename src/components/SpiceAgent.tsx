import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSpiceAgentEnabled } from '../store/slices/vm';

export function SpiceAgent() {
    const { enabled } = useAppSelector(state => state.vm.spiceAgent);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check">
                <input
                    id="spiceAgentEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setSpiceAgentEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="spiceAgentEnabled">
                    Enable SPICE agent
                </label>
            </div>
            <div />
        </div>
    );
}
