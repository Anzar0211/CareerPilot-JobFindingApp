"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUp,
  Briefcase,
  Users,
  TrendingUp
} from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    jobSeekers: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "My Activity", href: "/activity" },
      { label: "Membership Plans", href: "/membership" },
    ],
    recruiters: [
      { label: "Post a Job", href: "/jobs" },
      { label: "View Applications", href: "/applications" },
      { label: "Recruiter Plans", href: "/membership" },
      { label: "Candidate Search", href: "/companies" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Community Guidelines", href: "#" },
      { label: "FAQ", href: "#" },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const stats = [
    { icon: Briefcase, value: "10K+", label: "Active Jobs" },
    { icon: Users, value: "50K+", label: "Job Seekers" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  return (
    <footer className="relative bg-background border-t border-border mt-auto w-full">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>

      <div className="mx-auto max-w-7xl lg:max-w-full px-6 py-12 lg:px-8">
        {/* Stats Section */}
        <div className="mb-12 border-b border-border pb-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-2xl font-bold text-foreground">CareerPilot</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your trusted partner in career navigation. Connecting talented professionals 
              with leading companies to build successful careers and thriving businesses.
            </p>
            
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Career Street, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@careerpilot.com</span>
              </div>
            </div>
          </div>


          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">For Job Seekers</h4>
                <ul className="space-y-3">
                  {footerLinks.jobSeekers.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">For Recruiters</h4>
                <ul className="space-y-3">
                  {footerLinks.recruiters.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

             
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        
        <div className="mt-12 border-t border-border pt-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Stay Updated with Career Opportunities
              </h3>
              <p className="text-sm text-muted-foreground">
                Get the latest job alerts and career tips delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>

        
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CareerPilot. All rights reserved.
            </div>

            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="group"
                  aria-label={social.label}
                >
                  <div className="p-2 rounded-full bg-muted hover:bg-primary transition-all duration-200 group-hover:scale-110">
                    <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                </Link>
              ))}
            </div>

            
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
