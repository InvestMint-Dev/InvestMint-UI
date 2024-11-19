import React, { useState, useEffect } from 'react';

export const CashCalculator = () => {
    // State for all input values
    const [inputValues, setInputValues] = useState({});
    const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0));
    const [annualAverage, setAnnualAverage] = useState(0);

    // List of all row categories
    const sourcesOfCash = ['Revenue', 'Accounts Receivable', 'Loans', 'Equity', 'Other'];
    const usesOfCash = ['Real Estate', 'Loan/Lease Bills', 'Utilities', 'Insurance', 'Taxes', 
                        'Payroll', 'SG & A', 'Inventory', 'Equipment', 'Other'];

    // Handle input change
    const handleInputChange = (category, month, value) => {
        const numValue = value === '' ? 0 : parseFloat(value) || 0;
        setInputValues(prev => ({
            ...prev,
            [`${category}-${month}`]: numValue
        }));
    };

    // Calculate monthly totals whenever inputs change
    useEffect(() => {
        const newMonthlyTotals = Array(12).fill(0).map((_, monthIndex) => {
            let monthTotal = 0;
            
            // Add sources of cash
            sourcesOfCash.forEach(category => {
                monthTotal += inputValues[`${category}-${monthIndex}`] || 0;
            });
            
            // Subtract uses of cash
            usesOfCash.forEach(category => {
                monthTotal -= inputValues[`${category}-${monthIndex}`] || 0;
            });
            
            return monthTotal;
        });
        
        setMonthlyTotals(newMonthlyTotals);
        
        // Calculate annual average
        const total = newMonthlyTotals.reduce((acc, curr) => acc + curr, 0);
        setAnnualAverage(total / 12);
    }, [inputValues]);

    return (
        <div>
            <div className="flex justify-center items-center mt-8">
                <h2 className="calculator-heading">Annual Average Cash Calculator</h2>
                <textarea 
                    readOnly
                    className="final-output-textarea ml-4"
                    value={`$ ${annualAverage.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`}
                    rows="4"
                    cols="30"
                />
            </div>

            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th></th>
                        {[...Array(12)].map((_, i) => (
                            <th key={i} className="title-cell">Month {i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Sources of Cash */}
                    <tr>
                        <td className="section-divider" colSpan="13">Sources of Cash</td>
                    </tr>
                    {sourcesOfCash.map(category => (
                        <tr key={category}>
                            <td className="title-cell">{category}</td>
                            {[...Array(12)].map((_, i) => (
                                <td key={i}>
                                    <input
                                        type="text"
                                        className="input-cell"
                                        value={inputValues[`${category}-${i}`] || ''}
                                        onChange={(e) => handleInputChange(category, i, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (!/[\d\.\-]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}

                    {/* Uses of Cash */}
                    <tr>
                        <td className="section-divider" colSpan="13">Uses of Cash</td>
                    </tr>
                    {usesOfCash.map(category => (
                        <tr key={category}>
                            <td className="title-cell">{category}</td>
                            {[...Array(12)].map((_, i) => (
                                <td key={i}>
                                    <input
                                        type="text"
                                        className="input-cell"
                                        value={inputValues[`${category}-${i}`] || ''} 
                                        onChange={(e) => handleInputChange(category, i, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (!/[\d\.\-]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    
                    {/* Monthly Total */}
                    <tr>
                        <td className="section-divider text-center">Monthly Total</td>
                        {monthlyTotals.map((total, i) => (
                            <td key={i}>
                                <input
                                    type="text"
                                    className="output-cell"
                                    value={total.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                    readOnly
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
