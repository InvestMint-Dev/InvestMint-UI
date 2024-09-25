import './cash-calculator.css';
import { handleKeyDown } from '../../../../utils/utils';

export const CashCalculator = () => {
    return(
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2.125rem' }}>
                <h1 className="calculator-heading">Annual Average Cash Calculator</h1>
                <textarea onKeyDown={handleKeyDown}  id="form-textarea" className="final-output-textarea" value="$" rows="4" cols="30"></textarea>
            </div>
            

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className="title-cell">Month 1</th>
                        <th className="title-cell">Month 2</th>
                        <th className="title-cell">Month 3</th>
                        <th className="title-cell">Month 4</th>
                        <th className="title-cell">Month 5</th>
                        <th className="title-cell">Month 6</th>
                        <th className="title-cell">Month 7</th>
                        <th className="title-cell">Month 8</th>
                        <th className="title-cell">Month 9</th>
                        <th className="title-cell">Month 10</th>
                        <th className="title-cell">Month 11</th>
                        <th className="title-cell">Month 12</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sources of Cash */}
                    <tr >
                        <td className="section-divider" colspan="13">Sources of Cash</td>
                    </tr>
                    <tr>
                        <td className="title-cell">Revenue</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Accounts Receivable</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Loans</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Equity</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Other</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>

                    {/* Uses of Cash */}
                    <tr>
                        <td className="section-divider" colspan="13">Uses of Cash</td>
                    </tr>
                    <tr>
                        <td className="title-cell">Real Estate</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Loan/Lease Bills</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Utilities</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Insurance</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Taxes</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Payroll</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">SG & A</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Inventory</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Equipment</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    <tr>
                        <td className="title-cell">Other</td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                        <td><input type="text" className="input-cell"></input></td>
                    </tr>
                    
                    {/* Monthly Total */}
                    <tr>
                        <td className='section-divider' style={{textAlign: 'center'}}>Monthly Total</td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                        <td><input type="text" className="output-cell"></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}