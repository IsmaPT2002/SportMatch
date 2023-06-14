export default function Chat({ descendingOrderMessages }) {
    return (
      <>
        <div className="chat-display">
          {descendingOrderMessages.map((message, index) => (
            <div key={index} className={`chat-message-header ${message.sender === 'user' ? 'right' : 'left'}`}>
              <p className="message">{message.message}</p>
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
  