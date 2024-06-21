"use client";

import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";


const LoginSignUp = () => {

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nickInput, setNickInput] = useState("");

  const router = useRouter();
  //로그인 버튼
  const loginSubmit = async () => {
    const result = await signIn("credentials", {
      username: emailInput,
      password: passwordInput,
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/todos`
    });
  };

  //회원가입 버튼
  const signUpSubmit = async () => {
    if(emailInput === "" || passwordInput === "" || nickInput === ""){
      toast.error("다시 한번 확인해주세요.", {
        position: "bottom-center"
      });
      return;
    }
    const newUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
      method: "POST",
      body: JSON.stringify({
        nick: nickInput,
        email: emailInput,
        password: passwordInput
      }),
      cache: "no-store"
    });
    if (newUser) {
      toast.success("회원가입에 성공하였습니다.", {
        position: "bottom-center"
      });
    }else{
      toast.error("회원가입에 실패하였습니다.", {
        position: "bottom-center"
      });
    }
    setNickInput("");
    setEmailInput("");
    setPasswordInput("");
  };
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span>로그인 </span><span>회원가입</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          {/*<h4 className="mb-4 pb-3">로그인</h4>*/}
                          <div className="form-group">
                            <input type="email" name="logemail" className="form-style" placeholder="이메일을 입력해주세요."
                                   id="logemail" value={emailInput} autoComplete="off"
                                   onInput={(event) => {
                                     setEmailInput(event.target.value);
                                     console.log(emailInput);
                                   }} />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="비밀번호를 입력해주세요."
                                   id="logpass" autoComplete="off" value={passwordInput}
                                   onInput={(event) => {
                                     setPasswordInput(event.target.value);
                                     console.log(passwordInput);
                                   }} />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button className="btn mt-4" onClick={() => loginSubmit()}>로그인</button>
                          <p className="mb-0 mt-4 text-center"><a href="#0" className="link">비밀번호 찾기</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          {/*<h4 className="mb-4 pb-3">회원가입</h4>*/}
                          <div className="form-group">
                            <input type="text" name="logname" className="form-style" placeholder="닉네임을 입력해주세요."
                                   id="logname" autoComplete="off" value={nickInput}
                                   onInput={(event) => {
                                     setNickInput(event.target.value);
                                   }}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="email" name="logemail" className="form-style" placeholder="이메일을 입력해주세요."
                                   id="logemail" autoComplete="off" value={emailInput}
                                   onInput={(event) => {
                                     setEmailInput(event.target.value);
                                   }}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="비밀번호를 입력해주세요."
                                   id="logpass" autoComplete="off" value={passwordInput}
                                   onInput={(event) => {
                                     setPasswordInput(event.target.value);
                                   }}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button className="btn mt-4" onClick={() => signUpSubmit()}>회원 등록</button>
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
      <div><Toaster
        position="bottom-center"
        reverseOrder={false}
      /></div>
    </>
  );
};

export default LoginSignUp;