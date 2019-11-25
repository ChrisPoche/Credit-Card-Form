import React from 'react';
import { ReactComponent as Visa } from '../images/visa.svg';
import { ReactComponent as Mastercard } from '../images/mastercard.svg';
import { ReactComponent as Discover } from '../images/discover.svg';
import { ReactComponent as Amex } from '../images/amex.svg';


export default class Provider extends React.Component {
    render() {
        return (
            <div>
                {this.props.provider === 'visa' && <Visa id='card-provider' />}
                {this.props.provider === 'mastercard' && <Mastercard id='card-provider' />}
                {this.props.provider === 'discover' && <Discover id='card-provider' />}
                {this.props.provider === 'amex' && <Amex id='card-provider' />}
            </div>
        )
    }
}
