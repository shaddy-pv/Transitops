import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, organization and preferences."
        breadcrumbs={[{ label: "Home" }, { label: "Settings" }]}
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {["profile", "organization", "notifications", "appearance", "language", "system"].map((v) => (
            <TabsTrigger
              key={v}
              value={v}
              className="rounded-md border border-transparent px-3 py-1.5 text-sm capitalize data-[state=active]:border-border data-[state=active]:bg-card"
            >
              {v}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <SettingsCard title="Profile" description="Update your account information.">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-secondary">AR</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">Upload photo</Button>
                <p className="mt-1 text-xs text-muted-foreground">PNG or JPG, max 2 MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" defaultValue="Anita Rao" />
              <Field label="Role" defaultValue="Fleet Manager" />
              <Field label="Email" defaultValue="anita.rao@transitops.io" />
              <Field label="Phone" defaultValue="+91 98111 22334" />
            </div>
            <SaveBar />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="organization">
          <SettingsCard title="Organization" description="Company profile and billing details.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Company" defaultValue="Meridian Logistics Pvt Ltd" />
              <Field label="GSTIN" defaultValue="27ABCDE1234F1Z5" />
              <Field label="Head office" defaultValue="Mumbai, MH" />
              <Field label="Support email" defaultValue="ops@meridian.example" />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Textarea rows={3} defaultValue="Plot 14, Trans-Yamuna Industrial Estate, Mumbai 400086" />
            </div>
            <SaveBar />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SettingsCard title="Notifications" description="Choose how you'd like to be alerted.">
            <div className="divide-y divide-border">
              {[
                ["Trip status updates", "Get notified when a trip changes status"],
                ["Maintenance alerts", "Overdue services and technician updates"],
                ["License & permit expiry", "60/30/7 day reminders"],
                ["Fuel anomalies", "Sudden drops in mileage or theft signals"],
                ["Weekly reports", "Digest every Monday morning"],
              ].map(([t, d], i) => (
                <div key={t} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                  <Switch defaultChecked={i !== 4} />
                </div>
              ))}
            </div>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="appearance">
          <SettingsCard title="Appearance" description="Customize the look and feel of TransitOps.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Theme</Label>
                <Select defaultValue="dark">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark (default)</SelectItem>
                    <SelectItem value="system">Match system</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SaveBar />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="language">
          <SettingsCard title="Language & Region" description="Localization preferences.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SaveBar />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="system">
          <SettingsCard title="System" description="Advanced platform configuration.">
            <div className="divide-y divide-border">
              {[
                ["API access", "Enable programmatic access via API keys"],
                ["Audit logs", "Retain 90 days of action history"],
                ["Two-factor auth", "Require 2FA for all users"],
              ].map(([t, d], i) => (
                <div key={t} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                  <Switch defaultChecked={i !== 0} />
                </div>
              ))}
            </div>
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-6 p-6">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}

function SaveBar() {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Save changes</Button>
    </div>
  );
}