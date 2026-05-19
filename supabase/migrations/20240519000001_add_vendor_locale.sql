alter table public.vendors add column if not exists preferred_locale text not null default 'en' check (preferred_locale in ('en', 'fr'));

comment on column public.vendors.preferred_locale is 'UI locale preference for this vendor. Set by LanguageSwitcher.';
