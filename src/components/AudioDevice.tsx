import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAudioEnabled } from '../store/slices/vm';

export function AudioDevice() {
    const enabled = useAppSelector(state => state.vm.audio.enabled);
    const dispatch = useAppDispatch();

    const onChangeEnabledHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setAudioEnabled(value));
    };

    return (
        <div>
            <div className="form-check">
                <input
                    id="audioEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={onChangeEnabledHandler}
                />
                <label className="form-check-label" htmlFor="audioEnabled">
                    Enable audio device
                </label>
            </div>
        </div>
    );
}
