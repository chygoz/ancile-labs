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

interface GetStartedEmailProps {
  name: string;
  email: string;
  phone: string;
  serviceRequest: string;
  message: string;
}

export const GetStartedEmail = ({
  name,
  email,
  phone,
  serviceRequest,
  message,
}: GetStartedEmailProps) => {
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
      <Preview>New Get Started Request from {name}</Preview>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={logo}>Ancile</Heading>
          <Text style={headerSubtext}>New Get Started Request</Text>
        </Section>

        {/* Main Content */}
        <Section style={mainSection}>
          <Section style={contentCard}>
            <Heading style={cardTitle}>Client Information</Heading>
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
              <Text style={fieldLabel}>Phone</Text>
              <Text style={fieldValue}>{phone}</Text>
            </Row>

            <Hr style={divider} />

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Service Request</Text>
              <Section style={serviceContainer}>
                <Text style={serviceText}>{serviceRequest}</Text>
              </Section>
            </Row>

            <Hr style={divider} />

            <Row style={fieldRow}>
              <Text style={fieldLabel}>Project Details</Text>
            </Row>
            <Section style={messageContainer}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          {/* Call to Action */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              🚀 Ready to start this project? Review the details above and reach
              out to the client to discuss next steps.
            </Text>
          </Section>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            This request was submitted through your website&apos;s &apos;Get
            Started&apos; form.
          </Text>
          <Text style={footerText}>
            © {new Date().getFullYear()} Ancile Inc. All rights reserved.
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
  marginBottom: "24px",
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

const serviceContainer = {
  backgroundColor: "#dc2626",
  borderRadius: "8px",
  padding: "12px 16px",
  marginTop: "8px",
};

const serviceText = {
  color: "#ffffff",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "15px",
  fontWeight: "500",
  margin: "0",
  textAlign: "center" as const,
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

const ctaSection = {
  backgroundColor: "#fef3c7",
  borderRadius: "12px",
  padding: "20px",
  border: "1px solid #f59e0b",
};

const ctaText = {
  color: "#92400e",
  fontFamily: "Inter, Arial, sans-serif",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center" as const,
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
