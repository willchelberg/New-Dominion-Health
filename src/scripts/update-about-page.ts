/**
 * Script to update the About page with better default content
 * Run this to populate the About page in the admin panel
 */

const projectId = "YOUR_PROJECT_ID"; // Replace with actual project ID
const publicAnonKey = "YOUR_ANON_KEY"; // Replace with actual anon key

const updatedAboutContent = {
  pageTitle: "About New Dominion Health",
  whyWeExistTitle: "Our Mission",
  whyWeExistContent: "We exist to share how to magnify Christ through stewarding our bodies for His glory and our joy.",
  whoWeAreTitle: "Who We Are",
  whoWeAreContent: "We are a Christian health and wellness platform with a desire to point people to Christ, in whom all true joy is found. We create Bible-centered resources that encourage and equip people to honor God with their bodies.",
  whatWeBelieveTitle: "What We Believe",
  whatWeBelieveParagraph1: "We believe that when people understand their health, they make better decisions. We believe wellness isn't one-size-fits-all—it's personal, evolving, and looks different for everyone. And we believe that health education should be a conversation, not a lecture.",
  whatWeBelieveParagraph2: "Our approach is grounded in evidence but written with empathy. We draw from research and expert insights, then translate that into content that actually makes sense in everyday life.",
};

async function updateAboutPage() {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-19263118/about`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          'apikey': publicAnonKey
        },
        body: JSON.stringify(updatedAboutContent)
      }
    );

    if (response.ok) {
      console.log("✅ About page updated successfully!");
    } else {
      console.error("❌ Failed to update About page");
    }
  } catch (error) {
    console.error("❌ Error updating About page:", error);
  }
}

updateAboutPage();
