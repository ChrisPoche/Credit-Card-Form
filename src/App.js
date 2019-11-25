import React from 'react';
import './App.css';

import Form from './component/form';
import Card from './component/card';


class App extends React.Component {
  state = {
    cardNumber: '',
    cardName: '',
    cardCvv: '',
    error: '',
    provider: 'visa',
    formFocus: '',
    expMonth: '',
    expYear: '',
    status: ''
  }
  componentDidMount() {
    window.addEventListener('keypress', (e) => {
      if (e.srcElement.name === 'card-name') {
        if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123) || e.keyCode === 32 || e.keyCode === 39 || e.keyCode === 45) this.setError('');
        else if (e.keyCode === 32) this.onSubmit();
        else {
          e.preventDefault();
          this.setError('Name cannot contain special characters or numbers');
        }
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.srcElement.name === 'card-number' || e.srcElement.name === 'card-cvv') {
        if ((e.keyCode >= 57 && e.keyCode >= 48) && (e.keyCode >= 105 && e.keyCode >= 96)) e.preventDefault();
      }
      if (e.keyCode === 8 || e.keyCode === 46) this.setError('');
    });
    window.addEventListener('focusout', () => {
      document.getElementById('form-focus').style.visibility = 'hidden';
      document.getElementById('card').classList = '';
    });
  }
  setError = (error) => {
    this.setState({ error })
  }
  updateFocus = (focus, formFocus) => {    
    let coordinates = focus.getClientRects();
    formFocus.className = 'focus-name';
    formFocus.style.top = `${coordinates[0].top}px`;
    formFocus.style.left = `${coordinates[0].left}px`;
    formFocus.style.width = `${coordinates[0].width}px`;
    formFocus.style.height = `${coordinates[0].height}px`;
    formFocus.style.visibility = 'visible';
  }
  changeFocus = (e) => {
    let focusId = e.target.name;
    let focus = document.getElementById(focusId);
    this.setState({ formFocus : focus });
    let formFocus = document.getElementById('form-focus');
    if(focusId === 'card-cvv' || document.getElementById('card').classList.contains('flipped')) {
      // console.log('focusId',focusId);
      document.getElementById('card').classList = 'flipped'; 
      // window.addEventListener('transitionend', this.updateFocus(focus, formFocus));
      setTimeout(() => {
        this.updateFocus(focus,formFocus);
      }, 600);
    } 
    else if (focusId !== 'card-cvv'){
      this.updateFocus(focus, formFocus);
    }
  }
  changeTextColor = (provider) => {
    let providerColor;
    if (provider === 'visa') providerColor = '#0e4595';
    if (provider === 'amex') providerColor = '#2557d6';
    if (provider === 'mastercard') providerColor = '#ee9f2d';
    if (provider === 'discover') providerColor = '#f47216';
    document.getElementsByClassName('inline')[0].style.color = providerColor;
    document.getElementById('card-number').style.color = providerColor;
    document.getElementById('card-name-value').style.color = providerColor;
    document.getElementById('card-exp-month').style.color = providerColor;
    document.getElementById('card-exp-year').style.color = providerColor;
    document.getElementById('card-back').style.backgroundColor = providerColor;
  }
  changeProvider = (cardNumber) => {
    let provider;
    if (cardNumber[0] === '4') provider = 'visa';
    else if (cardNumber[0] === '5') provider = 'mastercard';
    else if (cardNumber[0] === '6') provider = 'discover';
    else if (cardNumber[0] === '3') provider = 'amex';
    else provider = 'visa'
    this.setState({ provider });
    return provider;
  }
  onCardNumberChange = (cardNumber) => {
    cardNumber = cardNumber.target.value.toString();
    let provider = this.changeProvider(cardNumber);
    this.changeTextColor(provider);
    if (cardNumber.length === 0) this.setState({ cardNumber: '' })
    let placeholder;
    provider === 'amex' ? placeholder = '###############' : placeholder = '################';
    let updateCardNumber = '';
    if (placeholder.length === 15) {
      for (let i = 0; i < placeholder.length; ++i) {
        i === 4 || i === 10 ? !!cardNumber[i] ? updateCardNumber += ' ' + cardNumber[i] : updateCardNumber += ' ' + placeholder[i] : !!cardNumber[i] ? updateCardNumber += cardNumber[i] : updateCardNumber += placeholder[i];
      }
    }
    else if (placeholder.length === 16) {
      for (let i = 0; i < placeholder.length; ++i) {
        i % 4 === 0 ? !!cardNumber[i] ? updateCardNumber += ' ' + cardNumber[i] : updateCardNumber += ' ' + placeholder[i] : !!cardNumber[i] ? updateCardNumber += cardNumber[i] : updateCardNumber += placeholder[i];
      }
    }
    cardNumber = updateCardNumber;
    this.setState({ cardNumber });
  }
  onCardChange = (val) => {
    this.changeTextColor(this.state.provider);
    // console.log('Coming through', val.target.id ,val.target.value);
    if(val.target.id === 'card-name-form') this.setState({ cardName: val.target.value });
    if(val.target.id === 'card-exp-month-form') {
      this.setState({ expMonth: val.target.value })
      this.resizeFocus();
    };
    if(val.target.id === 'card-exp-year-form') {
      this.setState({ expYear: val.target.value })
      this.resizeFocus();
    };
    if(val.target.id === 'card-cvv-form') this.setState({ cardCvv: val.target.value });
  };
  cvvFocusOut = () => {
    document.getElementById('card').classList = '';
  }
  resizeFocus = () => {
    let formFocus = document.getElementById('form-focus');
    let coordinates = this.state.formFocus.getClientRects();
    formFocus.className = 'focus-name';
    formFocus.style.width = `${coordinates[0].width}px`;
  }
  componentDidUpdate = () => {
    console.log(this.state);
  }
  focusOnForm = (e) => {
    console.log('Clicked on Card - Focussing on Form');
    let cardClick
    e.target.id === 'card-holder' || e.target.id === 'card-name-value' ? cardClick = 'card-name-form' : cardClick = document.getElementById(e.target.id).id + '-form';
    let formInput = document.getElementById(cardClick);
    formInput.focus();
  }
  onSubmit = (e) => {
    console.log('onSubmit',e);
    this.setState({status: 'Test: Your information has successfully been processed'});
  }
  render() {
    return (
      <div className="App">
        <Form
          formDetails={this.state}
          onCardNumberChange={this.onCardNumberChange}
          onCardChange={this.onCardChange}
          onCardCvvChange={this.onCardCvvChange} 
          changeFocus={this.changeFocus}
          cvvFocusOut={this.cvvFocusOut}
          onSubmit={this.onSubmit} />
        <div id='form-focus'></div>
        <Card
          cardDetails={this.state}
          focusOnForm={this.focusOnForm}
          resizeFocus={this.resizeFocus} />
      </div>
    );
  }
}

export default App;
