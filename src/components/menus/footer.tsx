// import { AppLogo } from "@/public";
// import Image from "@/components/ui/image";
// import Link from "next/link";
// import React from "react";
// import { BsLinkedin } from "react-icons/bs";
// import { CgMail } from "react-icons/cg";

// export default function Footer() {
//   return (
//     <footer className="py-16 px-6 bg-black text-light-main border-t__border-t-secondary">
//       <div className="container-x">
//         <div className="grid md:grid-cols-4 gap-8">
//           {/* <div className="flex flex-wrap md:justify-around gap-8"> */}
//           <div>
//             <Link href="/" className="flex items-center space-x-2 mb-4">
//               <Image
//                 src={AppLogo}
//                 height={40}
//                 alt="annotator Logo"
//                 className="h-10 w-10"
//               />
//               <span className="text-xl font-bold">annotator</span>
//             </Link>
//             <p className="text-light-main/70">
//               Empowering your ideas with AI, one note at a time. Harness the
//               power of AI to create, organize, and share your notes like never
//               before.
//             </p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Product</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="#features"
//                   className="text-light-main/70 hover:text-light-main">
//                   Features
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#pricing"
//                   className="text-light-main/70 hover:text-light-main">
//                   Pricing
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/faq"
//                   className="text-light-main/70 hover:text-light-main">
//                   FAQ
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Company</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="#"
//                   className="text-light-main/70 hover:text-light-main">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-light-main/70 hover:text-light-main">
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-light-main/70 hover:text-light-main">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Connect</h3>
//             <div className="flex space-x-4">
//               <Link
//                 href="mailto:lesly@letech-cg.com?subject=Contact from annotator: Connect"
//                 className="text-light-main/70 hover:text-light-main">
//                 <CgMail fontSize={24} />
//               </Link>
//               <Link
//                 href="https://linkedin/in/leslychuo"
//                 className="text-light-main/70 hover:text-light-main">
//                 <BsLinkedin fontSize={18} />
//               </Link>
//               <Link
//                 href="https://github.com/ankain-lesly"
//                 className="text-light-main/70 hover:text-light-main">
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true">
//                   <path
//                     fillRule="evenodd"
//                     d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t w-4/5 mx-auto border-light-main/20 text-center text-light-main/20">
//           <p>Copyright &copy; 2023 annotator. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }
