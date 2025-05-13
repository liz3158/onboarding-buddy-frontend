export const orgData = {
  departments: {
    engineering: {
      name: 'Engineering',
      leader: {
        name: 'Alex Tan',
        role: 'VP of Engineering',
        contact: {
          email: 'alex.tan@company.com',
          slack: '@alextan',
          phone: '+1 (555) 123-4567'
        },
        availability: 'Mon-Fri, 9 AM - 6 PM PST'
      },
      teams: {
        frontend: {
          name: 'Frontend Team',
          leader: {
            name: 'Sarah Chen',
            role: 'Frontend Tech Lead',
            contact: {
              email: 'sarah.chen@company.com',
              slack: '@sarahc',
              phone: '+1 (555) 234-5678'
            }
          },
          meetings: {
            standup: 'Daily at 10:00 AM PST',
            planning: 'Monday at 11:00 AM PST',
            retro: 'Friday at 2:00 PM PST'
          },
          stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
          repositories: ['frontend-main', 'design-system', 'web-components']
        },
        backend: {
          name: 'Backend Team',
          leader: {
            name: 'Michael Kumar',
            role: 'Backend Tech Lead',
            contact: {
              email: 'michael.kumar@company.com',
              slack: '@mkumar',
              phone: '+1 (555) 345-6789'
            }
          },
          meetings: {
            standup: 'Daily at 10:30 AM PST',
            planning: 'Monday at 1:00 PM PST',
            retro: 'Friday at 3:00 PM PST'
          },
          stack: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
          repositories: ['api-services', 'data-pipeline', 'auth-service']
        },
        devops: {
          name: 'DevOps Team',
          leader: {
            name: 'Emily Rodriguez',
            role: 'DevOps Lead',
            contact: {
              email: 'emily.rodriguez@company.com',
              slack: '@emilyr',
              phone: '+1 (555) 456-7890'
            }
          },
          meetings: {
            standup: 'Daily at 11:00 AM PST',
            planning: 'Tuesday at 10:00 AM PST',
            retro: 'Friday at 4:00 PM PST'
          },
          stack: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
          repositories: ['infrastructure', 'ci-cd', 'monitoring']
        }
      }
    }
  },
  buddyProgram: {
    coordinators: [
      {
        name: 'David Park',
        role: 'Senior Engineer & Buddy Program Lead',
        contact: {
          email: 'david.park@company.com',
          slack: '@davidp'
        }
      }
    ],
    mentors: {
      frontend: [
        {
          name: 'Lisa Wong',
          experience: '5 years',
          specialties: ['React', 'UI/UX', 'Performance'],
          contact: { slack: '@lwong' }
        }
      ],
      backend: [
        {
          name: 'James Miller',
          experience: '6 years',
          specialties: ['API Design', 'Database', 'Security'],
          contact: { slack: '@jmiller' }
        }
      ]
    }
  },
  emergencyContacts: {
    it_support: {
      name: 'IT Support Team',
      contact: {
        email: 'it.support@company.com',
        slack: '#it-support',
        phone: '+1 (555) 999-0000'
      },
      availability: '24/7',
      response_time: 'Within 1 hour'
    },
    hr: {
      name: 'HR Team',
      contact: {
        email: 'hr@company.com',
        slack: '#hr-support',
        phone: '+1 (555) 999-1111'
      },
      availability: 'Mon-Fri, 9 AM - 5 PM PST',
      response_time: 'Within 24 hours'
    }
  },
  sensitiveTopics: [
    'salary',
    'compensation',
    'benefits',
    'medical',
    'health',
    'performance review',
    'disciplinary',
    'personal information'
  ]
}; 