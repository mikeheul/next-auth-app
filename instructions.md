# Next Auth App (NextAuth.js and MongoDB)

https://www.youtube.com/watch?v=PEMfsqZ2-As&ab_channel=GTCoding
36:03

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
- Check it in package.json
``` json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "mongoose": "^8.2.1",
    "next": "14.1.3",
    "next-auth": "^4.24.7",
    "react": "^18",
    "react-dom": "^18"
},
```

- Update RegisterForm component
``` javascript
"use client";

import Link from "next/link"
import { useState } from "react";

const RegisterForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!name || !email || !password) {
        setError("All fields are required");
        return;
    }
  }

  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Register</h1>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
            >
                <input 
                    onChange={ e => setName(e.target.value) } 
                    type="text" 
                    placeholder="Full Name" 
                    />
                <input 
                    onChange={ e => setEmail(e.target.value) } 
                    type="text" 
                    placeholder="Email" 
                    />
                <input 
                    onChange={ e => setPassword(e.target.value) } 
                    type="password" 
                    placeholder="Password" 
                />
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                    Register
                </button>

                { error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
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

- Create api/register folder in app/ and route.js inside "register" folder
``` javascript
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        console.log("Name : " + name);
        console.log("Email : " + email);
        console.log("Pass : " + password);

        return NextResponse.json({ message: "User registered"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error occured while registering user"}, {status: 500})
    }
}
```

- Update RegisterForm
``` javascript
"use client";

import Link from "next/link"
import { useState } from "react";

const RegisterForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!name || !email || !password) {
        setError("All fields are required");
        return;
    }
    
    try {
        const res = await fetch('api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, 
                email, 
                password,
            }),
        });
        
        if(res.ok) {
            const form = e.target;
            form.reset(); 
        } else {
            console.log("User registration failed")
        }
    } catch (error) {
        console.log("Error during registration :", error)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">Register</h1>
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
            >
                <input 
                    onChange={ e => setName(e.target.value) } 
                    type="text" 
                    placeholder="Full Name" 
                    />
                <input 
                    onChange={ e => setEmail(e.target.value) } 
                    type="text" 
                    placeholder="Email" 
                    />
                <input 
                    onChange={ e => setPassword(e.target.value) } 
                    type="password" 
                    placeholder="Password" 
                />
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                    Register
                </button>

                { error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
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

- Create a .env file (root folder) and add it to gitignore

- Create a lib folder (root folder) and mongodb.js inside
``` javascript
import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}
```

- Add a "models" folder (root folder) and "user.js" inside
``` javascript
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
```

- Update "route.js"
``` javascript
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User registered"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error occured while registering user"}, {status: 500})
    }
}
```

- Add method to check if user is already registered : new folder + route.js
``` javascript
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
```

``` javascript
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    if(password !== passwordRepeat) {
        setError("Passwords do not match");
        return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setPasswordRepeat(e.target.value)}
            type="password"
            placeholder="Repeat Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
```








