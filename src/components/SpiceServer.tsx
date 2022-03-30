import * as React from 'react';

import { HorizontalLayout } from './HorizontalLayout';
import {
    setSpiceServerEnabled as setEnabled,
    setSpiceServerPort as setPort,
    setSpiceServerUsbRedirection as setUsbRedirection,
} from '../store/slices/vm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { MAX_SPICE_SERVER_PORT, MIN_SPICE_SERVER_PORT } from '../consts/vm';

function SpiceServerEnabled() {
    const enabled = useAppSelector(state => state.vm.spiceServer.enabled);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="form-check mb-2">
                <input
                    id="spiceServerEnabled"
                    className="form-check-input"
                    type="checkbox"
                    checked={enabled}
                    onChange={event => dispatch(setEnabled(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="spiceServerEnabled">
                    Enable SPICE server
                </label>
            </div>
        </div>
    );
}

function SpiceServerUsbRedirection() {
    const checked = useAppSelector(state => state.vm.spiceServer.usbRedirection);
    const dispatch = useAppDispatch();

    return (
        <div className="mt-auto mb-auto">
            <div className="form-check">
                <input
                    id="spiceServerUsbRedirection"
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={event => dispatch(setUsbRedirection(event.target.checked))}
                />
                <label className="form-check-label" htmlFor="spiceServerUsbRedirection">
                    With USB redirection
                </label>
            </div>
        </div>
    );
}

function SpiceServerPort() {
    const port = useAppSelector(state => state.vm.spiceServer.port);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="spiceServerPort" className="d-none">
                SPICE server port
            </label>
            <div className="input-group">
                <span className="input-group-text">Port</span>
                <input
                    id="spiceServerPort"
                    className="form-control"
                    type="number"
                    min={MIN_SPICE_SERVER_PORT}
                    max={MAX_SPICE_SERVER_PORT}
                    value={port}
                    onChange={event => dispatch(setPort(Number.parseInt(event.target.value)))}
                />
            </div>
        </div>
    );
}

export function SpiceServer() {
    const enabled = useAppSelector(state => state.vm.spiceServer.enabled);

    return (
        <div>
            <HorizontalLayout even={true}>
                <SpiceServerEnabled />
            </HorizontalLayout>
            {enabled && (
                <HorizontalLayout even={true}>
                    <SpiceServerPort />
                    <SpiceServerUsbRedirection />
                </HorizontalLayout>
            )}
        </div>
    );
}
