import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">MRU Merchant OS</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            {/* @ts-expect-error server action return type mismatch */}
                            <Button formAction={login} className="w-full">
                                Sign In
                            </Button>
                            {/* @ts-expect-error server action return type mismatch */}
                            <Button formAction={signup} variant="outline" className="w-full">
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
