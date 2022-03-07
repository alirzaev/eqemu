import * as React from 'react';
import { connect } from 'react-redux';

import { HorizontalLayout } from './HorizontalLayout';
import { AppDispatch, RootState } from '../store';
import {
    setSpiceServerEnabled,
    setSpiceServerPassword,
    setSpiceServerPort,
    setSpiceServerTicketing,
    setSpiceServerUsbRedirection,
} from '../store/slices/vm';

interface StateProps {
    enabled: boolean;
    port: number;
    ticketing: boolean;
    password: string;
    usbRedirection: boolean;
}

interface DispatchProps {
    setEnabled: (enabled: boolean) => void;
    setPort: (port: number) => void;
    setTicketings: (ticketing: boolean) => void;
    setPassword: (password: string) => void;
    setUsbRedirection: (usbRedirection: boolean) => void;
}

class SpiceServerComponent extends React.Component<StateProps & DispatchProps> {
    render(): React.ReactNode {
        const { enabled, port, ticketing, password, usbRedirection } = this.props;

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
                                onChange={event => this.props.setEnabled(event.target.checked)}
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
                                    onChange={event => this.props.setTicketings(event.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="spiceServerTicketing">
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
                                    onChange={event => this.props.setUsbRedirection(event.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="spiceServerUsbRedirection">
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
                                onChange={event => this.props.setPort(+event.target.value)}
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
                                onChange={event => this.props.setPassword(event.target.value)}
                                disabled={!ticketing}
                            />
                        </div>
                    </HorizontalLayout>
                )}
            </div>
        );
    }
}

export const SpiceServer = connect<StateProps, DispatchProps, Record<string, never>, RootState>(
    (state: RootState) => ({
        ...state.vm.spiceServer,
    }),
    (dispatch: AppDispatch) => ({
        setEnabled: enabled => dispatch(setSpiceServerEnabled(enabled)),
        setPort: port => dispatch(setSpiceServerPort(port)),
        setTicketings: ticketing => dispatch(setSpiceServerTicketing(ticketing)),
        setPassword: password => dispatch(setSpiceServerPassword(password)),
        setUsbRedirection: usbRedirection => dispatch(setSpiceServerUsbRedirection(usbRedirection)),
    })
)(SpiceServerComponent);
