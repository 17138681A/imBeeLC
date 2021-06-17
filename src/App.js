import React, {Component} from 'react'
import logo from './logo_imbeeo.png';
import './App.css';
import { Widget, renderCustomComponent } from 'react-chat-widget';
import './styles.css';

class welcomeForm extends Component{
	render(){
		return <img src={logo} className="App-logo" alt="logo" />
	}
}

function App() {
	
	
		renderCustomComponent(welcomeForm);
	

	const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming!` , newMessage);
    // Now send the message throught the backend API
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <b>
		  Live Chat Demo
        </b>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          imBee
        </a>
      </header>
	  <Widget 
	  subtitle = "imBee Team"
	  handleNewUserMessage={handleNewUserMessage}
	  />
    </div>
  );
}


export default App;
