import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setMemory } from '../store/slices/vm';

export function Ram() {
    const system = useAppSelector(state => state.system);
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
                    min="1"
                    max={system.memory}
                />
                <span className="input-group-text">GiB</span>
            </div>
        </div>
    );
}
