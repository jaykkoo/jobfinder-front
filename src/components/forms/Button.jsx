import React from 'react';

export default function Button({children, classes="", effects="", onClick, icon=""}) {
    return (
        <button className={`${classes} ${effects}`} onClick={onClick || (() => {})}>
            {icon && <span className="button-icon">{icon}</span>}
            {children}
        </button>
    );
}
