import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGraphicsCard } from '../store/slices/vm';
import { GraphicsCard as GraphicsCardEnum } from '../enums';

const GraphicsCardList: Array<{ text: string; value: GraphicsCardEnum }> = [
    {
        text: 'None',
        value: GraphicsCardEnum.NONE,
    },
    {
        text: 'Cirrus',
        value: GraphicsCardEnum.CIRRUS,
    },
    {
        text: 'Standard',
        value: GraphicsCardEnum.STANDARD,
    },
    {
        text: 'VMware SVGA-II',
        value: GraphicsCardEnum.VMWARE,
    },
    {
        text: 'QXL',
        value: GraphicsCardEnum.QXL,
    },
    {
        text: 'VirtIO',
        value: GraphicsCardEnum.VIRTIO,
    },
];

export function GraphicsCard() {
    const card = useAppSelector(state => state.vm.graphics.card);
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
