import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home";
import LeadsPage from "./pages/Leads/LeadsPage";
import PipelinePage from "./pages/Pipeline/PipelinePage";
import PropertyIndex from "./pages/Properties/PropertyIndex";
import SpaceAllocation from "./pages/Properties/SpaceAllocation";
import TomDashboard from "./pages/TomDashboard";
import { ROUTES } from "./lib/constants";
import { negotiationRoutes } from "./routes/negotiation";

function Router() {
  return (
    <Switch>
      {/* Legacy routes */}
      <Route path={"/tom"} component={TomDashboard} />
      <Route path={"/home"} component={Home} />

      {/* New structured routes with Layout */}
      <Route path={ROUTES.DASHBOARD}>
        <Layout>
          <Dashboard />
        </Layout>
      </Route>

      <Route path={ROUTES.LEADS}>
        <Layout>
          <LeadsPage />
        </Layout>
      </Route>

      <Route path={ROUTES.PIPELINE}>
        <Layout>
          <PipelinePage />
        </Layout>
      </Route>

      <Route path={ROUTES.PROPERTY_INDEX}>
        <Layout>
          <PropertyIndex />
        </Layout>
      </Route>

      <Route path={ROUTES.SPACE_ALLOCATION}>
        <Layout>
          <SpaceAllocation />
        </Layout>
      </Route>

      {/* Legacy route redirects */}
      <Route path="/deals-overview">
        <Layout>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate"></div>
              </div>
            }
          >
            {(() => {
              const DealsOverview = negotiationRoutes.find(r => r.path === ROUTES.DEALS_OVERVIEW)?.component;
              return DealsOverview ? <DealsOverview /> : <div>Route not found</div>;
            })()}
          </Suspense>
        </Layout>
      </Route>

      {/* Negotiation routes */}
      {negotiationRoutes.map(route => (
        <Route key={route.path} path={route.path}>
          <Layout>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate"></div>
                </div>
              }
            >
              <route.component />
            </Suspense>
          </Layout>
        </Route>
      ))}

      {/* Placeholder routes */}
      <Route path={ROUTES.VIEWING_SCHEDULER}>
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate mb-4">
              Viewing Scheduler
            </h1>
            <p className="text-concrete">Coming soon...</p>
          </div>
        </Layout>
      </Route>

      <Route path={ROUTES.SEARCH}>
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate mb-4">Search</h1>
            <p className="text-concrete">
              Global search functionality coming soon...
            </p>
          </div>
        </Layout>
      </Route>

      <Route path={ROUTES.NOTIFICATIONS}>
        <Layout>
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-slate mb-4">
              Notifications
            </h1>
            <p className="text-concrete">Notification center coming soon...</p>
          </div>
        </Layout>
      </Route>

      {/* Default route - redirect to dashboard */}
      <Route path={"/"}>
        <Layout>
          <Dashboard />
        </Layout>
      </Route>

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
