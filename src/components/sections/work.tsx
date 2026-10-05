"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import { SiteDemo, ClientsDemo } from "./service-demos";

const desktopQuery = "(min-width: 761px)";
function subscribeViewport(callback: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function desktopSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}

export function Services() {
  const desktop = useSyncExternalStore(
    subscribeViewport,
    desktopSnapshot,
    () => false,
  );
  const [scrollService, setScrollService] = useState(0);
  const [hoverService, setHoverService] = useState<number | null>(null);
  const [focusService, setFocusService] = useState<number | null>(null);
  const features = useRef<(HTMLDivElement | null)[]>([]);
  const activeService = desktop
    ? (hoverService ?? focusService ?? scrollService)
    : 0;

  useEffect(() => {
    const query = window.matchMedia(desktopQuery);
    const clearOverrides = () => {
      setHoverService(null);
      setFocusService(null);
    };
    query.addEventListener("change", clearOverrides);
    return () => query.removeEventListener("change", clearOverrides);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      const distances = features.current.map((feature) => {
        if (!feature) return Infinity;
        const rect = feature.getBoundingClientRect();
        return Math.abs(rect.top + rect.height / 2 - center);
      });
      const nearest = distances.indexOf(Math.min(...distances));
      // Require a 32px advantage before switching around the midpoint.
      setScrollService((current) =>
        distances[nearest] + 32 < distances[current] ? nearest : current,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [desktop]);

  return (
    <section id="servicos" className="shell section servicesSection">
      <div className="section-heading servicesHeading">
        <span className="eyebrow">01 / O QUE CRIAMOS</span>
        <h2>
          Boas ideias merecem
          <br />
          uma execução à altura.
        </h2>
      </div>
      <div className="servicesEditorial" data-active={activeService}>
        <div className="servicesEditorialList">
          {services.map((service, i) => (
            <article
              className="serviceEntry"
              key={service.title}
              aria-labelledby={`service-title-${i}`}
            >
              <div
                ref={(element) => {
                  features.current[i] = element;
                }}
                className="serviceFeature"
                data-active={!desktop || activeService === i}
                tabIndex={desktop ? 0 : undefined}
                aria-labelledby={`service-title-${i}`}
                onMouseEnter={() => {
                  if (desktop) setHoverService(i);
                }}
                onMouseLeave={() => setHoverService(null)}
                onFocus={() => {
                  if (desktop) setFocusService(i);
                }}
                onBlur={() => setFocusService(null)}
              >
                <span className="serviceFeatureIndex">0{i + 1}</span>
                <div className="serviceFeatureBody">
                  <div className="serviceFeatureTitle">
                    <h3 id={`service-title-${i}`}>{service.title}</h3>
                    <ArrowUpRight
                      className="serviceFeatureArrow"
                      size={28}
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                  </div>
                  <p>{service.text}</p>
                  <p className="serviceFeatureCategories">
                    {service.items.join(" / ")}
                  </p>
                </div>
              </div>
              <div
                className={`servicePreview serviceInlinePreview ${i === 1 ? "serviceInlineSystem" : ""}`}
                inert={desktop}
              >
                <div
                  className={`servicePreviewFrame ${i === 0 ? "previewSite" : "previewSystem"}`}
                >
                  {i === 0 ? <SiteDemo /> : <ClientsDemo />}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div
          className="servicePreview servicePreviewShared"
          inert={!desktop}
          onFocusCapture={() => setFocusService(activeService)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setFocusService(null);
          }}
        >
          <div
            className="servicePreviewFrame previewSite"
            inert={!desktop || activeService !== 0}
            aria-hidden={!desktop || activeService !== 0}
          >
            <SiteDemo />
          </div>
          <div
            className="servicePreviewFrame previewSystem"
            inert={!desktop || activeService !== 1}
            aria-hidden={!desktop || activeService !== 1}
          >
            <ClientsDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
