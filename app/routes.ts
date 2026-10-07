import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('what-we-do', 'routes/what-we-do.tsx'),
  route('initiatives', 'routes/initiatives.tsx'),
  route('initiatives/:slug', 'routes/initiative.tsx'),
  route('services', 'routes/services.tsx'),
  route('services/pathways-support', 'routes/pathways-support.tsx'),
  route('partner', 'routes/partner.tsx'),
  route('insights', 'routes/insights.tsx'),
  route('insights/:slug', 'routes/insight.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('privacy', 'routes/privacy.tsx'),
  route('terms', 'routes/terms.tsx'),
  route('accessibility', 'routes/accessibility.tsx'),
  // Catch-all → 404.
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
