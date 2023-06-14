export default function Chat({ descendingOrderMessages }) {
    const modifiedMessages = descendingOrderMessages.map((message) => ({
      ...message,
      modifiedMessage: message.message.trim()
    }));
  
    return (
      <>
        <div className="chat-display">
          {modifiedMessages.map((message, index) => (
            <div key={index} className={`chat-message-header ${message.sender === 'user' ? 'right' : 'left'}`}>
              <p className="message">{message.modifiedMessage}</p>
              <div className="sender">
                <div className="img-container">
                  <img src={message.img} alt={message.first_name + ' profile'} />
                </div>
                <p className="name">{message.name}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  