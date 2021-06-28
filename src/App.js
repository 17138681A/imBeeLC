import React, {Component, useEffect, useState} from 'react'
import logo from './logo_imbeeo.png';
import { Widget, renderCustomComponent, addResponseMessage, toggleInputDisabled, dropMessages} from 'react-chat-widget';
import { Formik } from 'formik';
import * as Yup from "yup";
import "yup-phone";
import FadeIn from 'react-fade-in';
import {useSelector, useDispatch} from "react-redux";
import {Action} from "./app/action_types";
import './App.css';
import './styles.css';
import './welcomeForm.css';


function App() {
	
	const isShowingForm = useSelector((state)=>state.contactForm.isShowingForm)

	useEffect(()=>{

		toggleInputDisabled();
		renderCustomComponent(ContactForm);

		if(!isShowingForm){
			console.log("Dropping messages...", isShowingForm);
			dropMessages();
		}
		
	}, [isShowingForm]);

	/*
	useEffect(()=>{

		dropMessages();

	}, [isShowingForm])
	*/

	const handleQuickButtonClicked = (message) => {
		
		renderCustomComponent(ContactForm);
		
	};
	
	const handleNewUserMessage = (newMessage) => {
		
		console.log(`New message incoming!` , newMessage);
		setTimeout(function(){addResponseMessage('Welcome! What can we help you with?')}.bind(this),500);
		
		//setTimeout(addResponseMessage('Welcome! What can we help you?'),1000);
		//renderCustomComponent(welcomeForm);
		// Now send the message through the backend API
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
	  senderPlaceHolder = "Complete the form to start chating!"
	  defaultUserMessage={false}
	  />
	  
	 
    </div>
  );
}


function ContactForm() {

	const isShowingForm = useSelector((state)=>state.contactForm.isShowingForm);
	const dispatch = useDispatch();

	return(

		<div>
		{isShowingForm? <Formik
		  
		  initialValues={{ email: "", phone: "", name: ""}}
		  onSubmit={async values => {
			const that = this;
			await new Promise(resolve => setTimeout(resolve, 500));
			alert(JSON.stringify(values, null, 2));
			toggleInputDisabled();
			//this.props.onSubmitChange();
			dispatch({type: Action.IS_SUBMITTED});
			console.log(`current state: `, isShowingForm);
			//this.setState({ showingForm: false});
		  }}
		  validationSchema={Yup.object().shape({
			name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("Invalid user name"),
			email: Yup.string().email().required("Invalid email address"),
			phone: Yup.string().phone('HK').required("Invalid phone number")
		  })}
		>
		  {props => {
			const {
			  values,
			  touched,
			  errors,
			  dirty,
			  isSubmitting,
			  handleChange,
			  handleBlur,
			  handleSubmit,
			  handleReset
			} = props;
			return (
			
			  
			  <form onSubmit={handleSubmit}>
				<FadeIn>
				
				<label className="email" for="rg-from" htmlFor="name" style={{ display: "flex", marginLeft: "10px"}}>
				
				  Name: 
				  
				  <input style={{ marginLeft: "14px", marginRight: "80px", display: "flex"}}
				  id="name"
				  placeholder=""
				  type="text"
				  value={values.name}
				  onChange={handleChange}
				  onBlur={handleBlur}
				  className={
					errors.name && touched.name
					  ? "text-input error"
					  : "text-input"
				  }
				  />
				  
				</label>
				
				{errors.name && touched.name && (
				  <div className="input-feedback">{errors.name}</div>
				)}
				
				<label className="email" for="rg-from" htmlFor="email" style={{ display: "flex", marginLeft: "10px"}}>
				
				  Email: 
				  
				  <input style={{ marginLeft: "18px", marginRight: "80px", display: "flex"}}
				  id="email"
				  placeholder=""
				  type="text"
				  value={values.email}
				  onChange={handleChange}
				  onBlur={handleBlur}
				  className={
					errors.email && touched.email
					  ? "text-input error"
					  : "text-input"
				  }
				  />
				  
				</label>
				
				{errors.email && touched.email && (
				  <div className="input-feedback">{errors.email}</div>
				)}
				
				<label className="email" for="rg-from" htmlFor="phone" style={{ display: "flex", marginLeft: "10px"}}>
				
				  Phone: 
				  
				  <input style={{ marginLeft: "10px", marginRight: "80px", display: "flex"}}
				  id="phone"
				  placeholder=""
				  type="text"
				  value={values.phone}
				  onChange={handleChange}
				  onBlur={handleBlur}
				  className={
					errors.email && touched.email
					  ? "text-input error"
					  : "text-input"
				  }
				  />
				
				</label>
				
				{errors.phone && touched.phone && (
				  <div className="input-feedback">{errors.phone}</div>
				)}						
				
				<div>
				<button
				  type="button"
				  className="outline"
				  onClick={handleReset}
				  disabled={!dirty || isSubmitting}
				>
				  Reset
				</button>
				<button type="submit" className="outline" disabled={isSubmitting}>
				  Submit
				</button>
				</div>
				</FadeIn>
			  </form>
			  
			);
		  }}
		</Formik> : null}
		</div>
	);
}

export default App;

