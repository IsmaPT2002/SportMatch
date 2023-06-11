import Image from 'next/image';
import {useCookies} from 'react-cookie'

export default function ChatHeader({user}) {

    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()

    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <Image src={user.url} alt={"photo of " + user.first_name} width={50} height={50}/>
                </div>
                <h3>{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}