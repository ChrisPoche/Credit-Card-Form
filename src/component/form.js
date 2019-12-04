import React from 'react';


export default class Form extends React.Component {
    addMonths = () => {
        let options = [];
        for (let i = 1; i <= 12; ++i) {
            let val;
            i < 10 ? val = '0' + i : val = i;
            options.push(<option key={val} value={val}>{val}</option>)
        }
        return options
    }
    addYears = () => {
        let options = [];
        let now = new Date();
        let month = now.getMonth();
        let year = now.getFullYear();
        let yearOffset = month + 1 > parseInt(this.props.formDetails.expMonth) ? 1 : 0;
        console.log('Month', month + 1, 'YearOffset', yearOffset, 'ExpMonth', parseInt(this.props.formDetails.expMonth));
        for (let i = yearOffset; i <= 10; ++i) {
            options.push(<option key={year + i} value={year + i}>{year + i}</option>)
        }
        return options
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', e);
        this.props.onSubmit(e);
    }
    render() {
        return (
            <div id='form' onSubmit={this.onSubmit}>
                <form>
                    <p>Card Number</p>
                    <input
                        name='card-number'
                        id='card-number-form'
                        autoComplete='off'
                        type='text'
                        maxLength={this.props.formDetails.provider === 'amex' ? '15' : '16'}
                        onChange={this.props.onCardNumberChange}
                        onFocus={this.props.changeFocus} />
                    <p>Card Name</p>
                    <input
                        name='card-name'
                        id='card-name-form'
                        autoComplete='off'
                        type='text'
                        onChange={this.props.onCardChange}
                        onFocus={this.props.changeFocus} />
                    {this.props.formDetails.error && <p id='error'>{this.props.formDetails.error}</p>}
                    <div>
                        <div id='exp'>
                            <p>Expiration Date</p>
                            <select
                                name='card-exp-month'
                                id='card-exp-month-form'
                                onChange={this.props.onCardChange}
                                onFocus={this.props.changeFocus}
                            >
                                <option value='MM'>Month</option>
                                {this.addMonths()}
                            </select>
                            <select
                                name='card-exp-year'
                                id='card-exp-year-form'
                                onChange={this.props.onCardChange}
                                onFocus={this.props.changeFocus}
                            >
                                <option value='YY'>Year</option>
                                {this.addYears()}
                            </select>
                        </div>
                        <div id='cvv'>
                            <p>CVV</p>
                            <input
                                name='card-cvv'
                                id='card-cvv-form'
                                maxLength={this.props.formDetails.provider === 'amex' ? '4' : '3'}
                                type='text'
                                onChange={this.props.onCardChange}
                                onFocus={this.props.changeFocus}
                            />
                        </div>
                    </div>
                    { this.props.formDetails.status && <p id='status'>{this.props.formDetails.status}</p>}
                    <input type='submit' />
                </form>
            </div >
        )
    }
}
