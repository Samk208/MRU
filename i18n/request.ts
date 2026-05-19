import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  if (!hasLocale(routing.locales, locale)) {
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
