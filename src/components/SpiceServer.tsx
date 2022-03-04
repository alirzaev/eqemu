import * as React from 'react';

import { HorizontalLayout } from './HorizontalLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    setSpiceServerEnabled,
    setSpiceServerPassword,
    setSpiceServerPort,
    setSpiceServerTicketing,
    setSpiceServerUsbRedirection,
} from '../store/slices/vm';

export function SpiceServer() {
    const { enabled, port, ticketing, password, usbRedirection } = useAppSelector(state => state.vm.spiceServer);
    const dispatch = useAppDispatch();

    const onChangePortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;

        dispatch(setSpiceServerPort(value));
    };

    const onChangeEnabledHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setSpiceServerEnabled(value));
    };

    const onChangeTicketingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setSpiceServerTicketing(value));
    };

    const onChangePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        dispatch(setSpiceServerPassword(value));
    };

    const onChangeUsbRedirectionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;

        dispatch(setSpiceServerUsbRedirection(value));
    };

    return (
        <div>
            <HorizontalLayout even={true}>
                <div>
                    <div className="form-check mb-2">
                        <input
                            id="spiceServerEnabled"
                            className="form-check-input"
                            type="checkbox"
                            checked={enabled}
                            onChange={onChangeEnabledHandler}
                        />
                        <label className="form-check-label" htmlFor="spiceServerEnabled">
                            Enable SPICE server
                        </label>
                    </div>
                </div>
                <div>
                    {enabled && (
                        <div className="form-check mb-2">
                            <input
                                id="spiceServerTicketing"
                                className="form-check-input"
                                type="checkbox"
                                checked={ticketing}
                                onChange={onChangeTicketingHandler}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="spiceServerTicketing"
                            >
                                With ticketing
                            </label>
                        </div>
                    )}
                    {enabled && (
                        <div className="form-check mb-2">
                            <input
                                id="spiceServerUsbRedirection"
                                className="form-check-input"
                                type="checkbox"
                                checked={usbRedirection}
                                onChange={onChangeUsbRedirectionHandler}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="spiceServerUsbRedirection"
                            >
                                With USB redirection
                            </label>
                        </div>
                    )}
                </div>
            </HorizontalLayout>
            {enabled && (
                <HorizontalLayout even={true}>
                    <div>
                        <label htmlFor="spiceServerPort" className="form-label">
                            SPICE server port
                        </label>
                        <input
                            id="spiceServerPort"
                            className="form-control"
                            type="number"
                            min="0"
                            max="65535"
                            value={port}
                            onChange={onChangePortHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="spiceServerPassword" className="form-label">
                            SPICE server password
                        </label>
                        <input
                            id="spiceServerPassword"
                            className="form-control"
                            type="text"
                            value={password}
                            onChange={onChangePasswordHandler}
                            disabled={!ticketing}
                        />
                    </div>
                </HorizontalLayout>
            )}
        </div>
    );
}
