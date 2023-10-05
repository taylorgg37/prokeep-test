import { useForm } from 'react-hook-form'

type FormValues = { email: string; password: string }

const LoginURL = 'https://reqres.in/api/log-in'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async ({ email, password }: FormValues) => {
    const res = await fetch(LoginURL, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const user = await res.json()
    console.log(user)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-600 to-pink-500">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-4xl font-bold text-purple-700">
          Welcome to My Website
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2"
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email', { required: 'Enter your email.' })}
            />
            {errors?.email?.message && (
              <span className="text-sm text-red-600">
                {errors?.email.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 px-4 py-2"
              id="password"
              type="password"
              placeholder="qwerty123"
              {...register('password', {
                required: 'Enter your password.'
              })}
            />
            {errors?.password?.message && (
              <span className="text-sm text-red-600">
                {errors?.password.message}
              </span>
            )}
          </div>
          <div>
            <button
              disabled={isSubmitting}
              id="submit-btn"
              className="w-full rounded-lg bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-900"
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
