import React, {useState} from 'react';
import {UilAt, UilLockAlt, UilUser} from '@iconscout/react-unicons';
import '../styles/loginSignUp.css';

const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // 올바른 헤더 형식
                },
                body: JSON.stringify({email, password})
            })
            if (response.ok) {
                const data = await response.json(); // 서버로부터의 응답 데이터를 JSON 형식으로 파싱
                // 여기에서 적절한 응답 처리를 수행할 수 있습니다.
            } else {
                // 에러 처리
                console.error('Server Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3">
                                <span>Log In</span>
                                <span>Sign Up</span>
                            </h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        name="logemail"
                                                        className="form-style"
                                                        placeholder="Your Email"
                                                        id="logemail"
                                                        autoComplete="off"
                                                        value={email}
                                                        onChange={(e)=>setEmail(e.target.value)}
                                                    />
                                                    <UilAt className="input-icon"/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="password"
                                                        name="logpass"
                                                        className="form-style"
                                                        placeholder="Your Password"
                                                        id="logpass"
                                                        autoComplete="off"
                                                        value={password}
                                                        onChange={(e)=>setPassword(e.target.value)}
                                                    />
                                                    <UilLockAlt className="input-icon"/>
                                                </div>
                                                <a onClick={handleSubmit} className="btn mt-4">submit</a>
                                                <p className="mb-0 mt-4 text-center">
                                                    <a href="#0" className="link">Forgot your password?</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="logname"
                                                        className="form-style"
                                                        placeholder="Your Full Name"
                                                        id="logname"
                                                        autoComplete="off"
                                                    />
                                                    <UilUser className="input-icon"/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="email"
                                                        name="logemail"
                                                        className="form-style"
                                                        placeholder="Your Email"
                                                        id="logemail"
                                                        autoComplete="off"
                                                    />
                                                    <UilAt className="input-icon"/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="password"
                                                        name="logpass"
                                                        className="form-style"
                                                        placeholder="Your Password"
                                                        id="logpass"
                                                        autoComplete="off"
                                                    />
                                                    <UilLockAlt className="input-icon"/>
                                                </div>
                                                <a href="#" className="btn mt-4">submit</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
