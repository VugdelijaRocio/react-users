import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useClickOutside } from '../../hooks/useOutsideClick';
import "./index.scss";

interface PropTypes {
    children: JSX.Element,
    onClose?: () => void;
    onClickOutside?: () => void;
}

export const Dialog = ({children, onClose, onClickOutside}: PropTypes) => {

    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose && onClose();
    }

    
    const handleClickOutside = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClickOutside && onClickOutside();
    }
    const ref = useRef(null);
    useClickOutside(ref, handleClickOutside);

    return (
        <div className='dialog-container'>
            <div className='ui-dialog' ref={ref}>
                <button className='close' onClick={handleClose}>
                    <IoMdClose size={24} />
                </button>
                {children}
            </div>
        </div>
    )
}
