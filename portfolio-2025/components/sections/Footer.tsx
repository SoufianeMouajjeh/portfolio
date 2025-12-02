"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full py-8 px-4"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-black/60">
          <span>Designed & Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </div>
        <p className="text-sm text-black/50">
          © 2025 SoufianeDev. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
