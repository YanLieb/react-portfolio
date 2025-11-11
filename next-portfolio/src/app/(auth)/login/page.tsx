import { signIn } from 'auth'

export default function LoginPage() {
  return (
    <div className='w-full h-dvh flex items-center justify-center flex-col gap-12'>
      <h1 className="text-bold text-3xl">Connexion</h1>
    <form
      action={async () => {
        "use server"
        await signIn("google", {redirectTo: "/dashboard"})
      }}
      >
      <button className="px-4 py-2 bg-red-600 border-2 border-red-600 text-amber-50 font-bold cursor-pointer rounded-4xl transition hover:bg-amber-50 hover:text-black" type="submit">Login with Google</button>
    </form>
      </div>
  )
}