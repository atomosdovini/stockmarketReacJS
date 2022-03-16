import React from 'react';


const Container = props => {
    const { styles, color } = props;

    const containerStyles =() => {
        if(styles === 'container') {
                return 'simple-container'
            }

        if(styles === 'big-container') {
            return 'container-wrapper'
        }
    }

    return (
        <div className={containerStyles()}> 
            {props.children}
        </div>
    )
}


export default Container;