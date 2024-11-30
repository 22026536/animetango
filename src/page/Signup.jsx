import React from 'react'
import Box from '@mui/system/Box'
import Link from "@mui/material/Link";
import  Typography  from '@mui/material/Typography';
import '../component/Account/Signup.css'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    user__name: '',
    gmail: '',
    phone__number: '',
    birthday: '',
    sex: '',
    password: '',
    rePassword: '',
    level: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
const [okMessage, setOkMessage]= useState('')
  // Hàm cập nhật dữ liệu trong form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Thông tin form:', formData)
    
    if (formData.password !== formData.rePassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    try {
      const response = await fetch('https://animetangobackend.onrender.com/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Xử lý thành công
        const data = await response.json();

        // Kiểm tra success
        if (data.success) {
          console.log('Đăng ký thành công:', data.message);
          setOkMessage(`Đăng ký thành công: ${data.message}`)
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          const error__alert =`Đăng ký thất bại:, ${data.message}`;
          console.log(error__alert);
          setErrorMessage(`Đăng ký thất bại: ${data.message}`)
          // <Alert severity="error" style={{top:'0', left: '0', zIndex: '20', width:'25vh', height:'30px'}}>{error__alert}</Alert>
        }
      } else {
        setErrorMessage(`Đăng ký thất bại: ${response.statusText}`)
        console.error('Lỗi khi đăng ký:', response.statusText);
      }
    } catch (error) {
      setErrorMessage(`Lỗi mạng: ${error}`)
    }
  };


  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000); // 2 giây

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  useEffect(() => {
    if (okMessage) {
      const timerr = setTimeout(() => {
        setOkMessage('');
      }, 2000); // 2 giây

      return () => clearTimeout(timerr);
    }
  }, [okMessage]);
  return (
    <>
    <Box sx= {{top: '0', left: '0', width: '100vw', backgroundColor: '#FAFAFA', height: '12vh', display: 'flex', alignItems: 'center', gap: '16px'}}>
    <Link
        className="web__name"
        style={{ cursor: "pointer", textDecoration: "none", marginLeft: '45px' }}
        href="/home"
      >
        <img className="logo" src="/logo.png"></img>
        <Typography
          style={{
            fontSize: "30px",
            fontWeight: "800",
            background: "linear-gradient(90deg, #02c2f7, #400af2)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            width: "180px",
            cursor: "pointer",
            marginLeft: '10px'
          }}
          className="logo__text"
        >
          Animetango
        </Typography>
      </Link>
      <p style={{fontSize: '30px', color: '#fa7a66', fontWeight: '800'}}>Đăng ký</p>
    </Box>
    <Box sx={{position: 'relative', width: '100vw', height: '88vh'}}>
        <img src='/backgroundsignup.jpg' style={{width: '100vw', height: '88vh', objectFit: 'cover'}}></img>
        <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(220, 224, 221, 0.5)', // Chọn màu và độ mờ bằng `rgba`
      zIndex: 1,
    }}
  />
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
   <Box sx={{position: 'absolute', zIndex: '2', top: '0'}} className='form'>
   <Typography sx={{fontWeight:"800", color: "#0209d6" , fontSize: '30px',textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)", textAlign: 'center',marginTop: '75px'}}>Đăng ký tài khoản</Typography>
   <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', width: '100vw', justifyContent: 'center', gap: '10vw', marginTop: '20px'}}>
         <div>
            <label>Họ và tên</label>
            <br></br>
            <input className="name"  name="name" placeholder='Họ và tên' type='text' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>
         <div>
            <label>Tên đăng nhập</label>
            <br></br>
            <input className="user__name"  name="user__name" placeholder='Tên đăng nhập' type='text' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>

        </div>
        <div  style={{display: 'flex', width: '100vw', justifyContent: 'center', gap: '10vw',marginTop: '30px'}}>
         <div>
            <label>Số điện thoại</label>
            <br></br>
            <input name="phone__number" className="phone__number" placeholder='Số điện thoại' type='text' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>
         <div>
            <label>Email</label>
            <br></br>
            <input className="gmail"  name="gmail" placeholder='Email' type='text' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>
          </div>
         <div style={{display: 'flex', width: '100vw', justifyContent: 'center', gap: '10vw',marginTop: '30px'}}>
         <div>
            <label>Ngày sinh</label>
            <br></br>
            <input placeholder='Ngày sinh' type='date' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>
         <div style={{width: '24vw'}}>
            <label>Giới tính</label>
            <br></br>
          <select className="gender" name="gender" style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option value="" selected hidden></option>
          <option value="1">Nam</option>
          <option value="2">Nữ</option>
          </select>
         </div>

        </div>

        <div style={{display: 'flex', width: '100vw', justifyContent: 'center', gap: '10vw',marginTop: '30px'}}>
         <div>
            <label>Mật khẩu</label>
            <br></br>
            <input placeholder='Mật khẩu' type='password' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>
         <div>
            <label>Nhập lại mật khẩu</label>
            <br></br>
            <input placeholder='Nhập lại mật khẩu' type='password' style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '24vw', fontSize: '17px', paddingLeft: '7px'}}></input>
         </div>

        </div>
        <div style={{display: 'flex', width: '100vw', justifyContent: 'center', gap: '10vw',marginTop: '30px', alignItems: 'end' }}>
         <div style={{width: '24vw'}}>
            <label>Trình độ hiện tại</label>
            <br></br>
            <select className="level" name="level" style={{outline: 'none', borderRadius: '7px', border: '1px solid #e6e4e3', height: '35px', width: '10vw', fontSize: '17px', paddingLeft: '7px'}}>
          <option value="" selected hidden></option>
          <option value="N1">N1</option>
          <option value="N2">N2</option>
          <option value="N3">N3</option>
          <option value="N4">N4</option>
          <option value="N5">N5</option>
          </select>
         </div>
         <div style={{width: '24vw', display: 'flex', justifyContent: 'start'}}>
           <Button sx={{width: '10vw', color: 'white', backgroundColor: 'black', marginLeft: '5px', borderRadius: '10px', border: '2px solid #000'}} className='button' type="submit">Đăng ký</Button>
         </div>

        </div>
        </form>
   </Box>
    </Box>
    
    
    
    
    
    </>
  )
}