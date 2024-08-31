import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';

const TeacherResetPwd = () => {
    const location = useLocation();
    const id = location.state;
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log("Received id in DynamicComponent:", id);
    }, [id]);

    const [values, setValues] = useState({
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.put("http://localhost:5000/api/teacher/resetpassword", {
                id,
                ...values
            });

            if (response.data.status === "Success") {
                console.log(response);
                setMessage(response.data.message);
                setValues({
                    oldpassword: '',
                    newpassword: '',
                    renewpassword: ''
                });
            } else {
                setError(response.data.Error);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while resetting the password. Please try again.');
        }
    };

    return (
        <div className="dashboard">
            <TeacherSidebar id={id} />
            <section className='bside pr2-bg'>
                <div className="WelcomeCard">
                    <div><h1>Change Password</h1></div>
                    <div><img src={`${process.env.PUBLIC_URL}/images/Designergirl.png`} alt="Home Icon" /></div>
                </div>
                <div className="formChangePwd">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='oldpassword'>Old Password</label>
                            <input
                                type="password"
                                name="oldpassword"
                                value={values.oldpassword}
                                onChange={e => setValues({ ...values, oldpassword: e.target.value })}
                            />
                        </div><br />
                        <div>
                            <label htmlFor='newpassword'>New Password</label>
                            <input
                                type="password"
                                name="newpassword"
                                value={values.newpassword}
                                onChange={e => setValues({ ...values, newpassword: e.target.value })}
                            />
                        </div><br />
                        <div>
                            <label htmlFor='renewpassword'>Re-new Password</label>
                            <input
                                type="password"
                                name="renewpassword"
                                value={values.renewpassword}
                                onChange={e => setValues({ ...values, renewpassword: e.target.value })}
                            />
                        </div>
                        <br />
                        {message && (<span style={{ color: 'green' }}>{message}</span>)}
                        {error && (<span style={{ color: 'red' }}>{error}</span>)}
                        <br /><input type="submit" value="Submit" />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default TeacherResetPwd;
