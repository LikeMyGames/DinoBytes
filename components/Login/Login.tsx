import { useState, useContext } from "react"
import style from "./Login.module.css"
import GoogleIcon from "@/public/google.png"
import Image from "next/image"
import { CreateUserEmailPassword, SignInEmailPassword, SignInGoogle } from "@/lib/firebase/auth/auth"
import { UserContext } from "@/app/contexts"

export function Login() {
	const [email, setEmail] = useState<string>("")
	const [pass, setPass] = useState<string>("")
	const [, setUser] = useContext(UserContext)

	return (
		<div className={style.card_container}>
			<div className={style.card}>
				<div className={style.input_bar}>
					<h3>Email</h3>
					<input type="email" placeholder={"user@example.com"} onChange={(e) => {
						e.preventDefault();
						setEmail(e.target.value)
					}} />
				</div>
				<div className={style.input_bar}>
					<h3>Password</h3>
					<input type="password" placeholder={""} onChange={(e) => {
						e.preventDefault();
						setPass(e.target.value)
					}} />
				</div>
				<div className={style.alternate_option}>
					<button type="button">
						Forgot Password
					</button>
				</div>
				<button type="submit" className={style.submit} onClick={() => {
					SignInEmailPassword(email, pass)
						.then((user) => {
							setUser(user);
						})
				}}>
					Sign In
				</button>
				<button type="submit" className={style.submit} onClick={() => {
					CreateUserEmailPassword(email, pass)
						.then((user) => {
							setUser(user);
						})
				}}>
					Create Account
				</button>
				<div className={style.option_seperator}>
					<div />
					<h4>OR</h4>
					<div />
				</div>
				<>
					<button title="Google Provider" type="button" className={style.oauth_option} onClick={() => {
						SignInGoogle()
							.then((user) => {
								setUser(user);
							})
					}}>
						<Image alt="googleIcon" loading={"lazy"} src={GoogleIcon} />
					</button>
				</>
			</div>
		</div>
	)
}