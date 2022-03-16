
import React from 'react';


const button = props => {
    const { styles, color } = props;

    const buttonStyles =() => {
        if(styles === 'filed') {
                return 'button button-filed'
            }

        if(styles === 'outlined') {
            return 'button button-outlined'
        }
    }

    return (
        <button className={buttonStyles()}> 
            {props.children}
        </button>
    )
}


export default button;