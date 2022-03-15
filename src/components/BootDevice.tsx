import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setBootDevice } from '../store/slices/vm';
import { BootDevice as BootDeviceEnum } from '../enums';

const BootDeviceList: Array<{ text: string; value: BootDeviceEnum }> = [
    {
        text: 'CD-ROM',
        value: BootDeviceEnum.CD_ROM,
    },
    {
        text: 'Hard drive',
        value: BootDeviceEnum.HARD_DRIVE,
    },
    {
        text: 'Network',
        value: BootDeviceEnum.NETWORK,
    },
];

export function BootDevice() {
    const { bootDevice } = useAppSelector(state => state.vm);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="bootDevice" className="form-label">
                Boot device
            </label>
            <select
                id="bootDevice"
                className="form-select"
                value={bootDevice}
                onChange={event => dispatch(setBootDevice(event.target.value as BootDeviceEnum))}
            >
                {BootDeviceList.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}
