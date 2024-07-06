"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import "@/styles/loginSignUp.css";


const LoginComponent = () => {

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nickInput, setNickInput] = useState("");
  const [schoolInput,setSchoolInput]=useState('');

  const router = useRouter();
  //로그인 버튼
  const loginSubmit = async () => {
    console.log("loginSubmit 진입");
    console.log(emailInput);
    console.log(passwordInput);
    const result = await signIn("credentials", {
      username: emailInput,
      password: passwordInput,
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/todos/${emailInput}`
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
        password: passwordInput,
        school: schoolInput,
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
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                     setEmailInput(event.target.value);
                                   }} />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="비밀번호를 입력해주세요."
                                   id="logpass" autoComplete="off" value={passwordInput}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                     setPasswordInput(event.target.value);
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
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                     setNickInput(event.target.value);
                                   }}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group">
                            <select className="form-style" value={schoolInput}
                                    onChange={(event) => setSchoolInput(event.target.value)}>
                              <option value="" disabled>편입할 학교를 선택해주세요.</option>;
                              <option value="가천대학교">가천대학교</option>;
                              <option value="가톨릭대학교">가톨릭대학교</option>;
                              <option value="건국대학교">건국대학교</option>;
                              <option value="건국대학교(글로컬)">건국대학교(글로컬)</option>;
                              <option value="경기대학교">경기대학교</option>;
                              <option value="경북대학교">경북대학교</option>;
                              <option value="경희대학교">경희대학교</option>;
                              <option value="고려대학교">고려대학교</option>;
                              <option value="고려대학교(세종)">고려대학교(세종)</option>;
                              <option value="광운대학교">광운대학교</option>;
                              <option value="국민대학교">국민대학교</option>;
                              <option value="단국대학교">단국대학교</option>;
                              <option value="단국대학교(천안)">단국대학교(천안)</option>;
                              <option value="덕성여자대학교">덕성여자대학교</option>;
                              <option value="동국대학교">동국대학교</option>;
                              <option value="동국대학교(경주)">동국대학교(경주)</option>;
                              <option value="동덕여자대학교">동덕여자대학교</option>;
                              <option value="명지대학교">명지대학교</option>;
                              <option value="부산대학교">부산대학교</option>;
                              <option value="삼육대학교">삼육대학교</option>;
                              <option value="상명대학교">상명대학교</option>;
                              <option value="상명대학교(천안)">상명대학교(천안)</option>;
                              <option value="서강대학교">서강대학교</option>;
                              <option value="서경대학교">서경대학교</option>;
                              <option value="서울과학기술대학교">서울과학기술대학교</option>;
                              <option value="서울대학교">서울대학교</option>;
                              <option value="서울시립대학교">서울시립대학교</option>;
                              <option value="서울여자대학교">서울여자대학교</option>;
                              <option value="성균관대학교">성균관대학교</option>;
                              <option value="성신여자대학교">성신여자대학교</option>;
                              <option value="세종대학교">세종대학교</option>;
                              <option value="수원대학교">수원대학교</option>;
                              <option value="숙명여자대학교">숙명여자대학교</option>;
                              <option value="숭실대학교">숭실대학교</option>;
                              <option value="아주대학교">아주대학교</option>;
                              <option value="연세대학교">연세대학교</option>;
                              <option value="연세대학교(원주)">연세대학교(원주)</option>;
                              <option value="영남대학교">영남대학교</option>;
                              <option value="용인대학교">용인대학교</option>;
                              <option value="이화여자대학교">이화여자대학교</option>;
                              <option value="인천대학교">인천대학교</option>;
                              <option value="인하대학교">인하대학교</option>;
                              <option value="전남대학교">전남대학교</option>;
                              <option value="전북대학교">전북대학교</option>;
                              <option value="제주대학교">제주대학교</option>;
                              <option value="중앙대학교">중앙대학교</option>;
                              <option value="충남대학교">충남대학교</option>;
                              <option value="충북대학교">충북대학교</option>;
                              <option value="한국외국어대학교">한국외국어대학교</option>;
                              <option value="한성대학교">한성대학교</option>;
                              <option value="한양대학교">한양대학교</option>;
                              <option value="한양대학교(에리카)">한양대학교(에리카)</option>;
                              <option value="항공대학교">항공대학교</option>;
                              <option value="홍익대학교">홍익대학교</option>;
                            </select>
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="email" name="logemail" className="form-style" placeholder="이메일을 입력해주세요."
                                   id="logemail" autoComplete="off" value={emailInput}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                     setEmailInput(event.target.value);
                                   }}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="비밀번호를 입력해주세요."
                                   id="logpass" autoComplete="off" value={passwordInput}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
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

export default LoginComponent;