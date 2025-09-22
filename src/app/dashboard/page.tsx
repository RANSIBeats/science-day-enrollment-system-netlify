'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Registration {
  id: string
  student_id: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  student: {
    first_name: string
    last_name: string
    email: string
    project_title: string
    category: string
    school: {
      name: string
    }
  }
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = () => {
      // For demo purposes, we'll simulate a logged-in admin user
      // In a real app, this would check Netlify Identity or similar
      const mockUser = {
        email: 'admin@scienceday.com',
        app_metadata: {
          roles: ['admin']
        },
        user_metadata: {
          full_name: 'Admin User'
        }
      }
      setUser(mockUser)
    }

    // Load mock registrations
    const loadRegistrations = () => {
      const mockRegistrations: Registration[] = [
        {
          id: '1',
          student_id: '1',
          status: 'pending',
          created_at: '2024-01-15T10:00:00Z',
          student: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com',
            project_title: 'Solar Panel Efficiency',
            category: 'Engineering',
            school: {
              name: 'Lincoln High School'
            }
          }
        },
        {
          id: '2',
          student_id: '2',
          status: 'approved',
          created_at: '2024-01-14T15:30:00Z',
          student: {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com',
            project_title: 'Plant Growth Analysis',
            category: 'Biology',
            school: {
              name: 'Washington Academy'
            }
          }
        },
        {
          id: '3',
          student_id: '3',
          status: 'pending',
          created_at: '2024-01-13T09:15:00Z',
          student: {
            first_name: 'Mike',
            last_name: 'Johnson',
            email: 'mike@example.com',
            project_title: 'Chemical Reaction Rates',
            category: 'Chemistry',
            school: {
              name: 'Roosevelt Institute'
            }
          }
        },
        {
          id: '4',
          student_id: '4',
          status: 'rejected',
          created_at: '2024-01-12T14:20:00Z',
          student: {
            first_name: 'Sarah',
            last_name: 'Wilson',
            email: 'sarah@example.com',
            project_title: 'Physics of Motion',
            category: 'Physics',
            school: {
              name: 'Jefferson Preparatory'
            }
          }
        }
      ]
      
      setTimeout(() => {
        setRegistrations(mockRegistrations)
        setLoading(false)
      }, 1000) // Simulate loading delay
    }

    checkAuth()
    loadRegistrations()
  }, [])

  const handleLogin = () => {
    // Simulate login
    const mockUser = {
      email: 'admin@scienceday.com',
      app_metadata: {
        roles: ['admin']
      },
      user_metadata: {
        full_name: 'Admin User'
      }
    }
    setUser(mockUser)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const updateRegistrationStatus = async (registrationId: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setRegistrations(prev => prev.map(reg => 
        reg.id === registrationId ? { ...reg, status } : reg
      ))
    } catch (error) {
      console.error('Error updating registration:', error)
    }
  }

  const getStatusCounts = () => {
    return {
      total: registrations.length,
      pending: registrations.filter(r => r.status === 'pending').length,
      approved: registrations.filter(r => r.status === 'approved').length,
      rejected: registrations.filter(r => r.status === 'rejected').length
    }
  }

  const statusCounts = getStatusCounts()

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl py-8">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Access Required</CardTitle>
              <CardDescription>
                Please login to access the dashboard and manage registrations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials</h4>
                  <p className="text-blue-700">Email: admin@scienceday.com</p>
                  <p className="text-blue-700">Role: Administrator</p>
                </div>
                <Button onClick={handleLogin}>
                  Login to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const isAdmin = user.app_metadata?.roles?.includes('admin')
  const isSchoolOfficial = user.app_metadata?.roles?.includes('school_official')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.user_metadata?.full_name || user.email}</p>
            <p className="text-sm text-gray-500">
              {isAdmin && 'Administrator - Full access to all registrations'}
              {isSchoolOfficial && 'School Official - Access to your school registrations'}
              {!isAdmin && !isSchoolOfficial && 'Student - Access to your registrations'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Back to Registration
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
              <div className="text-sm text-gray-600">Total Registrations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3">Loading registrations...</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Registrations</CardTitle>
                <CardDescription>
                  {isAdmin && 'All student registrations awaiting review'}
                  {isSchoolOfficial && 'Registrations from your school'}
                  {!isAdmin && !isSchoolOfficial && 'Your registration status'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No registrations found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((registration) => (
                      <div key={registration.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{registration.student.project_title}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                registration.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                              <div>
                                <strong>Student:</strong> {registration.student.first_name} {registration.student.last_name}
                              </div>
                              <div>
                                <strong>Email:</strong> {registration.student.email}
                              </div>
                              <div>
                                <strong>School:</strong> {registration.student.school.name}
                              </div>
                              <div>
                                <strong>Category:</strong> {registration.student.category}
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500">
                              Applied: {new Date(registration.created_at).toLocaleDateString()} at {new Date(registration.created_at).toLocaleTimeString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {(isAdmin || isSchoolOfficial) && registration.status === 'pending' && (
                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => updateRegistrationStatus(registration.id, 'approved')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  ✓ Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                                >
                                  ✗ Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
