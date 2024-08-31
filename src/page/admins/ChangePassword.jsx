import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import "../../scssAndcss/changepassword.scss"
import { useLocation } from 'react-router-dom';
// import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';

const ChangePassword = () => {

    const location = useLocation();
    const id = location.state;
    console.log('Location State ID:', id);

    const [values, setValues] = useState({
        oldpassword: '',
        newpassword: '',
        renewpassword: ''

    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/admins/resetpassword", {
                id,
                ...values
            });
            if (response.data.status === "Success") {

                console.log(response);
                alert(response.data.message)
                setValues(null)
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="dashboard">
                <AdminSidebar id={id} />

                <section className='bside pr2-bg'>
                    <div className="WelcomeCard">
                        <div><h1>Change Password</h1></div>
                        <div><img src={`${process.env.PUBLIC_URL}/images/Designergirl.png`} alt="Home Icon" /></div>
                    </div>

                    <div className="formChangePwd">
                        <form onSubmit={handleSubmit} >
                            <div>
                                <label htmlFor='oldpassword'>Old Password</label>
                                <input
                                    type="text"
                                    name="oldpassword"
                                    onChange={e => setValues({ ...values, oldpassword: e.target.value })}
                                />
                            </div><br />
                            <div>
                                <label htmlFor='newpassword'>New Password</label>
                                <input
                                    type="text"
                                    name="newpassword"
                                    onChange={e => setValues({ ...values, newpassword: e.target.value })}
                                />
                            </div><br />
                            <div>
                                <label htmlFor='renewpassword'>Re-new Password :</label>
                                <input
                                    type="text"
                                    name="renewpassword"
                                    onChange={e => setValues({ ...values, renewpassword: e.target.value })}
                                />
                            </div>
                            <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>

                </section>
            </div>

        </>
    )
}

export default ChangePassword