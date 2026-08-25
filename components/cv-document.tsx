"use client"

import Link from "next/link"
import { CvQrCode } from "@/components/cv-qr-code"
import {
  educations,
  experiences,
  getSkillsByCategory,
  profile,
  skillCategoryLabels,
} from "@/lib/resume-data"

export function CvDocument() {
  const handleExportPdf = () => {
    window.print()
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .cv-page {
            min-height: 100vh;
            background: #f4f6f8;
            padding: 1.5rem 1rem 2rem;
            font-family: "Outfit", sans-serif;
            color: #1e293b;
          }

          .cv-toolbar {
            max-width: 210mm;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .cv-toolbar a,
          .cv-toolbar button {
            font-family: "Outfit", sans-serif;
            font-size: 0.875rem;
            line-height: 1;
            padding: 0.65rem 1rem;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            background: #fff;
            color: #334155;
            cursor: pointer;
            text-decoration: none;
          }

          .cv-toolbar button {
            background: #334155;
            color: #fff;
            border-color: #334155;
          }

          .cv-sheet {
            width: 210mm;
            height: 297mm;
            max-height: 297mm;
            max-width: 100%;
            margin: 0 auto;
            background: #fff;
            color: #1e293b;
            padding: 11mm 12mm 9mm;
            box-sizing: border-box;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
            font-size: calc(9.75pt + 1px);
            line-height: 1.32;
            overflow: hidden;
          }

          .cv-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10pt;
            margin-bottom: 8pt;
            padding-bottom: 7pt;
            border-bottom: 1.5px solid #e2e8f0;
          }

          .cv-header-main {
            flex: 1;
            min-width: 0;
          }

          .cv-qr {
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .cv-qr-image {
            display: block;
            width: 16mm;
            height: 16mm;
            margin: 0 auto;
            border: 1px solid #e2e8f0;
            border-radius: 2px;
          }

          .cv-qr-label {
            display: block;
            width: 100%;
            margin-top: 2pt;
            font-size: calc(6.75pt + 1px);
            line-height: 1.2;
            color: #64748b;
            text-align: center;
          }

          .cv-qr-caption {
            display: block;
            width: 100%;
            margin-top: 1pt;
            font-size: calc(6pt + 1px);
            line-height: 1.2;
            color: #94a3b8;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            text-align: center;
          }

          .cv-name {
            margin: 0 0 3pt;
            font-size: calc(19pt + 1px);
            font-weight: 700;
            line-height: 1.05;
            color: #0f172a;
            letter-spacing: -0.01em;
          }

          .cv-title {
            margin: 0 0 6pt;
            font-size: calc(11pt + 1px);
            font-weight: 500;
            color: #475569;
          }

          .cv-contact {
            display: flex;
            flex-direction: column;
            gap: 3pt;
          }

          .cv-contact-line {
            margin: 0;
            font-size: calc(8.75pt + 1px);
            line-height: 1.5;
            color: #64748b;
          }

          .cv-contact a {
            color: #475569;
            text-decoration: none;
          }

          .cv-section {
            margin-top: 7pt;
          }

          .cv-section-title {
            margin: 0 0 5pt;
            font-size: calc(8.75pt + 1px);
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #0f5c56;
            border-bottom: 1px solid #b8d4d1;
            padding-bottom: 2pt;
          }

          .cv-entry {
            margin-bottom: 5pt;
            padding-bottom: 4pt;
            border-bottom: 1px solid #f1f5f9;
          }

          .cv-section-experience .cv-entry {
            border-bottom: 1px solid #d8e0e6;
            padding-bottom: 5pt;
            margin-bottom: 6pt;
          }

          .cv-entry:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .cv-entry-head {
            display: flex;
            justify-content: space-between;
            gap: 10pt;
            font-weight: 600;
            font-size: calc(9.75pt + 1px);
            color: #0f172a;
          }

          .cv-entry-period {
            flex-shrink: 0;
            font-size: calc(8.75pt + 1px);
            font-weight: 500;
            color: #64748b;
            white-space: nowrap;
          }

          .cv-entry-sub {
            margin-top: 1pt;
            font-size: calc(8.75pt + 1px);
            color: #64748b;
          }

          .cv-entry-list {
            list-style: none;
            margin: 4pt 0 0;
            padding: 0;
            font-size: calc(8.5pt + 1px);
            line-height: 1.38;
            color: #334155;
          }

          .cv-entry-list li {
            position: relative;
            padding-left: 9pt;
            margin-bottom: 4pt;
          }

          .cv-entry-list li::before {
            content: "-";
            position: absolute;
            left: 0;
            top: 0;
            color: #94a3b8;
          }

          .cv-entry-list li:last-child {
            margin-bottom: 0;
          }

          .cv-skills-row {
            margin: 0 0 3pt;
            font-size: calc(8.75pt + 1px);
            line-height: 1.4;
            color: #334155;
          }

          .cv-skills-row:last-child {
            margin-bottom: 0;
          }

          .cv-skills-row strong {
            font-weight: 600;
            color: #475569;
          }

          .cv-section-experience {
            padding-bottom: 5px;
          }

          .cv-section-education,
          .cv-section-skills {
            padding-top: 8px;
          }

          .cv-section-education {
            margin-top: 11pt;
          }

          .cv-education-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5pt 12pt;
          }

          .cv-education-grid .cv-entry {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .cv-education-grid .cv-entry-head {
            display: block;
          }

          .cv-education-grid .cv-entry-head span:first-child {
            display: block;
          }

          .cv-education-grid .cv-entry-period {
            display: block;
            margin-top: 1pt;
            white-space: normal;
          }

          .cv-entry--brief {
            margin-bottom: 4pt;
            padding-bottom: 3pt;
          }

          @media (max-width: 767px) {
            .cv-page {
              padding: 1rem 0.75rem 1.5rem;
            }

            .cv-sheet {
              padding: 12mm 10mm 10mm;
            }

            .cv-entry-head {
              flex-direction: column;
              gap: 2pt;
            }

            .cv-education-grid {
              grid-template-columns: 1fr;
            }
          }

          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }

            html,
            body {
              background: #fff !important;
            }

            .cv-page {
              background: #fff !important;
              padding: 0 !important;
              min-height: auto !important;
            }

            .cv-toolbar {
              display: none !important;
            }

            .cv-sheet {
              width: auto !important;
              height: auto !important;
              max-height: none !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              border: none !important;
              border-radius: 0 !important;
              box-shadow: none !important;
              overflow: visible !important;
            }

            .cv-education-grid {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 5pt 12pt !important;
            }

            .cv-education-grid .cv-entry-head {
              display: block !important;
              flex-direction: column !important;
            }

            .cv-education-grid .cv-entry-period {
              display: block !important;
              margin-top: 1pt !important;
              white-space: normal !important;
            }

            .cv-section-title {
              color: #0f5c56 !important;
              border-bottom-color: #b8d4d1 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .cv-section-experience .cv-entry {
              border-bottom-color: #d8e0e6 !important;
            }
          }
        `
      }} />

      <div className="cv-page">
        <div className="cv-toolbar">
          <Link href="/">Back to portfolio</Link>
          <button type="button" onClick={handleExportPdf}>
            Export to PDF
          </button>
        </div>

        <article className="cv-sheet" aria-label="Curriculum Vitae">
          <header className="cv-header">
            <div className="cv-header-main">
              <h1 className="cv-name">{profile.name}</h1>
              <p className="cv-title">{profile.title}</p>
              <div className="cv-contact">
                <p className="cv-contact-line">
                  <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                  {" · "}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  {" · "}
                  <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/diarhyseni
                  </a>
                </p>
                <p className="cv-contact-line">{profile.city}</p>
              </div>
            </div>
            <CvQrCode
              url={profile.portfolioUrl}
              label="diarhyseni.vercel.app"
              caption="Portfolio"
            />
          </header>

          <section className="cv-section cv-section-experience" aria-labelledby="cv-experience">
            <h2 id="cv-experience" className="cv-section-title">Work Experience</h2>
            {experiences.map((exp) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className={`cv-entry${exp.highlights?.length ? "" : " cv-entry--brief"}`}
              >
                <div className="cv-entry-head">
                  <span>
                    {exp.company}
                    {exp.companySub ? ` (${exp.companySub})` : ""}
                  </span>
                  <span className="cv-entry-period">{exp.period}</span>
                </div>
                <div className="cv-entry-sub">
                  {exp.position} · {exp.location}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="cv-entry-list">
                    {exp.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section className="cv-section cv-section-education" aria-labelledby="cv-education">
            <h2 id="cv-education" className="cv-section-title">Education</h2>
            <div className="cv-education-grid">
            {educations.map((edu) => (
              <div key={`${edu.institution}-${edu.period}`} className="cv-entry">
                <div className="cv-entry-head">
                  <span>{edu.institution}</span>
                  <span className="cv-entry-period">{edu.period}</span>
                </div>
                <div className="cv-entry-sub">
                  {edu.degree} · {edu.location}
                </div>
              </div>
            ))}
            </div>
          </section>

          <section className="cv-section cv-section-skills" aria-labelledby="cv-skills">
            <h2 id="cv-skills" className="cv-section-title">Skills</h2>
            {(Object.keys(skillCategoryLabels) as Array<keyof typeof skillCategoryLabels>).map(
              (category) => {
                const items = getSkillsByCategory(category)
                if (items.length === 0) return null

                return (
                  <p key={category} className="cv-skills-row">
                    <strong>{skillCategoryLabels[category]}:</strong>{" "}
                    {items.map((skill) => skill.name).join(", ")}
                  </p>
                )
              }
            )}
          </section>
        </article>
      </div>
    </>
  )
}
