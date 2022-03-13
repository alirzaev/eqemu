import * as React from 'react';

import { HorizontalLayout } from './HorizontalLayout';
import {
    setSpiceServerEnabled as setEnabled,
    setSpiceServerPassword as setPassword,
    setSpiceServerPort as setPort,
    setSpiceServerTicketing as setTicketing,
    setSpiceServerUsbRedirection as setUsbRedirection,
} from '../store/slices/vm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { MAX_SPICE_SERVER_PORT, MIN_SPICE_SERVER_PORT } from '../consts/vm';

function SpiceServerEnabled() {
    const { enabled } = useAppSelector(state => state.vm.spiceServer);
    const dispatch = useAppDispatch();

    return (
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
    );
}

function SpiceServerTicketing() {
    const { ticketing } = useAppSelector(state => state.vm.spiceServer);
    const dispatch = useAppDispatch();

    return (
        <div className="form-check mb-2">
            <input
                id="spiceServerTicketing"
                className="form-check-input"
                type="checkbox"
                checked={ticketing}
                onChange={event => dispatch(setTicketing(event.target.checked))}
            />
            <label className="form-check-label" htmlFor="spiceServerTicketing">
                With ticketing
            </label>
        </div>
    );
}

function SpiceServerUsbRedirection() {
    const checked = useAppSelector(state => state.vm.spiceServer.usbRedirection);
    const dispatch = useAppDispatch();

    return (
        <div className="form-check mb-2">
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
    );
}

function SpiceServerPort() {
    const { port } = useAppSelector(state => state.vm.spiceServer);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="spiceServerPort" className="form-label">
                SPICE server port
            </label>
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
    );
}

function SpiceServerPassword() {
    const { password, ticketing } = useAppSelector(state => state.vm.spiceServer);
    const dispatch = useAppDispatch();

    return (
        <div>
            <label htmlFor="spiceServerPassword" className="form-label">
                SPICE server password
            </label>
            <input
                id="spiceServerPassword"
                className="form-control"
                type="text"
                value={password}
                onChange={event => dispatch(setPassword(event.target.value))}
                disabled={!ticketing}
            />
        </div>
    );
}

export function SpiceServer() {
    const { enabled } = useAppSelector(state => state.vm.spiceServer);

    return (
        <div>
            <HorizontalLayout even={true}>
                <div>
                    <SpiceServerEnabled />
                </div>
                <div>
                    {enabled && <SpiceServerTicketing />}
                    {enabled && <SpiceServerUsbRedirection />}
                </div>
            </HorizontalLayout>
            {enabled && (
                <HorizontalLayout even={true}>
                    <SpiceServerPort />
                    <SpiceServerPassword />
                </HorizontalLayout>
            )}
        </div>
    );
}
