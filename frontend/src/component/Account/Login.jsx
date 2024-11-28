import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
const SubmitButton = styled.input`
  width: 40%;
  height: 40px;
  margin-top: 20px;
  border-radius: 7px;
  outline: none;
  border: none;
  background-color: #12263F;
  color: white;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: black;
  }
`;

const Login = ({onSetForgotPassword, CloseIconn}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [okMessage, setOkMessage]= useState('')
  const [formData, setFormData] = useState({
    user__name: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const Signup = () => {
        navigate('/signup')
  }
  
  // const handleSubmit = async (e) => {
  //    e.preventDefault();

  //   try {
  //     const response = await fetch('/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData)
  //     });
      
  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.success) {
  //         setOkMessage(`Đăng nhập thành công: ${data.message}`)
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 1500);
          
  //       } else {
  //         const error__alert =`Đăng nhập thất bại: ${data.message}`;
  //         console.log(error__alert);
  //         setErrorMessage(`Đăng nhập thất bại: ${data.message}`)
  //       }
  //     } else {
  //       // Xử lý lỗi
  //       console.error('Lỗi khi đăng nhập:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Lỗi mạng:', error);
  //   }
  // };
  // useEffect(() => {
  //   if (errorMessage) {
  //     const timer = setTimeout(() => {
  //       setErrorMessage('');
  //     }, 2000); // 2 giây

  //     return () => clearTimeout(timer);
  //   }
  // }, [errorMessage]);
  // useEffect(() => {
  //   if (okMessage) {
  //     const timerr = setTimeout(() => {
  //       setOkMessage('');
  //     }, 2000); 

  //     return () => clearTimeout(timerr);
  //   }
  // }, [okMessage]);

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: "10",
        width: "30vw",
        height: "40vh",
        backgroundColor: "#fff",
        transition: 'linear',
        paddingTop:'30px', 
        borderRadius: '10px'
      }}
      autoComplete="off"
    >
        <CloseIcon style={{position: 'absolute', top: '12px', right: '15px', cursor: 'pointer'}} onClick={CloseIconn}/>
       {errorMessage && (
          <Alert variant='filled' severity="error" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0'}}>
            {errorMessage}
          </Alert>
        )}

      {okMessage && (
          <Alert variant='filled' severity="success" style={{transition: '-moz-initial', width: '100%', position: 'absolute', zIndex:'20', top: '0', left:'0'}}>
            {okMessage}
          </Alert>
        )}
      <form > 
      {/* onSubmit={handleSubmit} */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
    <label className="user__name__label" style={{ color: '#000', marginLeft: '10%'}}>Tài khoản</label>
    <input
      onChange={handleChange}
      className="user__name"
      name="user__name"
      type="text"
      required
      style={{
        outline: 'none',
        borderRadius: '5px',
        border: '1px solid #b8b2b2',
        height: '35px',
        width: '100%',
        fontSize: '17px',
        paddingLeft: '5px',
        marginTop: '10px',
        width: '80%',
        marginLeft: '10%'
      }}
    />
    <br/>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '80%', marginLeft: '10%' }}>
      <label className="password__label" style={{ color: '#000' }}>Mật khẩu</label>
      <div onClick={onSetForgotPassword} style={{ fontSize: '13px', color: 'grey', cursor: 'pointer', fontWeight: '500' }}>Quên mật khẩu?</div>
    </div>
    
    <input
      onChange={handleChange}
      className="password"
      name="password"
      type="password"
      required
      style={{
        outline: 'none',
        borderRadius: '5px',
        border: '1px solid #b8b2b2',
        height: '35px',
        width: '100%',
        fontSize: '17px',
        paddingLeft: '5px',
        marginTop: '10px',
        width: '80%',
        marginLeft: '10%'
      }}
    />
    
    <SubmitButton style={{marginLeft: '30%'}} type="submit" value="Đăng nhập" />
  </div>
</form>
      <div style={{display: 'flex', fontSize:'13px', width: '100%', justifyContent: 'center'}}>
        <p style={{color:'grey'}}>Chưa có tài khoản?</p>
        <p style={{color:'#207ee3', cursor:'pointer', marginLeft:'3px' }} onClick={Signup} >Đăng kí ngay!</p>
      </div>
    </Box>
  );
};

export default Login;
