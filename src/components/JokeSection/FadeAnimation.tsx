import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FadeAnimationProps {
  children: React.ReactNode;
  keyProp: string | number;
}

const FadeAnimation: React.FC<FadeAnimationProps> = ({ children, keyProp }) => {
  return (
    <AnimatePresence mode="wait">
      {children && (
        <motion.div
          key={keyProp}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeAnimation;
