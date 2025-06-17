import instance from '../../api/server_api'
import { user_data_store } from '../../state/UserDataState';
import { interface_styles, interface_colors, input, button, button_hover } from '../../styles/ColorData';
import { observer } from 'mobx-react-lite';

import LinkImage from './LinkImage';
import Link from './Link';
import Button from './Button';

const LoginTab = observer((props) => {

    const login = (formData) => {
        user_data_store.tryToLogin(formData);
    };

    return (
        <div style={{...interface_styles.modal_window, backgroundColor: interface_colors.background_color}}>
            <form style={interface_styles.login} action={login}>
                <input style={!user_data_store.error ? input : {...input, backgroundColor: '#FF7F81'}} type="text" name="login" placeholder="Логин" maxLength={20}/>
                <input style={!user_data_store.error ? input : {...input, backgroundColor: '#FF7F81'}} type="text" name="password" placeholder="Пароль" maxLength={30}/>
                <Button text={"Войти"} main_style={button} hover_style={button_hover}/>
                <Link contence={"Перейти к регистрации"} main_style={{...interface_styles.a, color: interface_colors.a_color}} 
                    hover_style={{...interface_styles.a, color: interface_colors.a_color_hover}} 
                    onClick={() => props.register_action()}/>
            </form>
            <LinkImage image_name={"ExitButton.svg"} main_style={interface_styles.exit_button} 
                hover_style={{...interface_styles.exit_button, backgroundColor: interface_colors.a_color_hover}}
                onClick={() => props.exit_action()}/>
        </div>
    )
});

export default LoginTab;