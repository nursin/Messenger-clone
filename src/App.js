import { useEffect, useState } from 'react';
import './App.css';
import { Button, Input, InputLabel } from '@mui/material';
import { FormControl, IconButton } from '@mui/material';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt('Please enter your name:'))
  }, [])

  useEffect(() => {
    // run once when app component loads
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      });
  }, [])

  const sendMessage = (event) => {
    // all logic to send message goes here
    event.preventDefault()

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessages([...messages, { username: username, message: input }])
    setInput('')
  }

  return (
    <div className="app">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="" />
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder="Enter a message ..."
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            type="submit"
            onClick={sendMessage}
            color="primary"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* messages */}
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message
              key={id}
              message={message}
              username={username}
            />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
