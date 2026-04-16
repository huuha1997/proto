import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { profile, skills, experiences, projects } from "./data";

const ACCENT = "#0891b2";
const DARK = "#0f172a";
const MUTED = "#64748b";
const LIGHT_BG = "#f8fafc";
const BORDER = "#e2e8f0";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: DARK,
    padding: 0,
  },
  // Header
  header: {
    backgroundColor: DARK,
    padding: "28px 36px 24px",
    color: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 11,
    fontWeight: 600,
    color: "#67e8f9",
    letterSpacing: 1,
    textTransform: "uppercase" as const,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    gap: 20,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#94a3b8",
  },
  contactLink: {
    fontSize: 8.5,
    color: "#67e8f9",
    textDecoration: "none",
  },

  // Body
  body: {
    flexDirection: "row",
    flex: 1,
  },
  sidebar: {
    width: "34%",
    backgroundColor: LIGHT_BG,
    padding: "20px 24px",
    borderRight: `1px solid ${BORDER}`,
  },
  main: {
    width: "66%",
    padding: "20px 28px",
  },

  // Sections
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: `1.5px solid ${ACCENT}`,
  },
  sectionGap: {
    marginBottom: 18,
  },

  // Summary
  summary: {
    fontSize: 8.5,
    lineHeight: 1.6,
    color: MUTED,
    marginBottom: 18,
  },

  // Skills
  skillCategory: {
    fontSize: 8,
    fontWeight: 700,
    color: DARK,
    marginBottom: 4,
    marginTop: 8,
  },
  skillTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillTag: {
    fontSize: 7.5,
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "2.5px 7px",
    borderRadius: 4,
    fontWeight: 600,
  },

  // Education
  eduTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: DARK,
  },
  eduSub: {
    fontSize: 8,
    color: MUTED,
    marginTop: 2,
  },

  // Experience
  expItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  expCompany: {
    fontSize: 10,
    fontWeight: 700,
    color: DARK,
  },
  expRole: {
    fontSize: 8.5,
    fontWeight: 600,
    color: ACCENT,
    marginBottom: 2,
  },
  expPeriod: {
    fontSize: 7.5,
    color: MUTED,
    textAlign: "right" as const,
  },
  expLocation: {
    fontSize: 7.5,
    color: MUTED,
    textAlign: "right" as const,
  },
  expBullet: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 2.5,
  },
  expDot: {
    fontSize: 8,
    color: ACCENT,
    marginTop: 1,
  },
  expText: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#475569",
    flex: 1,
  },
  expTech: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 5,
  },
  expTechTag: {
    fontSize: 6.5,
    backgroundColor: "#f1f5f9",
    color: MUTED,
    padding: "2px 5px",
    borderRadius: 3,
    fontWeight: 600,
  },
});

export function CVDocument() {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.name}>Tam Phan Minh</Text>
          <Text style={s.title}>{profile.title}</Text>
          <View style={s.contactRow}>
            <Link src={`mailto:${profile.email}`} style={s.contactLink}>
              {profile.email}
            </Link>
            <Text style={s.contactItem}>{profile.phone}</Text>
            <Text style={s.contactItem}>{profile.location}</Text>
          </View>
          <View style={{ marginTop: 8 }}>
            <Link
              src="https://tamphan.vercel.app"
              style={{
                fontSize: 8.5,
                color: "#a5f3fc",
                textDecoration: "none",
                letterSpacing: 0.3,
              }}
            >
              tamphan.vercel.app
            </Link>
          </View>
        </View>

        <View style={s.body}>
          {/* Sidebar */}
          <View style={s.sidebar}>
            {/* Summary */}
            <View style={s.sectionGap}>
              <Text style={s.sectionTitle}>Summary</Text>
              <Text style={s.summary}>{profile.summary}</Text>
            </View>

            {/* Skills */}
            <View style={s.sectionGap}>
              <Text style={s.sectionTitle}>Skills</Text>
              {Object.entries(skills).map(([cat, items]) => (
                <View key={cat}>
                  <Text style={s.skillCategory}>{cat}</Text>
                  <View style={s.skillTags}>
                    {items.map((skill) => (
                      <Text key={skill} style={s.skillTag}>{skill}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={s.sectionGap}>
              <Text style={s.sectionTitle}>Education</Text>
              <Text style={s.eduTitle}>Web Developer</Text>
              <Text style={s.eduSub}>FPT Polytechnic</Text>
              <Text style={s.eduSub}>2017 - 2020</Text>
            </View>

            {/* Interests */}
            <View>
              <Text style={s.sectionTitle}>Interests</Text>
              <Text style={{ fontSize: 8, color: MUTED, lineHeight: 1.5 }}>
                Reading, playing sports, travelling, AI/ML exploration
              </Text>
            </View>
          </View>

          {/* Main content */}
          <View style={s.main}>
            <Text style={s.sectionTitle}>Work Experience</Text>
            {experiences.map((exp, i) => (
              <View key={i} style={s.expItem}>
                <View style={s.expHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.expCompany}>{exp.company}</Text>
                    <Text style={s.expRole}>{exp.role}</Text>
                  </View>
                  <View>
                    <Text style={s.expPeriod}>{exp.period}</Text>
                    <Text style={s.expLocation}>{exp.location}</Text>
                  </View>
                </View>
                {exp.highlights.map((h, j) => (
                  <View key={j} style={s.expBullet}>
                    <Text style={s.expDot}>&#8226;</Text>
                    <Text style={s.expText}>{h}</Text>
                  </View>
                ))}
                <View style={s.expTech}>
                  {exp.tech.map((t) => (
                    <Text key={t} style={s.expTechTag}>{t}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* Page 2: Projects — compact to fit 1 page */}
      <Page size="A4" style={s.page}>
        <View style={{ padding: "28px 36px" }}>
          <Text style={{ ...s.sectionTitle, fontSize: 9, marginBottom: 12 }}>
            Featured Projects
          </Text>

          {projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 9, fontWeight: 700, color: DARK }}>{proj.title}</Text>
                  <Text style={{ fontSize: 7.5, fontWeight: 600, color: ACCENT }}>{proj.role} — {proj.company}</Text>
                </View>
                <View>
                  {proj.size && <Text style={{ fontSize: 7, color: MUTED, textAlign: "right" as const }}>{proj.size}</Text>}
                  {proj.demo && !proj.demo.startsWith("/") && (
                    <Link src={proj.demo} style={{ fontSize: 6.5, color: ACCENT, textDecoration: "none" }}>
                      {proj.demo.replace("https://", "").replace("www.", "")}
                    </Link>
                  )}
                </View>
              </View>

              <Text style={{ fontSize: 7, color: "#475569", lineHeight: 1.5, marginBottom: 2 }}>
                {proj.description}
              </Text>

              {proj.highlights.slice(0, 3).map((h, j) => (
                <View key={j} style={{ flexDirection: "row", gap: 5, marginBottom: 1.5 }}>
                  <Text style={{ fontSize: 7, color: ACCENT, marginTop: 0.5 }}>&#8226;</Text>
                  <Text style={{ fontSize: 7, lineHeight: 1.4, color: "#475569", flex: 1 }}>{h}</Text>
                </View>
              ))}

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2.5, marginTop: 3 }}>
                {proj.tech.slice(0, 6).map((t) => (
                  <Text key={t} style={{ fontSize: 6, backgroundColor: "#f1f5f9", color: MUTED, padding: "1.5px 5px", borderRadius: 2.5, fontWeight: 600 }}>{t}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
