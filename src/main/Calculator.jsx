import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null, 
    current: 0,
    values: [0,0]
}

export default class Calculator extends React.Component {

    // Clonning the initial state
    state = { ...initialState }

    // Binding the methods to this class based component
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    // Erases everything comming back to initial state
    clearMemory(){
        this.setState({ ...initialState })
    }

    // Sets which operation to use and calculates the number
    setOperation(operation){

        const values = [ ...this.state.values ]

        if(this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            
            try{
                //values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                switch (operation) {
                    case '+':
                    values[0] = values[0] + values[1]
                        break;
                    case '-':
                    values[0] = values[0] - values[1]
                        break;
                    case '/':
                        if (values[1] === 0){
                            return values[0]
                        } else {
                            values[0] = values[0] / values[1]
                        }
                        break;
                    case '*':
                        if (values[1] === 0){
                            return values[0]
                        } else {
                            values[0] = values[0] * values[1]
                        }
                        break;
                    case '=':
                        switch(currentOperation){
                        case '+':
                        values[0] = values[0] + values[1]
                            break;
                        case '-':
                        values[0] = values[0] - values[1]
                            break;
                        case '/':
                            if (values[1] === 0){
                                return values[0]
                            } else {
                                values[0] = values[0] / values[1]
                            }
                        break;
                        case '*':
                        values[0] = values[0] * values[1]
                        break;
                        }        
                        break;
                    default:
                        break;
                }
            } catch(e) { 
                values[0] = this.state.values[0]
            }
                values[1] = 0

            this.setState({
                displayValue: values[0].toFixed(3).length < 17 ? values[0].toFixed(3) : values[0].toFixed(3).slice(0,16),
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

            console.log(values[1], operation)
        }
    }

    // Adds the numbers
    addDigit(n){
        
        // In case there is a dot, we can't put another one
        if( n === '.' && this.state.displayValue.includes('.')){
            return
        } 
        // Says if the display is Cleared when there is only a zero and when we tell it to
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue 
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay:false})

        if ( n !== '.' ){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [ ...this.state.values ]
            values[i] = newValue
            this.setState({ values })
            console.log(values,this.state.current)
        }
    }

    render(){
        return (
            <div className='calculator'> 
                <Display value={ this.state.displayValue }/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )}
}

