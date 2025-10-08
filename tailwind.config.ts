import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [forms, typography],
} satisfies Config
