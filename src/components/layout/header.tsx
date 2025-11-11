'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SearchPanel } from '@/components/search-panel';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const servicesNav = siteConfig.mainNav.find((item) => item.title === 'Services');
  const solutionsNav = siteConfig.mainNav.find((item) => item.title === 'Solutions');
  const resourcesNav = siteConfig.mainNav.find((item) => item.title === 'Resources');
  const aboutNav = siteConfig.mainNav.find((item) => item.title === 'About');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md font-bold text-white"
            style={{ backgroundColor: siteConfig.brand.colors.primary }}
          >
            H
          </div>
          <span
            className="hidden font-bold sm:inline-block"
            style={{ color: siteConfig.brand.colors.primary }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Services Mega Menu */}
            {servicesNav?.items && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{servicesNav.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    {servicesNav.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600'
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Solutions */}
            {solutionsNav && (
              <NavigationMenuItem>
                <Link href={solutionsNav.href} legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    {solutionsNav.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}

            {/* Case Studies */}
            <NavigationMenuItem>
              <Link href="/case-studies" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Case Studies
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Resources Mega Menu */}
            {resourcesNav?.items && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{resourcesNav.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {resourcesNav.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600'
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Pricing */}
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* About */}
            {aboutNav?.items && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{aboutNav.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {aboutNav.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600'
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}

            {/* Contact */}
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Pricing */}
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Primary CTA */}
          <Button
            asChild
            className="hidden md:flex"
            style={{ backgroundColor: siteConfig.brand.colors.accent }}
          >
            <Link href={siteConfig.ctas.primary.href}>{siteConfig.ctas.primary.title}</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center space-x-2 pb-4 border-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-md font-bold text-white"
                    style={{ backgroundColor: siteConfig.brand.colors.primary }}
                  >
                    H
                  </div>
                  <span className="font-bold" style={{ color: siteConfig.brand.colors.primary }}>
                    {siteConfig.name}
                  </span>
                </Link>

                {siteConfig.mainNav.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    {'items' in item && item.items ? (
                      <div className="ml-4 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block text-sm text-gray-600 hover:text-blue-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        View {item.title}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Pricing Link */}
                <div className="space-y-2">
                  <Link
                    href="/pricing"
                    className="block font-semibold text-gray-900 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </div>

                <Button
                  asChild
                  className="mt-4"
                  style={{ backgroundColor: siteConfig.brand.colors.accent }}
                >
                  <Link
                    href={siteConfig.ctas.primary.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {siteConfig.ctas.primary.title}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Panel */}
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
