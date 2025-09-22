import netlifyIdentity from 'netlify-identity-widget'

// Initialize Netlify Identity
netlifyIdentity.init()

export const auth = {
  // Get current user
  getCurrentUser: () => {
    return netlifyIdentity.currentUser()
  },

  // Login user
  login: () => {
    netlifyIdentity.open('login')
  },

  // Signup user
  signup: () => {
    netlifyIdentity.open('signup')
  },

  // Logout user
  logout: () => {
    netlifyIdentity.logout()
  },

  // Subscribe to auth changes
  onAuthChange: (callback: (user: any) => void) => {
    netlifyIdentity.on('login', callback)
    netlifyIdentity.on('logout', () => callback(null))
  },

  // Check if user has specific role
  hasRole: (user: any, role: string) => {
    if (!user || !user.app_metadata || !user.app_metadata.roles) {
      return false
    }
    return user.app_metadata.roles.includes(role)
  }
}

export default auth
