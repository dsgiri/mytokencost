import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="flex justify-center w-full max-w-4xl mx-auto py-8">
      {/* 
        Clerk's UserProfile component gives us a full enterprise settings suite 
        (Password changing, MFA, active sessions, email management) out of the box 
      */}
      <UserProfile 
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "bg-slate-900 border border-slate-800 shadow-xl",
            headerTitle: "text-white font-space-grotesk",
            headerSubtitle: "text-slate-400",
            socialButtonsBlockButton: "border-slate-700 text-slate-300 hover:bg-slate-800",
            socialButtonsBlockButtonText: "text-slate-300",
            dividerLine: "bg-slate-800",
            dividerText: "text-slate-500",
            formButtonPrimary: "bg-[#00f0ff] hover:bg-[#00d8e6] text-slate-950 font-bold",
            formFieldInput: "bg-slate-950 border-slate-800 text-white focus:border-[#00f0ff]",
            formFieldLabel: "text-slate-400",
            navbarButton: "text-slate-400 hover:text-white hover:bg-slate-800",
            profileSectionTitleText: "text-white",
            profileSectionPrimaryButton: "text-[#00f0ff] hover:text-[#00d8e6]",
            badge: "bg-slate-800 text-slate-300 border-slate-700",
            userPreviewMainIdentifier: "text-white",
            userPreviewSecondaryIdentifier: "text-slate-400",
            scrollBox: "bg-slate-900",
          }
        }}
      />
    </div>
  );
}
