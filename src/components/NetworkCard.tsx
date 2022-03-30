import * as React from 'react';

import { NetworkCard as NetworkCardEnum } from '../enums';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setNetworkCard, setNetworkEnabled } from '../store/slices/vm';

const NetworkCardList: Array<{ text: string; value: NetworkCardEnum }> = [
    {
        text: 'E1000E',
        value: NetworkCardEnum.E1000E,
    },
    {
        text: 'VirtIO',
        value: NetworkCardEnum.VIRTIO,
    },
];

export function NetworkCard() {
    const enabled = useAppSelector(state => state.vm.network.enabled);
    const type = useAppSelector(state => state.vm.network.type);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check mb-2">
                <input
                    id="networkingEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setNetworkEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="networkingEnabled">
                    Network card
                </label>
            </div>
            <label htmlFor="networkCard" className="d-none">
                Netwrok card type
            </label>
            <select
                id="networkCard"
                className="form-select"
                value={type}
                onChange={({ target }) => dispatch(setNetworkCard(target.value as NetworkCardEnum))}
                disabled={!enabled}
            >
                {NetworkCardList.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
}
