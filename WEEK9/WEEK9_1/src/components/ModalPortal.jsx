import React from 'react'

const ModalPortal = ({ children }) => {
    if (typeof window === "undefined") {
        return null;
    }

    const node = document.getElementById("portal");
    return reactDom.createPortal
    return (
        <div>ModalPortal</div>
    )
}

export default ModalPortal