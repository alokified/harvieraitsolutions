'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Github, Youtube, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/config/site';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50" style={{ borderColor: '#e5e7eb' }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Services Column */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: siteConfig.brand.colors.primary }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: siteConfig.brand.colors.primary }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: siteConfig.brand.colors.primary }}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wider"
              style={{ color: siteConfig.brand.colors.primary }}
            >
              Support
            </h3>
            <ul className="space-y-3">
              {siteConfig.footerNav.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Office Addresses */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-3">
          {siteConfig.offices.map((office) => (
            <div key={office.id} className="space-y-2">
              <h4 className="font-semibold" style={{ color: siteConfig.brand.colors.primary }}>
                {office.name}
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <div>{office.address.street}</div>
                    {office.address.suite && <div>{office.address.suite}</div>}
                    <div>
                      {office.address.city}
                      {office.address.state && `, ${office.address.state}`} {office.address.zip}
                    </div>
                    <div>{office.address.country}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${office.phone}`} className="hover:text-blue-600">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${office.email}`} className="hover:text-blue-600">
                    {office.email}
                  </a>
                </div>
                <div className="text-xs text-gray-500">{office.hours}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ backgroundColor: siteConfig.brand.colors.primary }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Newsletter Signup */}
            <div className="flex w-full max-w-md items-center gap-2 md:w-auto">
              <form onSubmit={handleNewsletterSubmit} className="flex w-full gap-2">
                <Input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 text-white placeholder:text-gray-400 border-white/20"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="whitespace-nowrap"
                  style={{ backgroundColor: siteConfig.brand.colors.accent }}
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row">
            <p>
              &copy; {currentYear} {siteConfig.business.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {siteConfig.footerNav.legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
