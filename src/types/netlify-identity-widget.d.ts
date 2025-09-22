declare module 'netlify-identity-widget' {
  interface User {
    email: string
    id: string
    app_metadata: {
      roles?: string[]
      [key: string]: any
    }
    user_metadata: {
      full_name?: string
      [key: string]: any
    }
  }

  interface NetlifyIdentity {
    init: (options?: any) => void
    open: (mode: 'login' | 'signup') => void
    logout: () => void
    currentUser: () => User | null
    on: (event: 'login' | 'logout', callback: (user: User | null) => void) => void
  }

  const netlifyIdentity: NetlifyIdentity
  export default netlifyIdentity
}
