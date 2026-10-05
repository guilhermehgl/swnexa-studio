type StudyVariant = "hero" | "house" | "pavilion" | "residence" | "object";

// Original vector studies: no photographs, external assets or client work.
export function ArchitecturalStudy({
  variant,
  className,
}: {
  variant: StudyVariant;
  className?: string;
}) {
  const stone = `atelier-${variant}-stone`;
  const shade = `atelier-${variant}-shade`;
  return (
    <svg
      className={className}
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={stone}
          x1="220"
          y1="100"
          x2="760"
          y2="650"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e6ddcd" />
          <stop offset="1" stopColor="#a99a83" />
        </linearGradient>
        <linearGradient
          id={shade}
          x1="450"
          y1="200"
          x2="650"
          y2="660"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#181816" />
          <stop offset="1" stopColor="#575247" />
        </linearGradient>
      </defs>
      {variant === "hero" && (
        <>
          <path fill="#242421" d="M0 0h1000v800H0z" />
          <path d="M0 654 692 536 1000 675v125H0Z" fill="#31312b" />
          <path d="m288 728 366-104 346 66v110H682Z" fill="#181a17" />
          <path
            d="m390 123 310-44 139 69v432l-139 98-310-60Z"
            fill={`url(#${stone})`}
          />
          <path d="m700 79 139 69v432l-139 98Z" fill="#897b65" />
          <path
            d="M465 575V318a82 82 0 0 1 164 0v284Z"
            fill={`url(#${shade})`}
          />
          <path d="M487 576V324a60 60 0 0 1 120 0v275Z" fill="#2b2b26" />
          <path d="M607 274v325l22 3V318a82 82 0 0 0-22-56Z" fill="#706551" />
          <path
            d="m425 580 230 33v24l-230-30Zm-35 28 265 29v25l-265-24Zm-39 31 304 23v26l-304-17Zm-40 32 344 17v28l-344-10Z"
            fill="#b9aa90"
          />
          <path
            d="m425 607 230 30v-12l-230-30Zm-35 31 265 24v-12l-265-25Zm-39 33 304 17v-12l-304-18Zm-40 35 344 10v-12l-344-14Z"
            fill="#6b6253"
          />
          <path
            d="m390 123 310-44M390 171l310-38M390 225l45-5M648 219l52-6M390 493l45 5M651 523l49 8"
            stroke="#f4eddf"
            strokeOpacity=".18"
          />
          <path
            d="m839 149 129-44 32 39v531l-161-95Z"
            fill="#434039"
            opacity=".5"
          />
          <path d="m120 0 155 0 391 800H506Z" fill="#e5dcc5" opacity=".035" />
          <path
            d="M100 727h220M807 712h94"
            stroke="#d7cdb7"
            strokeOpacity=".2"
          />
        </>
      )}
      {variant === "house" && (
        <>
          <path fill="#d3cabb" d="M0 0h1000v800H0z" />
          <path fill="#bfb29e" d="M0 575h1000v225H0z" />
          <path
            d="m143 579 575-176 282 158v183L529 800Z"
            fill="#9b8d76"
            opacity=".55"
          />
          <path d="M162 194h565v388H162Z" fill="#e5ded1" />
          <path d="m727 194 130 97v291H727Z" fill="#afa18a" />
          <path d="M237 266h385v246H237Z" fill="#413d34" />
          <path d="M258 281h195v214H258Z" fill="#65604f" />
          <path d="M453 281h150v214H453Z" fill="#242b26" />
          <path d="M453 281h8v214h-8Z" fill="#bbae96" />
          <path d="m258 495 195-92v92Z" fill="#a49d82" />
          <path d="m603 281-142 214h142Z" fill="#576456" />
          <path
            d="M136 539h643v37H136Zm-30 37h703v29H106Zm-24 29h749v24H82Z"
            fill="#c9bda8"
          />
          <path
            d="M78 669h789M78 723h789M321 630l-21 170M627 630l69 170"
            stroke="#94856b"
            strokeOpacity=".4"
          />
          <path d="M0 0h104v800H0z" fill="#58564b" opacity=".08" />
        </>
      )}
      {variant === "pavilion" && (
        <>
          <path fill="#aeb6ae" d="M0 0h1000v800H0z" />
          <path d="M0 550h1000v250H0z" fill="#929a8f" />
          <path
            d="m136 627 658-190 206 214v149H715Z"
            fill="#5f685e"
            opacity=".55"
          />
          <path d="m127 286 584-113 163 105-584 135Z" fill="#d3cfbd" />
          <path d="m127 286 163 127v30L127 316Z" fill="#b3af9c" />
          <path d="m290 413 584-135v31L290 443Z" fill="#777a69" />
          <path
            d="M170 328h30v253h-30Zm191 77h28v246h-28Zm355-107h25v246h-25Zm102-9h25v291h-25Z"
            fill="#d0cbb8"
          />
          <path d="m180 581 552-140 109 109-468 115Z" fill="#babba7" />
          <path d="m376 482 157-39 68 47-158 38Z" fill="#313c31" />
          <path d="M443 528v44l158-39v-43Z" fill="#52604f" />
          <path
            d="M0 719c251-88 493 110 1000-38M0 746c251-88 493 110 1000-38"
            stroke="#c3c8bc"
            strokeOpacity=".3"
          />
          <path d="M99 0v525M919 0v564" stroke="#788371" strokeWidth="2" />
        </>
      )}
      {variant === "residence" && (
        <>
          <path fill="#cec2af" d="M0 0h1000v800H0z" />
          <path d="M0 635h1000v165H0z" fill="#a7977f" />
          <path d="M88 90h382v544H88Z" fill="#e5ddce" />
          <path d="m470 90 126 63v544l-126-63Z" fill="#b6a58b" />
          <path d="M596 153h306v544H596Z" fill="#c8b99f" />
          <path d="M161 243h211v391H161Z" fill="#292c26" />
          <path d="M182 264h169v370H182Z" fill="#4d5446" />
          <path d="M182 534 351 345v289H182Z" fill="#747d63" />
          <path d="M662 242h171v286H662Z" fill="#655d4c" />
          <path d="M681 260h133v249H681Z" fill="#8c826c" />
          <path
            d="m596 581 306 23v24l-306-18Zm0 29 306 18v26l-306-12Zm0 32 306 12v43l-306-8Z"
            fill="#a39276"
          />
          <path d="m0 694 596-52 404 55v103H0Z" fill="#7d725e" opacity=".25" />
          <path d="M770 0v697M846 0v697" stroke="#eee5d4" strokeOpacity=".1" />
          <path d="m0 0 222 0 522 800H505Z" fill="#fbf4e4" opacity=".13" />
        </>
      )}
      {variant === "object" && (
        <>
          <path fill="#d7d0c4" d="M0 0h1000v800H0z" />
          <ellipse
            cx="561"
            cy="660"
            rx="257"
            ry="46"
            fill="#8d8373"
            opacity=".22"
          />
          <path d="M339 421h29v205h-29Zm327 0h29v205h-29Z" fill="#504f49" />
          <path
            d="m368 421 17-12v202l-17 15Zm327 0 17-12v202l-17 15Z"
            fill="#85847b"
          />
          <path d="m239 359 387-72 181 118-387 80Z" fill={`url(#${stone})`} />
          <path d="m239 359 181 126v32L239 390Z" fill="#b3a58e" />
          <path d="m420 485 387-80v32l-387 80Z" fill="#897d69" />
          <path
            d="m370 352 64 36 18-6 37 16 82-12 47 23 91-17M512 309l21 36-48 27 37 15-26 49"
            stroke="#8b7c63"
            strokeOpacity=".35"
          />
          <path d="m263 355 355-62" stroke="#f6f0e4" strokeOpacity=".6" />
          <path
            d="M219 706h574M257 697v18M755 697v18"
            stroke="#8b8376"
            strokeWidth="1"
          />
        </>
      )}
    </svg>
  );
}
