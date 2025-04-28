import instance from '../../api/server_api'
import { user_data_store } from '../../state/UserDataState';
import { interface_styles, interface_colors } from '../../styles/ColorData';

import LinkImage from './LinkImage';
import Link from './Link';
import Button from './Button';

function LoginTab(props) {

    const login = (formData) => {
        user_data_store.tryToLogin(formData);
    };

    return (
        <div style={{...interface_styles.modal_window, backgroundColor: interface_colors.background_color}}>
            <form style={interface_styles.login} action={login}>
                <input type="text" name="login" placeholder="Логин" maxLength={20}/>
                <input type="text" name="password" placeholder="Пароль" maxLength={30}/>
                <button type="submit">Войти</button>
                <Link contence={"Перейти к регистрации"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} 
                    onClick={() => props.register_action()}/>
            </form>
            <LinkImage image_name={"ExitButton.svg"} main_style={interface_styles.exit_button} 
                hover_style={{...interface_styles.exit_button, backgroundColor: interface_colors.a_color_hover}}
                onClick={() => props.exit_action()}/>
        </div>
    )
}

export default LoginTab;