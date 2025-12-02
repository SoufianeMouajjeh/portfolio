"use client";

import { motion } from "framer-motion";
import { TwitterIcon, ContactIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import AvatarModel from "@/components/3d/AvatarModel";

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center pt-8 pb-12">
      {/* 3D Model Viewer Area */}
      <div className="relative w-[510px] h-[500px] max-w-full">
        <AvatarModel />
      </div>

      {/* Typography Section */}
      <div className="flex flex-col items-center gap-8 mt-8 text-center px-4">
        {/* Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="doto-800 text-black tracking-tight">
            Soufiane El Mouajjeh
          </h1>
          <p className="text-black calibri-bold" dir="rtl">
            ( سفيان )
          </p>
        </motion.div>

        {/* Role Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-[758px]"
        >
          <div className="mono-body text-black/70">
            <p className="mb-0">
              <span className="mono-extrabold text-black">Full Stack Developer</span>
              <span>{` here`}</span>
            </p>
            <p className="mb-0">The person who builds the stuff you actually click.</p>
            <p className="mb-0">
              <span className="mono-extrabold text-black">Front end</span>
              <span>{` , `}</span>
              <span className="mono-extrabold text-black">Back end</span>
              <span>{` , `}</span>
              <span className="mono-extrabold text-black">Databases</span>
              <span>{`, and all the weird `}</span>
            </p>
            <p>bugs in between.</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="soft"
            leftIcon={<TwitterIcon className="w-4 h-4" />}
          >
            Twitter DM
          </Button>
          <span className="text-black/40 font-medium">OR</span>
          <Button
            variant="soft"
            leftIcon={<ContactIcon className="w-4 h-4" />}
          >
            Email Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
