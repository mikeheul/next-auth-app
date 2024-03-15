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