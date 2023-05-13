import React, { useState, useEffect } from 'react'
import styles from '../styles/Auth.module.css'
import Image from 'next/image'
import logo from '../public/assets/logo2.png'
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import Link from 'next/link'
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';
import { CheckUserAuthIn } from '../controllers/checkAuth';
import { LoginUser } from '../controllers/login';

function Auth() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [see, setSee] = useState(false)

  useEffect(() => {
    CheckUserAuthIn(setLoading, router)
  }, [router])

  return (
    <div className={styles.container}>

      <div className={styles.logbox}>

        {loading ? (
          <center>
            <div className={styles.imagebox}>
              {/* <Image src={logo} className={styles.image} placeholder="blur" alt="logo" /> */}
              <span style={{fontSize:60,color:'white'}}> HASKE </span> 

              <div className={styles.loadicon}>
                <ReactLoading color={'#33cc66'} height={60} width={60} />
              </div>
            </div>
           
          </center>
        ) : (
          <>
            <center>
              <div className={styles.imagebox}>
                {/* <Image src={logo} className={styles.image} placeholder="blur" alt="logo" /> */}
               <span style={{fontSize:60,color:'white'}}> HASKE </span>  <span style={{color:'#33cc66',fontSize:60}}>.</span>
              </div>
            </center>

            <div className={styles.loginsection}>

              <div className={styles.secp}>
                <input style={{ height: 60 }} value={email} onChange={(e) => setEmail(e.target.value)} id={styles.email} className={styles.inp} type="email" placeholder='Email eg.(example@domain.com)' />
              </div>

              <div className={styles.secp}>
                <div className={styles.passbox}>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} id={styles.password} className={styles.inp} type={see ? "text" : "password"} placeholder='Password' />
                  {see ? (
                    <RiEyeOffFill onClick={() => setSee(false)} style={{ margin: 23, cursor: 'pointer' }} size={20} color="black" />
                  ) : (
                    <RiEyeFill onClick={() => setSee(true)} style={{ margin: 23, cursor: 'pointer' }} size={20} color="black" />
                  )}
                </div>
              </div>
            </div>

            <center>
              <button onClick={() => LoginUser(email, password, router, setLoading2)} className={styles.loginbutt}>
                {loading2 ? (
                  <center>
                    <ReactLoading color={'white'} height={30} width={30} />
                  </center>
                ) : "Login"}
              </button>
            </center>



            <div className={styles.foot}>
              By proceeding, you consent to get calls, WhatsApp or SMS messages,
              including by automated means, from HASKE and its affiliates to the details provided.
            </div>
          </>

        )}
      </div>

    </div>
  )
}

export default Auth