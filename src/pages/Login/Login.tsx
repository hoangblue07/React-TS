import { useFormik } from 'formik'
import React from 'react'
import *as yup from 'yup';
import { loginAsyncApi, loginFacebookApi } from '../../redux/UserReducer/userReducer';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import FacebookLogin from 'react-facebook-login'

type Props = {}



export type UserLoginModel = {
  email: string,
  password: string
}


export default function Login({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const frmLogin = useFormik<UserLoginModel>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email cannot be blank!').email('email is valid'),
      password: yup.string().min(3, 'password must be at least 3 characters'),
    }),
    onSubmit: (value: UserLoginModel) => {
      const actionAsyncLogin = loginAsyncApi(value);
      dispatch(actionAsyncLogin);
    }
  })

  const responseFacebook = (res: any) => {
    console.log(res);
    if (res?.accessToken) {
      const actionThunk = loginFacebookApi(res.accessToken);
      dispatch(actionThunk);
    }
  }
  return (
    <form className='container' onSubmit={frmLogin.handleSubmit}>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='w-50 m-5'>
          <h3 className=''>Login</h3>
          <div className='form-group'>
            <p>Email</p>
            <input className='form-control' name='email' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
            {frmLogin.errors.email ? <div className='text text-danger'>{frmLogin.errors.email}</div> : ''}
          </div>
          <div className='form-group'>
            <p>Password</p>
            <input type='password' className='form-control' name='password' onChange={frmLogin.handleChange} onBlur={frmLogin.handleBlur} />
            {frmLogin.errors.password ? <div className='text text-danger'>{frmLogin.errors.password}</div> : ''}

          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-success my-5'>Login</button>
          </div>
          <div className='form-group mt-2'>
          <FacebookLogin
              appId="959617255723554"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="btn btn-primary"
              icon="fa-facebook"
            />
          </div>
        </div>
      </div>
    </form>
  )
}