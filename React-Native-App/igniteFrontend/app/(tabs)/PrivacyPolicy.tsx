// YourAppNamePrivacyPolicy.tsx
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
interface PrivacyPolicyProps {}

const IgnitePrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.title}>Ignite Privacy Policy</Text>
      <Text style={styles.subTitle}>Effective Date: [7/8/2024]</Text>

      {/* Introduction Section */}
      <Text style={styles.sectionHeader}>Introduction</Text>
      <Text style={styles.paragraph}>
        This Privacy Policy describes how Ignite Fitness collects, uses, and discloses your information when you use our
        mobile application, Ignite ("Cross-Platform Personal Training Application").  This policy explains how we collect, use, 
        and disclose your information when you use the Ignite application. It covers personal data you provide, information about 
        your usage of the app, and data collected from your device.
      </Text>

      {/* Information We Collect Section */}
      <Text style={styles.sectionHeader}>Information We Collect</Text>
      <Text style={styles.paragraph}>
        We collect several different types of information to improve our Ignite Fitness app and provide you with the best service. 
        Here's a breakdown of the information we collect and how we use it:
      </Text>
      <Text style={styles.listTitle}>Personal Information:</Text>
      <Text style={styles.listItem}>
        This may include your name, email address, phone number, and potentially your fitness goals or preferences. 
        We use this information to create and manage your account, personalize your workout plans, communicate with you 
        about the app and services, and potentially for targeted marketing with your consent.
      </Text> 
      <Text style={styles.listTitle}>Device Information:</Text>
      <Text style={styles.listItem}>
        We collect information about the device you use to access the app, such as the device type, operating system version, 
        unique device identifiers, and potentially your IP address. This information is used to ensure app functionality and 
        compatibility, troubleshoot issues, and potentially for security purposes.
      </Text>
      <Text style={styles.listTitle}>Usage Data:</Text>
      <Text style={styles.listItem}>
        We may collect information about how you access and use the App, such as the pages you view, the features you use, the time and duration of your use, and other information about your interaction with the App.
      </Text>

      {/* How we use your information section */}
      <Text style={styles.sectionHeader}>How We Use Your Information</Text>
      <Text style={styles.listItem}>
        • To provide and maintain the App
      </Text>
      <Text style={styles.listItem}>
        • To improve and personalize the App
      </Text>
      <Text style={styles.listItem}>
        • To develop new features
      </Text>
      <Text style={styles.listItem}>
        • To send you marketing and promotional communications (with your consent)
      </Text>
      <Text style={styles.listItem}>
        • To analyze how you use the App
      </Text>
      <Text style={styles.listItem}>
        • To find and address bugs and technical issues
      </Text>
      <Text style={styles.listItem}>
        • To comply with legal and regulatory obligations
      </Text> 

      {/* Your Rights Section */}   
      <Text style={styles.sectionHeader}>Your Rights</Text>
      <Text style={styles.paragraph}>
        Depending on your location, you may have certain rights regarding your personal
        information. These rights may include:
      </Text>
      <Text style={styles.listTitle}>Access Right:</Text>
      <Text style={styles.listItem}>
        You may have the right to request access to your personal information that we
        collect, use, or disclose. This could include information such as your name,
        email address, and workout history.
      </Text>
      <Text style={styles.listTitle}>Rectification Right:</Text>
      <Text style={styles.listItem}>
        You may have the right to request that we rectify inaccurate or incomplete
        personal information that we hold about you.
      </Text>
      <Text style={styles.listTitle}>Erasure Right:</Text>
      <Text style={styles.listItem}>
        You may have the right to request that we erase your personal information
        under certain circumstances. This is also known as the "right to be forgotten."
      </Text>
      <Text style={styles.listTitle}>Restriction Right:</Text>
      <Text style={styles.listItem}>
        You may have the right to restrict how we use your personal information.
        For example, you may be able to restrict us from using your personal
        information for marketing purposes.
      </Text>
      <Text style={styles.listTitle}>Objection Right:</Text>
      <Text style={styles.listItem}>
        You may have the right to object to how we use your personal information,
        including for profiling purposes.
      </Text>
      <Text style={styles.paragraph}>
        To exercise any of these rights, please contact us using the contact information
        provided below. We will respond to your request within a reasonable timeframe.
      </Text>

      {/* Children's Privacy Section */}
      <Text style={styles.sectionHeader}>Children's Privacy</Text>
      <Text style={styles.paragraph}>
        Our App is not directed to children under the age of 13 (or as defined
        by applicable law). We do not knowingly collect personal information from
        children under 13. If you are a parent or guardian and you are aware
        that your child has provided us with personal information, please contact us.
        If we become aware that we have collected personal information from a child
        under 13, we will take steps to delete that information.
      </Text>

      {/* Security Section */}
      <Text style={styles.sectionHeader}>Security</Text>
      <Text style={styles.paragraph}>
        We take reasonable precautions to protect your personal information from
        unauthorized access, disclosure, alteration, or destruction. However, no
        internet transmission or electronic storage method is 100% secure. Therefore,
        we cannot guarantee absolute security.
      </Text>
      <Text style={styles.paragraph}>
        We implement a variety of security measures to protect your personal
        information, including [mention specific security measures if applicable, e.g., secure servers, encryption in transit and at rest].
      </Text>

      {/* Changes to This Privacy Policy Section */}
      <Text style={styles.sectionHeader}>Changes to This Privacy Policy</Text>
      <Text style={styles.paragraph}>
        We may update our Privacy Policy from time to time. We will notify you of any
        changes by posting the new Privacy Policy on this page.
      </Text>
      <Text style={styles.paragraph}>
        You are advised to review this Privacy Policy periodically for any changes.
        Your continued use of the App after the revised Privacy Policy is posted
        constitutes your acceptance of the changes.
      </Text>

      {/* Contact Us Section */}
      <Text style={styles.sectionHeader}>Contact Us</Text>
      <Text style={styles.listItem}>
        If you have any questions about this Privacy Policy, please contact us by email at armummert4@gmail.com.
      </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  contactText: {
    fontSize: 16,
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default IgnitePrivacyPolicy;
