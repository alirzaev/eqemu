import * as React from 'react';
import { connect } from 'react-redux';
import { extname } from 'path';

import { RootState } from '../../store';
import { setHardDrivePath } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { DiskImageFormat } from '../../enums';
import { MAX_NEW_IMAGE_SIZE, MIN_NEW_IMAGE_SIZE } from '../../consts/newImage';
import { getImageFileFormat } from '../../utils';

import './index.css';

const NEW_IMAGE_SIZE_STEP = 0.1;

type IOwnProps = Record<string, never>;

type IStateProps = Record<string, never>;

interface IDispatchProps {
    setHardDrivePath: (path: string) => void;
    close: () => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

type ImageCreationStatus = 'pending' | 'failed' | 'ready';

interface IState {
    path: string;
    size: number;
    status: ImageCreationStatus;
}

class CreateNewImageInner extends React.PureComponent<IProps, IState> {
    private unmounted = false;

    displayName = 'CreateNewImage';

    constructor(props: IProps) {
        super(props);

        this.state = {
            path: '',
            size: 25,
            status: 'ready',
        };
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    isPending = () => this.state.status === 'pending';

    selectImagePath = async () => {
        const result = await electron.dialog.showSaveDialog({
            defaultPath: this.state.path,
            filters: [
                { name: 'QEMU disk image', extensions: ['qcow2'] },
                { name: 'VMware disk image', extensions: ['vmdk'] },
                { name: 'VirtualBox disk image', extensions: ['vdi'] },
            ],
        });

        if (!result.canceled && result.filePath) {
            let newPath = result.filePath;

            newPath = extname(newPath) === '' ? `${newPath}.${DiskImageFormat.QCOW2}` : newPath;
            this.setState({ path: newPath });
        }
    };

    setImageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const size = Number.parseFloat(event.target.value);

        this.setState({
            size,
        });
    };

    createImage = async () => {
        this.setState({ status: 'pending' });

        const { path, size } = this.state;
        const format = getImageFileFormat(path);

        try {
            const result = await electron.system.createImage(path, format, size);
            const ok = typeof result === 'string';

            if (this.unmounted) {
                console.log('unmounted');
                return;
            }

            if (ok) {
                this.setState({ status: 'ready' });
                this.props.setHardDrivePath(path);
                this.props.close();
            } else {
                this.setState({ status: 'failed' });
            }
        } catch (_) {
            this.setState({ status: 'failed' });
        }
    };

    renderImagePath() {
        return (
            <div>
                <label htmlFor="newImagePath" className="form-label">
                    Path
                </label>
                <div className="input-group mb-2">
                    <input
                        id="newImagePath"
                        className="form-control"
                        type="text"
                        value={this.state.path}
                        disabled={this.isPending()}
                        readOnly
                    />
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={this.selectImagePath}
                        disabled={this.isPending()}
                    >
                        Select
                    </button>
                </div>
            </div>
        );
    }

    renderImageSize() {
        return (
            <div>
                <label htmlFor="newImageSizeRange" className="form-label">
                    Image size
                </label>
                <div className="create-new-image-size-block">
                    <div className="create-new-image-size-range">
                        <span>{MIN_NEW_IMAGE_SIZE} GiB</span>
                        <input
                            type="range"
                            id="newImageSizeRange"
                            min={MIN_NEW_IMAGE_SIZE}
                            max={MAX_NEW_IMAGE_SIZE}
                            step={NEW_IMAGE_SIZE_STEP}
                            className="form-range"
                            value={this.state.size}
                            onChange={this.setImageSize}
                            disabled={this.isPending()}
                        />
                        <span>{MAX_NEW_IMAGE_SIZE} GiB</span>
                    </div>
                    <div className="create-new-image-size-numeric">
                        <div className="input-group">
                            <input
                                type="number"
                                min={MIN_NEW_IMAGE_SIZE}
                                max={MAX_NEW_IMAGE_SIZE}
                                step={NEW_IMAGE_SIZE_STEP}
                                className="form-control"
                                value={this.state.size}
                                onChange={this.setImageSize}
                                disabled={this.isPending()}
                            />
                            <span className="input-group-text">GiB</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderImageControls() {
        let status;

        switch (this.state.status) {
            case 'failed':
                status = <span className="text-danger">Failed to create an image</span>;
                break;
            case 'pending':
                status = <span className="text-secondary">Creating...</span>;
                break;
            default:
                status = null;
        }

        return (
            <div className="create-new-image-controls">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.createImage}
                    disabled={this.isPending()}
                >
                    Create
                </button>
                {status}
            </div>
        );
    }

    render() {
        const imagePath = this.renderImagePath();
        const imageSize = this.renderImageSize();
        const imageControls = this.renderImageControls();

        return (
            <div className="create-new-image">
                <div className="create-new-image-header">
                    <h1>Create a new disk image</h1>
                </div>
                <div className="create-new-image-main">
                    {imagePath}
                    {imageSize}
                    {imageControls}
                </div>
                <div className="create-new-image-footer">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={this.props.close}
                        disabled={this.isPending()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

export const CreateNewImage = connect<IStateProps, IDispatchProps, IOwnProps, RootState>(null, dispatch => ({
    setHardDrivePath: path => dispatch(setHardDrivePath(path)),
    close: () => dispatch(setWindowActiveView('main')),
}))(CreateNewImageInner);
