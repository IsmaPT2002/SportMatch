import Image from 'next/image';
import {useCookies} from 'react-cookie'

export default function ChatHeader({user}) {

    const [ cookies, removeCookie ] = useCookies(['user'])

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.href = '/'

    }
    const perfil = () => {window.location.href = '/Onboarding'}

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <Image src={user.url} alt={"photo of " + user.first_name} width={50} height={50} onClick={perfil}/>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}