# Next Auth App (NextAuth.js and MongoDB)

## Installation
``` properties
npx create-next-app@latest [name]
```

- In page.js, delete all main section and delete all CSS in globals.css
- Rename page.js to page.jsx
- Create new "components" folder in app root and LoginForm.jsx

``` javascript
const LoginForm = () => {
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm
```
- And include LoginForm in page.jsx
``` javascript
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
```

- Create LoginForm elements
``` javascript
import Link from "next/link"

const LoginForm = () => {
  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Enter the details</h1>
            <form className="flex flex-col gap-3">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                    Login
                </button>

                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    Error message
                </div>

                <Link className="text-sm mt-3 text-right" href={'/register'}>
                    Don&apos;t have an account ? <span className="underline">Register</span>
                </Link>
            </form>
        </div>
    </div>
  )
}
```

- Create new "register" folder and page.jsx
- Create a new component RegisterForm (copy/paste LoginForm and update elements)
``` javascript
import Link from "next/link"

const RegisterForm = () => {
  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Register</h1>
            <form className="flex flex-col gap-3">
                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                    Register
                </button>

                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    Error message
                </div>

                <Link className="text-sm mt-3 text-right" href={'/'}>
                    Already have an account ? <span className="underline">Login</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm
```

- Create a new "dashboard" folder in app/ with page.jsx and a new "UserInfo" component
``` javascript
const UserInfo = () => {
  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
            <div>
                Name : <span className="font-bold">John</span>
            </div>
            <div>
                Email : <span className="font-bold">john@gmail.com</span>
            </div>
            <button className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
                Log Out
            </button>
        </div>
    </div>
  )
}

export default UserInfo
```
``` javascript
import UserInfo from "@/components/UserInfo"

const page = () => {
  return (
    <UserInfo />
  )
}

export default page
```

- Install NextAuth, Mongoose and BCryptJS
``` properties
npm i next-auth mongoose bcryptjs
```



