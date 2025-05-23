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

interface LoginFormState {
  data: {
    email: string;
    code: string;
  };
  error?: string;
}

const initialState: LoginFormState = {
  data: {
    email: '',
    code: '',
  },
};

export function LoginForm() {
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { loginPrivy } = useAuth()
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
                router.push("/dashboard")
              },
              onError: (err) => {
                toast({
                  title: "Login failed",
                  description: err?.message || "Please try again.",
                })
                setState({ ...state, error: err?.message || "Login failed" })
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setState({ ...state, error: undefined })

    if (!state.data.email.trim()) {
      setState({ ...state, error: "Email is required" })
      setIsLoading(false)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.email)) {
      setState({ ...state, error: "Invalid email format" })
      setIsLoading(false)
      return
    }
    if (!state.data.code.trim()) {
      setState({ ...state, error: "Verification code is required" })
      setIsLoading(false)
      return
    }

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
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your email to receive a verification code</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
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
                sendCode({ email: state.data.email })
                setIsCodeSent(true)
                setState({ ...state, error: undefined })
              }}
            >
              Send Code
            </Button>
            {state.data.email.trim() && isCodeSent && (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            )}
            {/* <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}