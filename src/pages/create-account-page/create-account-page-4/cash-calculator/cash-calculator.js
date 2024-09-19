import './cash-calculator.css';

export const CashCalculator = () => {
    return(
        <div>
            <h1>Annual Average Cash Calculator</h1>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Header 2</th>
                        <th>Header 3</th>
                        <th>Header 4</th>
                        <th>Header 5</th>
                        <th>Header 6</th>
                        <th>Header 7</th>
                        <th>Header 8</th>
                        <th>Header 9</th>
                        <th>Header 10</th>
                        <th>Header 11</th>
                        <th>Header 12</th>
                        <th>Header 13</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sources of Cash */}
                    <tr>
                        Sources of Cash
                    </tr>
                    <tr>
                        <td>Revenue</td>
                    </tr>
                    <tr>
                        <td>Accounts Receivable</td>
                    </tr>
                    <tr>
                        <td>Loans</td>
                    </tr>
                    <tr>
                        <td>Equity</td>
                    </tr>
                    <tr>
                        <td>Other</td>
                    </tr>

                    {/* Uses of Cash */}
                    <tr>
                        Uses of Cash
                    </tr>
                    <tr>
                        <td>Real Estate</td>
                    </tr>
                    <tr>
                        <td>Loan/Lease Bills</td>
                    </tr>
                    <tr>
                        <td>Utilities</td>
                    </tr>
                    <tr>
                        <td>Insurance</td>
                    </tr>
                    <tr>
                        <td>Taxes</td>
                    </tr>
                    <tr>
                        <td>Payroll</td>
                    </tr>
                    <tr>
                        <td>SG & A</td>
                    </tr>
                    <tr>
                        <td>Inventory</td>
                    </tr>
                    <tr>
                        <td>Equipment</td>
                    </tr>
                    <tr>
                        <td>Other</td>
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