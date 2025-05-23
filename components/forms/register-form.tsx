"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth-hooks"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToken, useLoginWithEmail } from '@privy-io/react-auth'

interface RegisterFormState {
  data: {
    email: string;
    name: string;
    code: string;
  };
  error?: string;
}

const initialState: RegisterFormState = {
  data: {
    email: '',
    name: '',
    code: '',
  },
};

type RegisterFormProps = {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { loginPrivy, registerPrivy } = useAuth()
  const { getAccessToken } = useToken()
  const { sendCode, loginWithCode } = useLoginWithEmail({
    onComplete: async () => {
      try {
        const privyAccessToken = await getAccessToken()
        if (privyAccessToken) {
          await loginPrivy({
            privyAccessToken,
            options: {
              onSuccess: (user) => {
                toast({
                  title: "Login successful",
                  description: `Welcome back, ${user.name}!`,
                })
                console.log("login success");
                router.push("/dashboard")
              },
              onError: async (err) => {
                await registerPrivy({
                privyAccessToken,
                name: state.data.name,
                options: {
                    onSuccess: (user) => {
                        toast({
                            title: "Registration successful",
                            description: `Welcome, ${user.name}!`,
                        })
                        router.push("/dashboard")
                    },
                    onError: (err) => {
                        toast({
                            title: "Registration failed",
                            description: err?.message || "Please try again.",
                        })
                        setState({ ...state, error: err?.message || "Registration failed" })
                    },
                },
                })
              },
            },
          })
        }
      } catch (err) {
        console.error('Error in onComplete:', err)
        setState({ ...state, error: "An unexpected error occurred" })
      }
    },
    onError: (error) => {
      console.error('Error during email authentication:', error)
      setState({ ...state, error: error.message })
    },
  })

  const validateForm = (): boolean => {
    if (!state.data.email.trim()) {
      setState({ ...state, error: "Email is required" })
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.email)) {
      setState({ ...state, error: "Invalid email format" })
      return false
    }
    if (!state.data.name.trim()) {
      setState({ ...state, error: "Name is required" })
      return false
    }
    if (!state.data.code.trim()) {
      setState({ ...state, error: "Verification code is required" })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setState({ ...state, error: undefined })

    try {
      await loginWithCode({ code: state.data.code })
    } catch (error) {
      setState({ ...state, error: (error as Error).message })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Enter your details to create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={state.data.name}
                onChange={(e) =>
                  setState({
                    ...state,
                    data: { ...state.data, name: e.target.value },
                    error: undefined,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={state.data.email}
                onChange={(e) =>
                  setState({
                    ...state,
                    data: { ...state.data, email: e.target.value },
                    error: undefined,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="Enter code"
                required
                value={state.data.code}
                onChange={(e) =>
                  setState({
                    ...state,
                    data: { ...state.data, code: e.target.value },
                    error: undefined,
                  })
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full"
              onClick={() => {
                if (!state.data.email.trim()) {
                  setState({ ...state, error: "Email is required" })
                  return
                }
                if (!state.data.name.trim()) {
                  setState({ ...state, error: "Name is required" })
                  return
                }
                sendCode({ email: state.data.email })
                setIsCodeSent(true)
                setState({ ...state, error: undefined })
              }}
            >
              Send Code
            </Button>
            {state.data.email.trim() && isCodeSent && (
              <Button type="submit" className="w-full"> 
              {/* disabled={isLoading} */}
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            )}
            {/* <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}