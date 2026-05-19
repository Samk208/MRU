import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    return { locale: routing.defaultLocale, messages: {} }
  }

  const messages = (await import(`../messages/${locale}.json`)).default

  return {
    locale,
    messages,
    timeZone: 'Africa/Conakry',
    now: new Date(),
  }
})
