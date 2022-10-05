export const Popover = ({ children, visible, onHide }) => {
    return <>
        {visible ? <div className="absolute top-0 left-0 right-0 bottom-24" onClick={() => onHide()}/> : null}
        <div className={`
            absolute bottom-24 right-0 bg-white transition-all ${visible ? 'h-96 visible' : 'h-0 invisible'}
            border-gray-100 border-solid border-l border-t
        `}>
            {children}
        </div>
    </>
}
