import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { HomePage } from "@/pages/HomePage";
import { InteractiveMap } from "@/pages/InteractiveMap";
import { CampaignsPage } from "@/pages/CampaignsPage";
import { ExplorePage } from "@/pages/ExplorePage";
import { UserProfilePage } from "@/pages/UserProfilePage";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { AppShell } from "@/components/AppShell";

function Router() {
  const [location] = useLocation();
  const isAuthPage = location === "/sign-in" || location === "/sign-up";

  return (
    <Switch>
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route>
        <AppShell>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/map" component={InteractiveMap} />
            <Route path="/campaigns" component={CampaignsPage} />
            <Route path="/explore" component={ExplorePage} />
            <Route path="/profile" component={UserProfilePage} />
            <Route component={NotFound} />
          </Switch>
        </AppShell>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
