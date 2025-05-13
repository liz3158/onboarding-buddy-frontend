export const internalDocs = {
  technical_setup: {
    vpn: {
      title: 'VPN Setup Guide',
      path: '/docs/technical/vpn-setup',
      content: `
# VPN Setup Guide

1. Request VPN access through IT Support Portal
2. Download Cisco AnyConnect VPN Client
3. Install the client on your machine
4. Enter the following server details:
   - Server: vpn.company.com
   - Group: employee
5. Use your company email and password to connect
6. Test connection by accessing internal resources

For assistance, contact IT Support:
- Slack: #it-support
- Email: it.support@company.com
      `
    },
    development: {
      title: 'Development Environment Setup',
      path: '/docs/technical/dev-setup',
      content: `
# Development Environment Setup

## Required Software
- Git (latest version)
- Node.js (v16+)
- Docker Desktop
- VS Code
- PostgreSQL

## Repository Access
1. Generate SSH key
2. Add key to GitHub account
3. Clone necessary repositories:
   - Frontend: git@github.com:company/frontend-main.git
   - Backend: git@github.com:company/api-services.git

## Local Setup Steps
1. Install dependencies
2. Configure environment variables
3. Start local services
4. Run test suite

See team-specific setup guides for additional requirements.
      `
    }
  },
  policies: {
    code_review: {
      title: 'Code Review Guidelines',
      path: '/docs/engineering/code-review',
      content: `
# Code Review Guidelines

## Pull Request Process
1. Create feature branch from develop
2. Write clear PR description
3. Add necessary labels
4. Request review from team lead
5. Address feedback promptly

## Review Checklist
- Code follows style guide
- Tests are included
- Documentation is updated
- No security vulnerabilities
- Performance impact considered

## Response Times
- First review: Within 24 hours
- Follow-up reviews: Within 12 hours
      `
    },
    gitflow: {
      title: 'Git Workflow',
      path: '/docs/engineering/gitflow',
      content: `
# Git Workflow Guidelines

## Branch Structure
- main: Production code
- develop: Integration branch
- feature/*: New features
- bugfix/*: Bug fixes
- release/*: Release preparation

## Commit Guidelines
- Use conventional commits
- Keep commits focused
- Write clear messages

## Merge Process
1. Rebase on develop
2. Squash commits if needed
3. Merge via PR
      `
    }
  },
  onboarding: {
    checklist: {
      title: 'New Hire Checklist',
      path: '/docs/onboarding/checklist',
      content: `
# New Hire Checklist

## Week 1
- [ ] Complete HR paperwork
- [ ] Set up workstation
- [ ] Access key systems
- [ ] Meet team members
- [ ] Review company policies

## Week 2
- [ ] Complete technical setup
- [ ] Review codebase
- [ ] Set up local environment
- [ ] Attend team meetings

## Week 3-4
- [ ] Work on starter tasks
- [ ] Regular 1:1s with mentor
- [ ] Join key discussions
- [ ] Give feedback on process
      `
    },
    learning_path: {
      title: 'Engineering Learning Path',
      path: '/docs/onboarding/learning',
      content: `
# Engineering Learning Path

## Fundamentals
1. Architecture Overview
2. Development Workflow
3. Testing Practices
4. Security Guidelines

## Advanced Topics
1. System Design
2. Performance Optimization
3. Monitoring & Debugging
4. Best Practices

## Resources
- Internal Wiki
- Tech Blog
- Training Videos
- Documentation
      `
    }
  },
  security: {
    guidelines: {
      title: 'Security Guidelines',
      path: '/docs/security/guidelines',
      content: `
# Security Guidelines

## Data Handling
- Never share credentials
- Encrypt sensitive data
- Use secure connections
- Follow least privilege principle

## Access Control
- Regular password updates
- 2FA required
- Report suspicious activity
- Lock workstation when away

## Incident Response
1. Stop affected systems
2. Report to security team
3. Document incident
4. Follow recovery plan
      `
    }
  }
}; 