import {Appbar} from "./SignInComponents/Appbar"
import {Balance} from "./SignInComponents/Balance"
import {Users} from "./SignInComponents/Users"

export const Dashboard = () =>{
    return (<div>
        <Appbar />
        <div className="m-8">
            <Balance />
            <Users />
        </div>
    </div>);
}