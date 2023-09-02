# Next.js 13 i18n Example
 This is an example of custom i18n solution for a Next.js 13 project with App Router.

## Introduction

This example shows how to implement a custom i18n solution for a Next.js 13 project with App Router. It uses the Next.js 13 custom middleware feature to implement a custom i18n solution. It also uses `accept-language-parser` to parse the `Accept-Language` header.

## App Structure

```
- Root
    - app/
        - [lang]/
            - dashboard/
                - page.tsx
            - profile/
                - page.tsx
        - lang-provider.tsx
    - locales/
        - en.json
        - tr.json
    - middleware.ts
```

### Packages

- `next`: Next.js framework.
- `accept-language-parser`: Parses the `Accept-Language` header.
- `dot-prop`: Accesses the translations.


In this example, we have a `lang-provider.tsx` file that provides the language context to the app. It also provides a `useLang` hook to access the language context.

We have a `middleware.ts` file that implements the custom i18n solution. It parses the `Accept-Language` header and sets the language context.

We have a `locales` folder that contains the language files. Each language file is a JSON file that contains the translations.

We have an `app` folder that contains the pages. Each page is a React component that uses the `useLang` hook to access the language context.

I prefer to use `dot-prop` to access the translations. It allows me to use dot notation to access the translations. It supports `get`, `set`, `delete`, and `has` operations. In this example, I use `getProperty`. It returns the value of the property if it exists. Otherwise, it returns the default value.

