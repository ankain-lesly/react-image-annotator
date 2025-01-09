import React from "react";
import { ArrowRight, Check, Image, Tag, User2, Users, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IconFile } from "@/assets";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useContextProvider } from "@/store/context-provider";

export default function HomePage() {
  return (
    <main className="bg-dark min-h-screen">
      <LandingPage />
    </main>
  );
}
// Type Definitions
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
}

interface NavigationItem {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

// Component Implementations
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-600">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  featured = false,
}) => (
  <div
    className={`p-6 rounded-xl ${
      featured ? "bg-blue-600 text-white ring-2 ring-blue-600" : "bg-white"
    }`}>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold mb-6">{price}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      to={"/workspace"}
      className={`inline-block text-center w-full mt-8 px-4 py-2 rounded-lg ${
        featured
          ? "bg-white text-blue-600 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}>
      Get Started
    </Link>
  </div>
);

const LandingPage: React.FC = () => {
  const { user } = useContextProvider();
  const navigate = useNavigate();

  // Navigation items
  const navItems: NavigationItem[] = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ];

  // Footer sections
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Documentation", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  // Features data
  const features: FeatureCardProps[] = [
    {
      icon: <Image className="h-6 w-6 text-blue-600" />,
      title: "Multiple Annotation Types",
      description:
        "Support for bounding boxes, polygons, and semantic segmentation",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Fast & Efficient",
      description:
        "Optimized workflow with keyboard shortcuts and batch processing",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Team Collaboration",
      description: "Work together with role-based access and real-time updates",
    },
  ];

  // Pricing plans data
  const pricingPlans: (PricingCardProps & { id: string })[] = [
    {
      id: "free",
      title: "Free",
      price: "$0",
      features: [
        "Up to 1,000 annotations",
        "Basic annotation tools",
        "Export to common formats",
        "Email support",
      ],
    },
    {
      id: "pro",
      title: "Pro",
      price: "$29",
      features: [
        "Unlimited annotations",
        "Advanced annotation tools",
        "Team collaboration",
        "Priority support",
        "API access",
      ],
      featured: true,
    },
    {
      id: "enterprise",
      title: "Enterprise",
      price: "Custom",
      features: [
        "Custom deployment",
        "Dedicated support",
        "SLA guarantee",
        "Training & onboarding",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b">
        <div className="container-x py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-krona font-normal flex-center gap-2">
              <img src={IconFile} className="w-10" />
              <p className="hidden md:block">Annotator</p>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-100 hover:text-blue-600">
                  {item.label}
                </a>
              ))}
            </div>

            {user ? (
              <nav className="flex items-center gap-4">
                <Link to="/workspace">Dashboard</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex-center gap-2">
                      <User2 className="w-5" />
                      <p className="text-sm">{user?.name.split(" ").pop()}</p>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="z-30 bg-dark cursor-pointer">
                    <DropdownMenuItem>{user?.name}</DropdownMenuItem>

                    <DropdownMenuItem>{user?.email}</DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => navigate("/workspace")}>
                      Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => navigate("/workspace")}>
                      Projects
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => navigate("/logout")}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to={"/register"}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700">
                  Sign in
                </Link>
                <Link
                  to={"/login"}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Annotate Images with
            <span className="text-blue-600"> Precision</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your image datasets with powerful annotation tools. Built
            for researchers, developers, and AI teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={"/workspace"}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              Start Annotating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              onClick={() => alert("Oops no demo available")}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:border-gray-400 text-dark">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 text-dark" id="pricing">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Tag className="h-6 w-6" />
                <span className="ml-2 text-lg font-bold">AnnotateX</span>
              </div>
              <p className="text-gray-400">
                Making image annotation simple and efficient for everyone.
              </p>
            </div>
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} AnnotateX. All rights reserved.
            </p>
            <p className="text-xs">@Group 2 | Web Programming</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
