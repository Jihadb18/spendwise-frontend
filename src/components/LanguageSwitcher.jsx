import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";

const languages = [
  {
    code: "en",
    label: "English",
    short: "EN",
  },
  {
    code: "fr",
    label: "Français",
    short: "FR",
  },
  {
    code: "ar",
    label: "العربية",
    short: "AR",
  },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const currentLanguage =
    languages.find((language) =>
      i18n.language?.startsWith(language.code)
    ) || languages[0];

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);

    localStorage.setItem("language", language);
    setOpen(false);
  };

  // Language + RTL / LTR
  useEffect(() => {
    const language =
      i18n.resolvedLanguage || i18n.language || "en";

    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [i18n.language, i18n.resolvedLanguage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select language"
        aria-expanded={open}
        className="gap-2"
      >
        {/* Globe */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-4"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21" />
          <path d="M12 3C9.7 5.5 8.5 8.5 8.5 12S9.7 18.5 12 21" />
        </svg>

        <span>{currentLanguage.short}</span>

        {/* Chevron */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`size-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2
            w-48
            rounded-xl
            border border-border
            bg-background
            p-1
            text-foreground
            shadow-lg
            shadow-black/10
          "
        >
          {/* Header */}
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">
              Language
            </p>
          </div>

          {/* Languages */}
          {languages.map((language) => {
            const isActive =
              currentLanguage.code === language.code;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() =>
                  changeLanguage(language.code)
                }
                className={`
                  flex w-full items-center justify-between
                  rounded-lg px-3 py-2
                  text-sm
                  transition-colors
                  outline-none

                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }

                  focus-visible:ring-2
                  focus-visible:ring-ring/50
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      flex size-7 items-center justify-center
                      rounded-md
                      text-[10px]
                      font-semibold

                      ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {language.short}
                  </span>

                  <span>{language.label}</span>
                </div>

                {isActive && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="size-4 text-primary"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;