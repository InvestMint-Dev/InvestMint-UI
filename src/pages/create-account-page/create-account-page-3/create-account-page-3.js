import './create-account-page-3.css';

export const CreateAccountPage3 = () => {
    return (
        <div className='page-3-container'>
            <h1 className='form-heading'>Company Legal Information</h1>
            <div className='company-legal-information-form'>
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-half' placeholder='First Name'></textarea>
                    <textarea className='form-textarea form-textarea-half' placeholder='Last Name'></textarea>
                </div>

                <textarea className='form-textarea form-textarea-full' placeholder='Email'></textarea>

                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-half' placeholder='Phone Number'></textarea>
                    <textarea className='form-textarea form-textarea-half' placeholder='Mobile Number'></textarea>
                </div>

                <br/>

                <textarea className='form-textarea form-textarea-full' placeholder='Company Name'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Country'></textarea>
                <textarea className='form-textarea form-textarea-full' placeholder='Company Address Line 1'></textarea>
                
                <div className='form-flex-container'>
                    <textarea className='form-textarea form-textarea-third' placeholder='State'></textarea>
                    <textarea className='form-textarea form-textarea-third' placeholder='City'></textarea>
                    <textarea className='form-textarea form-textarea-third' placeholder='Zipcode'></textarea>
                </div>

                <textarea className='form-textarea form-textarea-full' placeholder='Company Phone Number'></textarea>
            </div>
        </div>
    );
}