/*
class welcomeForm extends Component{
		
	  constructor(props) {
		  
		super(props);
		//this.state={showingForm: props.showingForm};
		
	  }
	
	  
	  componentWillReceiveProps(nextProps){
		  
		  this.setState({ showingForm: nextProps.showingForm });
		  
	  }
	  
	  
	  render() {
		const phoneRegExp = "/^1[0-9]{10}$|^[569][0-9]{7}$/"
		//const {showingForm} = this.state
		return (
			<div>
			{this.props.showingForm? <Formik
			  
			  initialValues={{ email: "", phone: "", name: ""}}
			  onSubmit={async values => {
				const that = this;
				await new Promise(resolve => setTimeout(resolve, 500));
				alert(JSON.stringify(values, null, 2));
				toggleInputDisabled();
				this.props.onSubmitChange();
				console.log(`current state: `,this.props.showingForm);
				//this.setState({ showingForm: false});
			  }}
			  validationSchema={Yup.object().shape({
				name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("Invalid user name"),
				email: Yup.string().email().required("Invalid email address"),
				phone: Yup.string().phone('HK').required("Invalid phone number")
			  })}
			>
			  {props => {
				const {
				  values,
				  touched,
				  errors,
				  dirty,
				  isSubmitting,
				  handleChange,
				  handleBlur,
				  handleSubmit,
				  handleReset
				} = props;
				return (
				
				  
				  <form onSubmit={handleSubmit}>
					<FadeIn>
					
					<label className="email" for="rg-from" htmlFor="name" style={{ display: "flex", marginLeft: "10px"}}>
					
					  Name: 
					  
					  <input style={{ marginLeft: "14px", marginRight: "80px", display: "flex"}}
					  id="name"
					  placeholder=""
					  type="text"
					  value={values.name}
					  onChange={handleChange}
					  onBlur={handleBlur}
					  className={
						errors.name && touched.name
						  ? "text-input error"
						  : "text-input"
					  }
					  />
					  
					</label>
					
					{errors.name && touched.name && (
					  <div className="input-feedback">{errors.name}</div>
					)}
					
					<label className="email" for="rg-from" htmlFor="email" style={{ display: "flex", marginLeft: "10px"}}>
					
					  Email: 
					  
					  <input style={{ marginLeft: "18px", marginRight: "80px", display: "flex"}}
					  id="email"
					  placeholder=""
					  type="text"
					  value={values.email}
					  onChange={handleChange}
					  onBlur={handleBlur}
					  className={
						errors.email && touched.email
						  ? "text-input error"
						  : "text-input"
					  }
					  />
					  
					</label>
					
					{errors.email && touched.email && (
					  <div className="input-feedback">{errors.email}</div>
					)}
					
					<label className="email" for="rg-from" htmlFor="phone" style={{ display: "flex", marginLeft: "10px"}}>
					
					  Phone: 
					  
					  <input style={{ marginLeft: "10px", marginRight: "80px", display: "flex"}}
					  id="phone"
					  placeholder=""
					  type="text"
					  value={values.phone}
					  onChange={handleChange}
					  onBlur={handleBlur}
					  className={
						errors.email && touched.email
						  ? "text-input error"
						  : "text-input"
					  }
					  />
					
					</label>
					
					{errors.phone && touched.phone && (
					  <div className="input-feedback">{errors.phone}</div>
					)}						
					
					<div>
					<button
					  type="button"
					  className="outline"
					  onClick={handleReset}
					  disabled={!dirty || isSubmitting}
					>
					  Reset
					</button>
					<button type="submit" className="outline" disabled={isSubmitting}>
					  Submit
					</button>
					</div>
					</FadeIn>
				  </form>
				  
				);
			  }}
		</Formik> : null}
		</div>
		);
	  }
}

class app extends Component{
	
	constructor(props) {
        super(props);
		this.state = {showingForm: true};
		this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
    }
	
	handleOnSubmitForm(){
		
		this.setState({ showingForm: false});
		console.log(`state is setted: `,this.state.showingForm);
		
	}
	
	handleNewUserMessage(message){
		
		console.log(`New message incoming!` , message);
		//await this.timeout(1000);
		setTimeout(function(){addResponseMessage('Welcome! What can we help you?')}.bind(this),500);
		
	}
	
	componentDidMount(){
		
		//const {showingForm} = this.state;
		//let handleOnSubmitForm = this.handleOnSubmitForm;
		toggleInputDisabled();
		renderCustomComponent(welcomeForm, {showingForm:this.state.showingForm, onSubmitChange:this.handleOnSubmitForm.bind(this)});
		
	}
	
	componentDidUpdate(prevState){
		
		if(prevState.showingForm !== this.state.showingForm){
			
			console.log(`state is setted: `,this.state.showingForm);
			dropMessages();
			//renderCustomComponent(welcomeForm, {showingForm:this.state.showingForm, onSubmitChange:this.handleOnSubmitForm.bind(this)});
		
		}
	}
	
	render(){
		return(
		
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
			  handleNewUserMessage={this.handleNewUserMessage}
			  senderPlaceHolder = "Complete the form to start chating!"
			  defaultUserMessage={false}
			  />
			  
			 
			</div>
		)
	}
}

*/


