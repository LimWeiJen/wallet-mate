'use client'

import React, { useRef, useState } from 'react'

const page = () => {
	const [signingIn, setSigningIn] = useState(true);
	const signInUsername = useRef<any>(null);
	const signInPassword = useRef<any>(null);
	const signUpUsername = useRef<any>(null);
	const signUpName = useRef<any>(null);
	const signUpPassword = useRef<any>(null);
	const [error, setError] = useState('');

	const signIn = async () => {
    		// Check if all required fields are filled
		if (!signInUsername.current!.value || !signInPassword.current!.value) {
			setError('missing required fields');
			return;
		}

		const res = await fetch('http://localhost:3001/users/sign-in', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: signInUsername.current!.value,
				password: signInPassword.current!.value
			})
		})

		if (res.ok) {
			const token = (await res.json())['token'];
			window.localStorage.setItem('token', `Bearer ${token}`);
			window.location.href = '/main/home'
		} else {
			setError('incorrect username or password');
		}
	}

	const signUp = async () => {
    		// Check if all required fields are filled
		if (!signUpUsername.current!.value || !signUpPassword.current!.value || !signUpName.current!.value) {
			setError('missing required fields');
			return;
		}

		const res = await fetch('http://localhost:3001/users/sign-up', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: signUpUsername.current!.value,
				password: signUpPassword.current!.value,
				name: signUpName.current!.value
			})
		})

		if (res.ok) {
			const token = (await res.json())['token'];
			window.localStorage.setItem('token', `Bearer ${token}`);
			window.location.href = '/main/home'
		} else {
			setError('username was already taken, please try another one');
		}
	}

	const switchSignInOrSignUp = () => {
		setSigningIn(!signingIn);
		setError('')
	}

	return (
		<div className='grid place-content-center h-screen'>
			<div className='lg:w-[calc(100vw-20rem)] w-screen rounded-lg h-[calc(100vh-10rem)]' >
				<div className='lg:bg-primaryBlack bg-[#0000008b] h-[calc(100vh-10rem)] lg:flex w-full' style={{boxShadow: '0px 0px 20px 20px rgba(0, 0, 0, 0.25);'}}>
					<div className={`lg:relative absolute top-0 left-0 flex flex-col h-full w-full justify-center place-items-center ${signingIn ? '' : 'lg:bg-secondaryBlack lg:block hidden'}`}>
						{signingIn ?
						<div className='flex flex-col h-full w-full justify-center place-items-center'>
							<input ref={signInUsername} className='p-3 w-3/4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Username' />
							<input ref={signInPassword} className='p-3 w-3/4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Password' />
							<button onClick={signIn} className='text-xl text-center transition-all gradient-1 py-2 font-bold rounded-lg w-3/4 my-4 hover:rotate-1 hover:scale-105'>Sign In</button>
							{error ? <div className='p-3 text-red-500'>{error}</div> : null}
							<button className='underline text-xs' onClick={switchSignInOrSignUp}>Or Sign Up</button>
						</div> : null }
					</div>
					<div className={`lg:relative absolute top-0 left-0 h-full w-full flex flex-col justify-center place-items-center ${signingIn ? 'lg:bg-secondaryBlack lg:block hidden' : ''}`}>
						{!signingIn ?
						<div className='flex flex-col h-full w-full justify-center place-items-center'>
							<input ref={signUpUsername} className='p-3 w-3/4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Username (unique)' />
							<input ref={signUpName} className='p-3 w-3/4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Name' />
							<input ref={signUpPassword} className='p-3 w-3/4 bg-primaryBlack my-3 bg-gradient-to-r from-secondaryGreen to-[#223D3D1e] rounded-lg' type="text" placeholder='Password' />
							<button onClick={signUp} className='text-xl text-center transition-all gradient-1 py-2 font-bold rounded-lg w-3/4 my-4 hover:rotate-1 hover:scale-105'>Sign Up</button>
							{error ? <div className='p-3 text-red-500'>{error}</div> : null}
							<button className='underline text-xs' onClick={switchSignInOrSignUp}>Or Sign In</button>
						</div> : null }
					</div>
				</div>
			</div>
		</div>
	)
}

export default page