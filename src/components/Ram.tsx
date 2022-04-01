import * as React from 'react';

import { MIN_RAM_SIZE } from '../consts/vm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMemory } from '../store/slices/vm';

export function Ram() {
    const maxMemory = useAppSelector(state => state.system.info.memory);
    const memory = useAppSelector(state => state.vm.memory);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="memory" className="form-label">
                RAM
            </label>
            <div className="input-group">
                <input
                    id="memory"
                    type="number"
                    className="form-control"
                    value={memory}
                    onChange={event => dispatch(setMemory(Number.parseInt(event.target.value)))}
                    min={MIN_RAM_SIZE}
                    max={maxMemory}
                />
                <span className="input-group-text">GiB</span>
            </div>
        </div>
    );
}
