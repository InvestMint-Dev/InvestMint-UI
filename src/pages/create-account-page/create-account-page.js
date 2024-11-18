import { CreateAccountPage1 } from "./create-account-page-1/create-account-page-1";
import { CreateAccountPage2 } from "./create-account-page-2/create-account-page-2";
import { CreateAccountPage3 } from "./create-account-page-3/create-account-page-3";
import { CreateAccountPage4 } from "./create-account-page-4/create-account-page-4";

export const CreateAccountPage = () => {
    return (
        <div>
            <CreateAccountPage1 />
            <CreateAccountPage2 />  
            <CreateAccountPage3 />
            <CreateAccountPage4 />          
        </div>
    );
}