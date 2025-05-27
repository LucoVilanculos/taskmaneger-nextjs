'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  identifier: z.string().min(2, 'Enter your username or email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
})

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const savedUser = localStorage.getItem('userData')

    if (!savedUser) {
      setGeneralError('No user found. Please register first.')
      return
    }

    const userData = JSON.parse(savedUser)
    const isMatch =
      (values.identifier === userData.username || values.identifier === userData.email) &&
      values.password === userData.password

    if (!isMatch) {
      setGeneralError('Invalid username/email or password.')
      return
    }

    // Guardar username no localStorage
    localStorage.setItem('useName', userData.username)

    // Se lembrar, guarda o usuário atual
    if (values.remember) {
      localStorage.setItem('currentUser', userData.username)
    }

    // Redireciona
    router.push('/home')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-l from-blue-900 to-cyan-700 text-white">
      <div className="bg-white text-black rounded-xl p-8 w-full max-w-md shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {generalError && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
            {generalError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com or yourname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm">Remember Me</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-800 text-white">
              Sign In
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <a href="/auth/register" className="text-cyan-700 hover:underline font-semibold">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}
