import jsep from 'jsep';
import { simplify } from 'mathjs';
import '../Calculator.css';
import React from 'react';
import Buttons from './Buttons';
import OutputWindow from './OutputWindow';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            outNum: '0',
            numClicked: 0,
            symClicked: '',
            expr: '',
            opClicked: false,
            clearCount: 0
        };
    }

    getNumClicked = (num) => {
        let newExpr = '';
        // If the user enters in 0 but 0 is already displayed.
        if(num === '0' && this.state.outNum === '0'){
            return;
        }
    
        // If the user enters in a non-zero number and zero is displayed.
        if(num !== '0' && this.state.outNum === '0'){
            this.setState({outNum: num});
            newExpr = this.state.expr;
            // Expression is empty; no need for space.
            // if(newExpr === '')
            newExpr += `${num}`;
            console.log(newExpr);
            this.setState({expr: newExpr}, () => {
                console.log('Expression: ' + this.state.expr);
            });
            
            return;
        }

        
        newExpr = this.state.expr; 
        // User has entered in an operation symbol.
        if(newExpr[newExpr.length - 1] === '+' || newExpr[newExpr.length - 1] === '-'
            || newExpr[newExpr.length - 1] === '*' || newExpr[newExpr.length - 1] === '/'){
            this.setState({outNum: num});
            newExpr += ` ${num}`;
            this.setState({outNum: num});
            this.setState({expr: newExpr}, ()=> {
                console.log(`Expr: ${this.state.expr}`);
            });
            
            return;
        }

        newExpr += `${num}`;
        this.setState({outNum: this.state.outNum.concat(num)});
        this.setState({expr: newExpr}, () => {
            console.log('expr: ' + this.state.expr);
        });
        
    }

    getSymClicked = (sym) => {
        let newExpr = '';
        if(sym === 'C'){
            
            // Clear everything.
            this.setState( { expr: '' }, () => {
                console.log(`Expr after clear: ${this.state.expr}`);
            });
            this.setState( { outNum: '0' });
            return;

        } else if(sym === 'CE'){
            // Clear most recent entry.
            newExpr = this.state.expr.slice(0, -1);
            this.setState({ expr: newExpr });
            this.setState({ outNum: '0' });
            return;

        } else if(sym === '.'){
            newExpr = this.state.expr;
            newExpr += '.';
            this.setState( {expr: newExpr });
            let newOutNum = newExpr;
            this.setState( { outNum: newOutNum });

            return;

        } else if(sym === '='){

            let finalExpr = this.state.expr;
            console.log(`expr: ${finalExpr}`);
            const ans = simplify(finalExpr).toString();
            console.log(ans);
            this.setState({ outNum: ans });
            return;

        }

        console.log(sym);
        newExpr = this.state.expr;
        newExpr += ` ${sym}`;  
        this.setState({symClicked: sym});
        this.setState({expr: newExpr}, () => {
            console.log(`Expression: ${this.state.expr}`);
        });
        
    }

    render() {
        return (
            // Get number pressed from NumberButtons child and -
            // Pass it to the OutputWindow child.
            <div className='outer-calc wrapper'>
                <div className='ui container inner-calc'>
                    <OutputWindow pressed={this.state.outNum} />
                    <div className='buttons-div'>
                        <Buttons 
                         numFunc={this.getNumClicked}
                         symFunc={this.getSymClicked} 
                         />
                    </div>
                </div>
            </div>
            );
            
    }
}

export default Calculator;