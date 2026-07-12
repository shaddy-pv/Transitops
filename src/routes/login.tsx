import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('admin@transitops.com');
  const [password, setPassword] = useState('password123');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login({ email, password });
    if (!result.success) {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="hidden flex-col justify-between border-r border-border bg-card p-10 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background">
            <Truck className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">TransitOps</span>
        </Link>
        <div>
          <p className="text-2xl font-semibold leading-snug tracking-tight">
            "TransitOps replaced four separate tools and gave our dispatch team
            hours back every week."
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            — Anita Rao, Head of Fleet, Meridian Logistics
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 TransitOps · All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
              <Truck className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">TransitOps</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Access your fleet operations dashboard.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Remember me for 30 days
            </label>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Protected by enterprise-grade authentication.
          </p>
        </div>
      </div>
    </div>
  );
}