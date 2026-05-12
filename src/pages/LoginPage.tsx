import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { UserIdSegment } from '@/components/ui/UserIdSegment'
import { useAuthStore } from '@/store/useAuthStore'
import type { UserId } from '@/types/user'

type FormValues = {
  email: string
  password: string
  userId: UserId
}

export function LoginPage() {
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.userId)
  const setUserId = useAuthStore((s) => s.setUserId)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      userId: 'u1',
    },
  })

  const selectedUser = useWatch({ control, name: 'userId' })

  useEffect(() => {
    if (userId) {
      navigate('/', { replace: true })
    }
  }, [userId, navigate])

  const onSubmit = (data: FormValues) => {
    setUserId(data.userId)
    navigate('/')
  }

  return (
    <motion.div
      className="flex w-full max-w-[24rem] flex-1 flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <h1 className="text-[19px] font-semibold leading-none tracking-tight text-foreground sm:text-[33px] sm:leading-[1.1]">
        Login
      </h1>

      <form
        className="mt-14 flex flex-1 flex-col gap-8 sm:mt-16"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Example@email.com"
            leftAdornment={<Mail aria-hidden />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Enter your email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="********"
            error={errors.password?.message}
            rightAdornment={
              <button
                type="button"
                className="rounded p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="size-5" aria-hidden />
                ) : (
                  <Eye className="size-5" aria-hidden />
                )}
              </button>
            }
            {...register('password', {
              required: 'Enter your password',
              minLength: {
                value: 6,
                message: 'At least 6 characters',
              },
            })}
          />
        </div>

        <UserIdSegment
          value={selectedUser ?? 'u1'}
          onChange={(id) => setValue('userId', id, { shouldValidate: true })}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mx-auto h-[33px] w-[130px] text-xs font-medium sm:mx-0 sm:h-12 sm:w-full sm:text-base"
        >
          Login
        </Button>
      </form>

      <div className="mt-auto flex w-full flex-col gap-4 pt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-16">
        <button
          type="button"
          className="inline-flex h-[30px] items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground hover:bg-muted"
        >
          Need help?
        </button>
        <p className="text-center text-sm text-muted-foreground sm:text-right">
          Don&apos;t you have an account?{' '}
          <span className="font-medium text-foreground">Sign up</span>
        </p>
      </div>
    </motion.div>
  )
}
