import * as React from 'react';
import { connect } from 'react-redux';
import { extname } from 'path';

import { AppDispatch, RootState } from '../../store';
import { setNewImageSize, createNewImage, resetNewImageState, setNewImagePath } from '../../store/slices/newImage';
import { setHardDrivePath } from '../../store/slices/vm';
import { setWindowActiveView } from '../../store/slices/window';
import { DiskImageFormat } from '../../enums';
import { MAX_NEW_IMAGE_SIZE, MIN_NEW_IMAGE_SIZE } from '../../consts/newImage';

import './index.css';

const NEW_IMAGE_SIZE_STEP = 0.1;

type IOwnProps = Record<string, never>;

interface IStateProps {
    busy: boolean;
    status: string;
    path: string;
    size: number;
}

interface IDispatchProps {
    setPath: (path: string) => void;
    setHardDrivePath: (path: string) => void;
    setSize: (size: number) => void;
    create: () => Promise<string>;
    reset: () => void;
    close: () => void;
}

class CreateNewImageInner extends React.PureComponent<IOwnProps & IStateProps & IDispatchProps> {
    displayName = 'CreateNewImage';

    componentWillUnmount() {
        this.props.reset();
    }

    selectPath = async () => {
        const result = await electron.dialog.showSaveDialog({
            defaultPath: this.props.path,
            filters: [
                { name: 'QEMU disk image', extensions: ['qcow2'] },
                { name: 'VMware disk image', extensions: ['vmdk'] },
                { name: 'VirtualBox disk image', extensions: ['vdi'] },
            ],
        });

        if (!result.canceled && result.filePath) {
            let newPath = result.filePath;

            newPath = extname(newPath) === '' ? `${newPath}.${DiskImageFormat.QCOW2}` : newPath;
            this.props.setPath(newPath);
        }
    };

    setSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setSize(Number.parseFloat(event.target.value));
    };

    createImage = async () => {
        const status = await this.props.create();

        if (status === 'ready') {
            this.props.setHardDrivePath(this.props.path);
            this.props.close();
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
                        value={this.props.path}
                        disabled={this.props.busy}
                        readOnly
                    />
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={this.selectPath}
                        disabled={this.props.busy}
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
                            value={this.props.size}
                            onChange={this.setSize}
                            disabled={this.props.busy}
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
                                value={this.props.size}
                                onChange={this.setSize}
                                disabled={this.props.busy}
                            />
                            <span className="input-group-text">GiB</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderImageStatus() {
        let statusElement;

        if (this.props.status === 'failed') {
            statusElement = <span className="text-danger">Failed to create an image</span>;
        } else if (this.props.status === 'pending') {
            statusElement = <span className="text-secondary">Creating...</span>;
        }

        return (
            <div className="create-new-image-status">
                <button type="button" className="btn btn-primary" onClick={this.createImage} disabled={this.props.busy}>
                    Create
                </button>
                {statusElement}
            </div>
        );
    }

    render() {
        const imagePath = this.renderImagePath();
        const imageSize = this.renderImageSize();
        const imageStatus = this.renderImageStatus();

        return (
            <div className="create-new-image">
                <div className="create-new-image-header">
                    <h1>Create a new disk image</h1>
                </div>
                <div className="create-new-image-main">
                    {imagePath}
                    {imageSize}
                    {imageStatus}
                </div>
                <div className="create-new-image-footer">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={this.props.close}
                        disabled={this.props.busy}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

export const CreateNewImage = connect<IStateProps, IDispatchProps, IOwnProps, RootState>(
    state => ({
        busy: state.newImage.status === 'pending',
        status: state.newImage.status as string,
        path: state.newImage.path,
        size: state.newImage.size,
    }),
    (dispatch: AppDispatch) => ({
        setPath: path => dispatch(setNewImagePath(path)),
        setHardDrivePath: path => dispatch(setHardDrivePath(path)),
        setSize: size => dispatch(setNewImageSize(size)),
        create: () => dispatch(createNewImage()).then(({ payload }) => payload as string),
        reset: () => dispatch(resetNewImageState()),
        close: () => dispatch(setWindowActiveView('main')),
    })
)(CreateNewImageInner);
