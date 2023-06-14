import { useState} from 'react'
import axios from 'axios'

export default function ChatInput({ user, clickedUser, getUserMessages, getClickedUsersMessages }) {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id


    const addMessage = async () => {
        let modifiedTextArea = textArea.trim(); // Eliminar espacios en blanco al inicio y al final
      
        // Verificar si hay un punto al final del texto
        if (modifiedTextArea.endsWith('.')) {
          // Eliminar el punto final
          modifiedTextArea = modifiedTextArea.slice(0, -1);
        }
      
        const message = {
          timestamp: new Date().toISOString(),
          from_userId: userId,
          to_userId: clickedUserId,
          message: modifiedTextArea // Usar el mensaje modificado sin el punto al final
        };
      
        try {
          await axios.post('http://localhost:8000/message', { message });
          getUserMessages();
          getClickedUsersMessages();
          setTextArea('');
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button" onClick={addMessage}>Enviar</button>
        </div>
    )
}