import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const CreateAccountPage = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const createAccount = async () => {
        try{
            if (password !== confirmPassword){
                setError('Password and confirm password does not match.')
                return
            }
            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate('/articles')
        }
        catch (e){
            setError(e.message)
        }
    }


    return (
        <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input value={email} required placeholder="Your Email address" onChange={e => setEmail(e.target.value)} />
        <input type="password" required value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input type="password" required value={confirmPassword} placeholder="Re-Enter your Password" onChange={e => setConfirmPassword(e.target.value)} />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Log In</Link>
        </>
    )
}

export default CreateAccountPage