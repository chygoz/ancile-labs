"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import Mission1 from "@/public/mission-1.webp";
import Mission2 from "@/public/mission-2.webp";
import Mission3 from "@/public/mission-3.webp";
import MissionPhone from "@/public/mission-phone.webp";
import MissionGraphic from "@/public/mission-graphic.svg";
import Container from "@/components/container";

const Mission = () => {
  const controls = useAnimation();
  const textControls = useAnimation();
  const cardsControls = useAnimation();

  const ref = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
    if (isTextInView) {
      textControls.start("visible");
    }
    if (isCardsInView) {
      cardsControls.start("visible");
    }
  }, [
    isInView,
    isTextInView,
    isCardsInView,
    controls,
    textControls,
    cardsControls,
  ]);

  return (
    <div className="w-full bg-[#FDF5D9] overflow-hidden">
      <Container>
        {/* Hero Section */}
        <motion.div
          ref={ref}
          className="relative w-full flex flex-col md:flex-row h-auto md:h-[562px] rounded-tl-full overflow-hidden rounded-r-full gap-10 md:gap-0"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <motion.div
            className="w-full flex items-center justify-center rounded-tl-4xl overflow-hidden"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <div className="relative w-full h-[300px] md:h-[562px]">
              <Image
                src={MissionPhone || "/placeholder.svg"}
                alt="Person using a tablet"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full relative"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
              },
            }}
          >
            <div className="relative w-full h-[350px] md:h-full md:min-h-[400px] lg:min-h-[500px]">
              <Image
                src={MissionGraphic || "/placeholder.svg"}
                alt="Mission graphic"
                fill
                className="object-contain md:object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-[#FDF5D9] rounded-r-full max-w-2/3 w-full">
                <motion.div
                  className="text-left p-8 md:p-12"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  <h2 className="text-xl md:text-3xl text-[#330505] mb-2">
                    People-first.
                  </h2>
                  <h2 className="text-xl md:text-3xl text-[#330505] mb-2">
                    Process-driven.
                  </h2>
                  <h2 className="text-xl md:text-3xl text-[#330505]">
                    Tech-focused.
                  </h2>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Text */}
        <motion.div
          ref={textRef}
          className="w-full py-16 md:py-24"
          initial="hidden"
          animate={textControls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          <p className="text-center text-[#8A846F] text-lg md:text-xl max-w-[49.5rem] mx-auto leading-relaxed">
            Founded with a mission to bridge the gap between business goals and
            technical execution, Ancile Inc. supports companies across North
            America and beyond with a blend of consulting, development, and
            staffing services. We&apos;re not just here to advise — we&apos;re
            here to build with you, side by side.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <motion.div
          ref={cardsRef}
          className="w-full pb-16 md:pb-24"
          initial="hidden"
          animate={cardsControls}
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="relative rounded-full overflow-hidden aspect-[358/179]"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.1, ease: "easeOut" },
                },
              }}
            >
              <Image
                src={Mission1 || "/placeholder.svg"}
                alt="Mission"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                <h3 className="text-[#FDF5D9] text-4xl lg:text-[62px] font-bold tracking-wider">
                  MISSION
                </h3>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-full overflow-hidden aspect-[2/1]"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
                },
              }}
            >
              <Image
                src={Mission2 || "/placeholder.svg"}
                alt="Vision"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                <h3 className="text-[#FDF5D9] text-4xl lg:text-[62px] font-bold tracking-wider">
                  VISION
                </h3>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-full overflow-hidden aspect-[2/1]"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
                },
              }}
            >
              <Image
                src={Mission3 || "/placeholder.svg"}
                alt="Purpose"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
                <h3 className="text-[#FDF5D9] text-4xl lg:text-[62px] font-bold tracking-wider">
                  PURPOSE
                </h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Mission;
