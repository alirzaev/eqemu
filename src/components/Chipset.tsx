import * as React from 'react';

import { Chipset as ChipsetEnum } from '../enums';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setChipset } from '../store/slices/vm';

const ChipsetList: Array<{ text: string; value: ChipsetEnum }> = [
    {
        text: 'i440FX',
        value: ChipsetEnum.I440FX,
    },
    {
        text: 'Q35',
        value: ChipsetEnum.Q35,
    },
];
export function Chipset() {
    const chipset = useAppSelector(state => state.vm.chipset);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="chipset" className="form-label">
                Chipset
            </label>
            <select
                id="chipset"
                className="form-select"
                value={chipset}
                onChange={({ target }) => dispatch(setChipset(target.value as ChipsetEnum))}
            >
                {ChipsetList.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}
