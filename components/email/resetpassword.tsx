import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const ResetPasswordEmail = ({
    userFirstname,
    resetPasswordLink,
  }: ResetPasswordEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>Hi, Someone recently requested a password change for your KYZA
                account. If this was you, you can set a new password here:</Preview>
        <Body style={main}>
          <Container style={container}>
          <Img
            src='https://utfs.io/f/09e022bf-c680-4372-80ca-30342a4637c4-nbw9nw.png'
            width="75"
            height="75"
            alt="Kyza"
          />
            <Section>
              <Text style={text}>Hi,</Text>
              <Text style={text}>
                Someone recently requested a password change for your CloudSecurityExams
                account. If this was you, you can set a new password here:
              </Text>
              <Button style={button} href={resetPasswordLink}>
                Reset password
              </Button>
              <Text style={text}>
                If the button doesn&apos;t work, please copy and paste this link into a new tab: {resetPasswordLink}
              </Text>
              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message. This link will expiry in 24 hours.
              </Text>
              <Text style={text}>
                To keep your account secure, please don&apos;t forward this email
                to anyone. See our Help Center for{" "}
                <Link style={anchor} href="https://kyza.ai">
                  more video tips.
                </Link>
              </Text>
              <Text style={text}>Happy Generating!</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export default ResetPasswordEmail;
  
  const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
  };
  
  const text = {
    fontSize: "16px",
    fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
  };
  
  const button = {
    backgroundColor: "#007ee6",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "210px",
    padding: "14px 7px",
  };
  
  const anchor = {
    textDecoration: "underline",
  };
  