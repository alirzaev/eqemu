import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGraphicsCard } from '../store/slices/vm';
import { GraphicsCard as GraphicsCardEnum } from '../enums';

const GraphicsCardList: Array<{ text: string; value: GraphicsCardEnum }> = [
    {
        text: 'None',
        value: GraphicsCardEnum.None,
    },
    {
        text: 'Cirrus',
        value: GraphicsCardEnum.Cirrus,
    },
    {
        text: 'Standard',
        value: GraphicsCardEnum.Standard,
    },
    {
        text: 'VMware SVGA-II',
        value: GraphicsCardEnum.Vmware,
    },
    {
        text: 'QXL',
        value: GraphicsCardEnum.Qxl,
    },
    {
        text: 'VirtIO',
        value: GraphicsCardEnum.Virtio,
    },
];

export function GraphicsCard() {
    const { card } = useAppSelector(state => state.vm.graphics);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="graphicsCard" className="form-label">
                Graphics card
            </label>
            <select
                id="graphicsCard"
                className="form-select"
                value={card}
                onChange={event => dispatch(setGraphicsCard(event.target.value as GraphicsCardEnum))}
            >
                {GraphicsCardList.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}
