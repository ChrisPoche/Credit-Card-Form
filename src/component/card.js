import React from 'react';
import Provider from './provider.js';

export default class Card extends React.Component {
    render() {
        return (
            <div id='card'>
                <div id='card-front'>
                    <Provider provider={this.props.cardDetails.provider} />
                    <h1 id='card-number' onClick={this.props.focusOnForm}>{this.props.cardDetails.cardNumber ? this.props.cardDetails.cardNumber : '#### #### #### ####'}</h1>
                    <div id='card-name' onClick={this.props.focusOnForm}>
                        <h3 id='card-holder'>Card Holder</h3>
                        {this.props.cardDetails.cardName ? <h2 id='card-name-value'>{this.props.cardDetails.cardName}</h2> : <h2 id='card-name-value'>Your Name</h2>}
                    </div>
                    <div id='card-exp'>
                        <h3 id='card-expires'>Expires</h3>
                        {this.props.cardDetails.expMonth ? <h2 id='card-exp-month' onClick={this.props.focusOnForm}>{this.props.cardDetails.expMonth}</h2> : <h2 onClick={this.props.focusOnForm} id='card-exp-month'>MM</h2>}
                        <h2 className='inline'>/</h2>
                        {this.props.cardDetails.expYear ? <h2 id='card-exp-year' onClick={this.props.focusOnForm}>{this.props.cardDetails.expYear.length > 2 ? this.props.cardDetails.expYear.slice(2) : this.props.cardDetails.expYear}</h2> : <h2 onClick={this.props.focusOnForm} id='card-exp-year'>YY</h2>}
                    </div>
                    <img id='chip' src={require('../images/credit-card-chip.png')} alt='credit card chip' />
                </div>
                <div id='card-back'>
                    <div id='mag-stripe'></div>
                    <div id='signature'>
                        <div id='card-cvv'>
                            <h4>CVV</h4>
                            <h3>{this.props.cardDetails.cardCvv}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}