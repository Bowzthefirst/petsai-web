"use client";
import { useState } from "react";
import { Link } from "next-view-transitions";
import { Logo } from "../Logo";
import { Button } from "../button";
import { ModeToggle } from "../mode-toggle";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "../ui/resizable-navbar";

const navItems = [
  {
    name: "Pricing",
    link: "/pricing",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <div className="flex items-center">
          <Logo />
        </div>
        <NavItems items={navItems} />
        <div className="flex space-x-2 items-center">
          <ModeToggle />
          <Button variant="simple" as={Link} href="/login">
            Login
          </Button>
          <Button as={Link} href="/signup">
            Sign Up
          </Button>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <Logo />
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-lg"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Button as={Link} href="/signup" onClick={() => setIsOpen(false)}>
              Sign Up
            </Button>
            <Button variant="simple" as={Link} href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Button>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
