import './cash-calculator.css';

export const CashCalculator = () => {
    return(
        <div>
            <h1>Annual Average Cash Calculator</h1>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className="section-title-cell">Month 1</th>
                        <th className="section-title-cell">Month 2</th>
                        <th className="section-title-cell">Month 3</th>
                        <th className="section-title-cell">Month 4</th>
                        <th className="section-title-cell">Month 5</th>
                        <th className="section-title-cell">Month 6</th>
                        <th className="section-title-cell">Month 7</th>
                        <th className="section-title-cell">Month 8</th>
                        <th className="section-title-cell">Month 9</th>
                        <th className="section-title-cell">Month 10</th>
                        <th className="section-title-cell">Month 11</th>
                        <th className="section-title-cell">Month 12</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sources of Cash */}
                    <tr >
                        <td className="section-divider" colspan="13">Sources of Cash</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Revenue</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Accounts Receivable</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Loans</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Equity</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Other</td>
                    </tr>

                    {/* Uses of Cash */}
                    <tr>
                    <td className="section-divider" colspan="13">Uses of Cash</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Real Estate</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Loan/Lease Bills</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Utilities</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Insurance</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Taxes</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Payroll</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">SG & A</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Inventory</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Equipment</td>
                    </tr>
                    <tr>
                        <td className="section-title-cell">Other</td>
                    </tr>
                    
                    {/* Monthly Total */}
                    <tr>
                        <td>Monthly Total</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}