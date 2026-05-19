import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getTranslations } from 'next-intl/server'
import { login, signup } from './actions'

export default async function LoginPage() {
  const t = await getTranslations('auth')
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{t("loginTitle")}</CardTitle>
                    <CardDescription className="text-center">
                        {t("loginDescription")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("emailLabel")}</Label>
                            <Input id="email" name="email" type="email" placeholder={t("emailPlaceholder")} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t("passwordLabel")}</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            {/* @ts-expect-error server action return type mismatch */}
                            <Button formAction={login} className="w-full">
                                {t("signIn")}
                            </Button>
                            {/* @ts-expect-error server action return type mismatch */}
                            <Button formAction={signup} variant="outline" className="w-full">
                                {t("signUp")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
