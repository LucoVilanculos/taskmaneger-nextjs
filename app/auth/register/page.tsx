'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SuccessModal } from '@/components/ui/sucess-modal'

const formSchema = z
  .object({
    username: z.string().min(2, 'Minimum 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Minimum 6 characters'),
    confirmPassword: z.string().min(6, 'Minimum 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function RegisterPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Registered:', values)

    localStorage.setItem('userData', JSON.stringify(values))

    setShowSuccessModal(true)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-l from-blue-900 to-cyan-700 px-4 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Create Your Account</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow text-black">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
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
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
            Register
          </Button>
        </form>
      </Form>

      <SuccessModal
        show={showSuccessModal}
        message="Account created successfully! Redirecting to login..."
        redirectTo="/auth/login"
      />
    </main>
  )
}
