
import React from 'react';
import styles from './styles.css'


const Logo = props => {
    const { styles, color } = props;

    const LogoStyles =() => {
        if(styles === 'logo') {
                return 'logo-auth'
            }

        if(styles === 'logo-menu') {
            return 'logo-menu'
        }
    }

    return (
        <div className={LogoStyles()}> 
            {props.children}
            <img width="100%" src="https://nodaudigital.com.br/wp-content/uploads/2021/08/logo.png"></img>
        </div>
    )
}


export default Logo;