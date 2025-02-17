export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
    benefits: {
      title: string;
      description: string;
      icon: string;
    }[];
  }
  
  export const SERVICES_DATA: Record<string, ServiceData> = {
    'technology-solutions': {
      id: 'technology-solutions',
      title: 'Technology Solutions',
      subtitle: 'Custom Software Development & Digital Transformation',
      description: 'Transform your business with cutting-edge technology solutions tailored to your specific needs. Our expert team delivers innovative software solutions that drive growth and efficiency.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200',
      features: [
        'Custom Software Development',
        'Cloud Solutions & Migration',
        'Digital Transformation',
        'Enterprise Solutions',
        'Mobile App Development',
        'DevOps & Infrastructure'
      ],
      benefits: [
        {
          title: 'Accelerated Growth',
          description: 'Speed up your digital transformation with our proven methodologies',
          icon: '🚀'
        },
        {
          title: 'Cost Efficiency',
          description: 'Optimize operations and reduce costs with smart technology solutions',
          icon: '💰'
        },
        {
          title: 'Scalable Solutions',
          description: 'Future-proof your business with scalable architecture',
          icon: '📈'
        }
      ]
    },
    'it-staffing': {
      id: 'it-staffing',
      title: 'IT Staffing',
      subtitle: 'Expert Talent Acquisition & Placement',
      description: 'Find the perfect tech talent for your organization. Our comprehensive staffing solutions ensure you get the right professionals for your specific needs.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200',
      features: [
        'Permanent Placement',
        'Contract Staffing',
        'Remote Team Building',
        'Technical Assessment',
        'Skill Gap Analysis',
        'Team Augmentation'
      ],
      benefits: [
        {
          title: 'Quality Talent',
          description: 'Access to pre-vetted, highly skilled tech professionals',
          icon: '👥'
        },
        {
          title: 'Fast Placement',
          description: 'Reduce time-to-hire with our extensive talent network',
          icon: '⚡'
        },
        {
          title: 'Perfect Match',
          description: 'Ensure cultural and technical fit for long-term success',
          icon: '🎯'
        }
      ]
    },
    'hr-platform': {
      id: 'hr-platform',
      title: 'HR Platform',
      subtitle: 'Comprehensive HR Management Solution',
      description: 'Streamline your HR operations with our advanced platform. From recruitment to employee management, we provide tools that make HR processes efficient and effective.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200',
      features: [
        'Recruitment Management',
        'Employee Onboarding',
        'Performance Tracking',
        'Leave Management',
        'Payroll Integration',
        'Analytics & Reporting'
      ],
      benefits: [
        {
          title: 'Streamlined Process',
          description: 'Automate and simplify HR operations',
          icon: '⚙️'
        },
        {
          title: 'Data Insights',
          description: 'Make informed decisions with powerful analytics',
          icon: '📊'
        },
        {
          title: 'Employee Satisfaction',
          description: 'Improve employee experience with self-service tools',
          icon: '😊'
        }
      ]
    }
  };