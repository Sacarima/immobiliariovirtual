import { useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        try {
            const res = await fetch(`/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  password, confirmPassword }), // send the new password and confirm password
            })

            const data = await res.json()
            if (res.ok) {
                alert('Password reset successfully')
                navigate('/signin') // Redirect to the sign in page
            } else {
                throw new Error(data.message || 'Failed to reset password')
            }
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <section className=''>
            <div className=''>
                <a href="#">
                    Immobiliario<span>Virtual</span>
                </a>
                <div className=''>
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor='password'>New Password</label>
                            <input
                                type='password'
                                id='password'
                                placeholder='Enter your new password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                type='password'
                                id='confirmPassword'
                                placeholder='Confirm your new password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type='submit'>Reset Password</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword