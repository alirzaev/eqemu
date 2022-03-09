import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCpuCores } from '../store/slices/vm';

export function Cpu() {
    const { cores } = useAppSelector(state => state.vm.cpu);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="cpuCores" className="form-label">
                CPU cores
            </label>
            <input
                id="cpuCores"
                type="number"
                className="form-control"
                value={cores}
                onChange={event => dispatch(setCpuCores(Number.parseInt(event.target.value)))}
                min="1"
                max="4"
            />
        </div>
    );
}
