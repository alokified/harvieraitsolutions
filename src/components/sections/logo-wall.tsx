'use client';

import { motion } from 'framer-motion';

interface Logo {
  name: string;
  src?: string;
}

interface LogoWallProps {
  title?: string;
  logos: Logo[];
}

export function LogoWall({ title = 'Trusted by industry leaders', logos }: LogoWallProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-gray-600">
            {title}
          </h3>
        )}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <div className="flex h-12 items-center justify-center rounded-lg bg-gray-200 px-6 text-sm font-semibold text-gray-600">
                  {logo.name}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
