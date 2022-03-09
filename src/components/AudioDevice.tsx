import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAudioEnabled } from '../store/slices/vm';

export function AudioDevice() {
    const { enabled } = useAppSelector(state => state.vm.audio);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check">
                <input
                    id="audioEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setAudioEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="audioEnabled">
                    Enable audio device
                </label>
            </div>
        </div>
    );
}
