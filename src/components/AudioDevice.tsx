import * as React from 'react';

import { AudioDevice as AudioDeviceEnum } from '../enums';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAudioEnabled, setAudioType } from '../store/slices/vm';

const AudioDeviceList: Array<{ text: string; value: AudioDeviceEnum }> = [
    {
        text: 'HDA',
        value: AudioDeviceEnum.HDA,
    },
    {
        text: 'AC97',
        value: AudioDeviceEnum.AC97,
    },
];

export function AudioDevice() {
    const enabled = useAppSelector(state => state.vm.audio.enabled);
    const type = useAppSelector(state => state.vm.audio.type);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check mb-2">
                <input
                    id="audioEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setAudioEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="audioEnabled">
                    Audio device
                </label>
            </div>
            <label htmlFor="audioType" className="d-none">
                Audio device type
            </label>
            <select
                id="audioType"
                className="form-select"
                value={type}
                onChange={({ target }) => dispatch(setAudioType(target.value as AudioDeviceEnum))}
                disabled={!enabled}
            >
                {AudioDeviceList.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}
