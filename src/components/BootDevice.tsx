import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setBootDevice } from '../store/slices/vm';
import { BootDevice as BootDeviceEnum } from '../enums';

const BootDeviceList: Array<{ text: string, value: BootDeviceEnum }> = [
    {
        text: 'CD-ROM',
        value: BootDeviceEnum.Cdrom,
    },
    {
        text: 'Hard drive',
        value: BootDeviceEnum.HardDrive,
    },
    {
        text: 'Network',
        value: BootDeviceEnum.Network,
    },
];

export function BootDevice() {
    const bootDevice = useAppSelector(state => state.vm.bootDevice);
    const dispatch = useAppDispatch();

    const onChangeBootDeviceHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as BootDeviceEnum;

        dispatch(setBootDevice(value));
    };

    return (
        <div>
            <label htmlFor="bootDevice" className="form-label">
                Boot device
            </label>
            <select
                id="bootDevice"
                className="form-select"
                value={bootDevice}
                onChange={onChangeBootDeviceHandler}
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
