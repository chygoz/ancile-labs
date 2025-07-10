import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Container,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New Contact Message from {name}</Preview>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>Ancile</Heading>
          <Text style={headerSubtext}>New Contact Message</Text>
        </Section>

        {/* Main Content */}
        <Section style={mainSection}>
          <Section style={contentCard}>
            <Heading style={cardTitle}>Contact Details</Heading>
            <Hr style={divider} />

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Name</Text>
              <Text style={fieldValue}>{name}</Text>
            </Row>

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Email</Text>
              <Text style={fieldValue}>{email}</Text>
            </Row>

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Subject</Text>
              <Text style={fieldValue}>{subject}</Text>
            </Row>

            <Hr style={divider} />

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Message</Text>
            </Row>
            <Section style={messageContainer}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            This message was sent through your website contact form.
          </Text>
          <Text style={footerText}>
            © {new Date().getFullYear()} Ancile Canada Inc. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Html>
  );
};

// Styles
const container = {
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  backgroundColor: "#faf9f7",
};

const header = {
  backgroundColor: "#330505",
  padding: "32px 24px",
  textAlign: "center" as const,
  borderRadius: "0 0 24px 24px",
};

const logo = {
  color: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
  textAlign: "center" as const,
};

const headerSubtext = {
  color: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "16px",
  margin: "0",
  opacity: 0.9,
  textAlign: "center" as const,
};

const mainSection = {
  padding: "32px 24px",
};

const contentCard = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  border: "1px solid #f3f4f6",
};

const cardTitle = {
  color: "#330505",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px 0",
  textAlign: "left" as const,
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
};

const fieldRow = {
  marginBottom: "16px",
};

const fieldLabel = {
  color: "#6b7280",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const fieldValue = {
  color: "#111827",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "16px",
  margin: "0",
  lineHeight: "1.5",
};

const messageContainer = {
  backgroundColor: "#faf9f7",
  borderRadius: "12px",
  padding: "20px",
  border: "1px solid #e5e7eb",
  marginTop: "8px",
};

const messageText = {
  color: "#374151",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  backgroundColor: "#330505",
  padding: "24px",
  textAlign: "center" as const,
  borderRadius: "24px 24px 0 0",
  marginTop: "32px",
};

const footerText = {
  color: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "12px",
  margin: "4px 0",
  opacity: 0.8,
  textAlign: "center" as const,
};
